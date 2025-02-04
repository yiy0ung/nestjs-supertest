import * as glob from 'glob';
import * as NodePath from 'path';
import * as tsNode from 'ts-node';
import ts from 'typescript';
import { ControllerAnalyzer } from './analyze/controller.analyzer';
import { ReflectAnalyzer } from './analyze/decorator.analyzer';
import { Configs } from './configs';
import { IRoute } from './structures/IRoute';
import { DirectoryUtil } from './utils/directory.util';
import { SupertestGenerator } from './generation/supertest.generator';

function printLog(str: string): void {
  console.log(`[nestjs-supertest] ${str}`);
}

export class NestjsSupertestApp {
  private configs: Configs;

  constructor(configs: Configs) {
    configs.output = NodePath.join(configs.output, '/supertest-client');
    this.configs = configs;
  }

  public async generate(version: string) {
    printLog(`Generate supertest - v${version}`);

    this.prepareCompiler();

    const routes: IRoute[] = await this.analyze();

    const { bundlePath } = await this.setupOutDir(this.configs.output);
    await SupertestGenerator.generate(this.configs, bundlePath, routes);

    printLog('Done\n');
  }

  private prepareCompiler() {
    if (!this.configs.compileOptions) {
      this.configs.compileOptions = {
        noEmit: true,
        esModuleInterop: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.CommonJS,
      };
    }

    tsNode.register({
      emit: false,
      compiler: 'typescript',
      compilerOptions: this.configs.rawCompileOptions,
      require: ['tsconfig-paths/register'],
    });
  }

  private async setupOutDir(outputPath: string) {
    await DirectoryUtil.remake(outputPath);

    const bundlePath = await this.copyBundle(outputPath);

    return { bundlePath };
  }

  private async copyBundle(outputPath: string) {
    const BUNDLE_PATH = NodePath.join(__dirname, '..', '..', 'bundle');

    const bundlePath = NodePath.join(outputPath, '__internal');
    await DirectoryUtil.remake(bundlePath);
    await DirectoryUtil.copy(BUNDLE_PATH, bundlePath);

    return bundlePath;
  }

  private async analyze(): Promise<IRoute[]> {
    printLog('- Analyze Source Files');
    const sourceFileNames = this.configs.input
      .map((dirPath) => {
        const pattern = dirPath.endsWith('.ts') ? dirPath : NodePath.join(dirPath, '**/*.ts');
        const files = glob.sync(pattern, { nodir: true });
        return files;
      })
      .flat();

    const controllerList = await ReflectAnalyzer.analyze(sourceFileNames);
    printLog(`  - controllers #${controllerList.length}`);

    const program = ts.createProgram(
      controllerList.map((ctrl) => ctrl.sourceFileName),
      this.configs.compileOptions,
    );
    const checker = program.getTypeChecker();

    const routes: IRoute[] = [];
    for (const controller of controllerList) {
      const file = program.getSourceFile(controller.sourceFileName);
      if (file) {
        routes.push(...ControllerAnalyzer.analyze(this.configs, checker, file, controller));
      }
    }
    printLog(`  - routes #${routes.length}`);

    return routes;
  }
}
