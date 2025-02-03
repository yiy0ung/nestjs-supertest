import ts from 'typescript';
import { Configs } from '../configs';
import { IController, IRoute } from '../structures';
import { TypeAnalyzer } from './type.analyzer';
import { ImportAnalyzer } from './import.analyzer';

export namespace ControllerAnalyzer {
  export function analyze(
    configs: Configs,
    checker: ts.TypeChecker,
    sourceFile: ts.SourceFile,
    controller: IController,
  ): IRoute[] {
    const routes: IRoute[] = [];

    const importMap = ImportAnalyzer.analyze(configs, sourceFile);

    ts.forEachChild(sourceFile, (node) => {
      if (ts.isClassDeclaration(node) && node.name?.escapedText === controller.name) {
        routes.push(...analyzeController(checker, importMap, controller, node));
      }
    });

    return routes;
  }

  function analyzeController(
    checker: ts.TypeChecker,
    importMap: Map<string, string>,
    controller: IController,
    controllerNode: ts.ClassDeclaration,
  ): IRoute[] {
    const routes: IRoute[] = [];
    const classType = checker.getTypeAtLocation(controllerNode);

    for (const property of checker.getPropertiesOfType(classType)) {
      const declaration: ts.Declaration | undefined = property.declarations?.[0];
      if (!declaration || !ts.isMethodDeclaration(declaration)) continue;

      const identifier = declaration.name;
      if (!ts.isIdentifier(identifier)) continue;

      const func = controller.functions.find((func) => func.name === identifier.escapedText);
      if (!func) continue;

      routes.push(analyzeFunction(checker, importMap, controller, func, property));
    }

    return routes;
  }

  function analyzeFunction(
    checker: ts.TypeChecker,
    importMap: Map<string, string>,
    controller: IController,
    func: IController.IFunction,
    symbol: ts.Symbol,
  ): IRoute {
    const importCollector = new Map<string, Set<string>>();
    const type: ts.Type = checker.getTypeOfSymbol(symbol);
    const signature: ts.Signature | undefined = checker.getSignaturesOfType(
      type,
      ts.SignatureKind.Call,
    )[0];

    try {
      const parameters = func.parameters.map((param) =>
        analyzeParameter(
          checker,
          importMap,
          importCollector,
          param,
          signature.getParameters()[param.index],
        ),
      );
      const { name: returnType } = TypeAnalyzer.analyze(
        checker,
        importMap,
        importCollector,
        signature.getReturnType(),
      );

      const imports: IRoute.IImport[] = [];
      importCollector.forEach((modules, path) => {
        imports.push({
          from: path,
          exports: Array.from(modules),
        });
      });

      const route: IRoute = {
        name: func.name,
        method: func.method,
        paths: func.paths,
        path: buildApiPath(func.version || controller.version, [
          ...controller.paths,
          ...func.paths,
        ]),
        version: func.version,
        controllerName: controller.name,
        controllerVersion: controller.version,
        controllerPath: controller.paths,
        returnType: returnType,
        imports: imports,
        parameters: parameters,
        comment: signature
          .getDocumentationComment(checker)
          .map((comment) => comment.text.toString())
          .join('\n'),
        tags: [],
        skip: false,
      };

      return route;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`[${controller.name}.${func.name}] ${error.message}`);
      } else {
        throw new Error(`[${controller.name}.${func.name}] unknown exception`);
      }
    }
  }

  function buildApiPath(version: string | null, paths: string[]): string {
    const URL_VERSION_PREFIX = 'v';
    const versionPath: string | null = version ? `${URL_VERSION_PREFIX}${version}` : null;
    const routePath = paths
      .reduce<string[]>((result, path) => {
        result.push(...path.split('/').map((pathNode) => pathNode.trim()));
        return result;
      }, [])
      .filter((path) => path.length > 0)
      .join('/');
    return versionPath ? `/${versionPath}/${routePath}` : `/${routePath}`;
  }

  function analyzeParameter(
    checker: ts.TypeChecker,
    importMap: Map<string, string>,
    importCollector: Map<string, Set<string>>,
    param: IController.IParameter,
    symbol: ts.Symbol,
  ): IRoute.IParameter {
    const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
    const name: string = symbol.getEscapedName().toString();

    const { name: paramType } = TypeAnalyzer.analyze(checker, importMap, importCollector, type);

    return {
      name: name,
      category: param.category,
      field: param.field,
      type: paramType,
    };
  }
}
