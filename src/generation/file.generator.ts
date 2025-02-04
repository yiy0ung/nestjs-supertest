import fs from 'fs';
import * as NodePath from 'path';
import { IRoute } from '../structures';
import { FunctionGenerator } from './function.generator';

export namespace FileGenerator {
  export async function generate(
    rootPath: string,
    bundlePath: string,
    routes: IRoute[],
  ): Promise<void> {
    // construct folder tree
    const root: Directory = new Directory(null, 'spec');
    for (const route of routes) {
      emplaceDirectory(root, route);
    }

    // relocate for only one controller method in an url case
    relocateDirectory(root);

    // generate a module file
    await generateFile(rootPath, rootPath, bundlePath, root);
  }

  function emplaceDirectory(directory: Directory, route: IRoute): void {
    // separate path
    const identifiers: string[] = route.path
      .split('/')
      .filter((str) => str[0] !== ':' && str.length !== 0)
      .map((str) => str.replace(/[-.]/g, '_'));

    // create directories
    for (const key of identifiers) {
      let dir = directory.directories.get(key);
      if (!dir) {
        dir = new Directory(directory, key);
        directory.directories.set(key, dir);
      }
      directory = dir;
    }

    // add router
    directory.routes.push(route);
  }

  function relocateDirectory(directory: Directory): void {
    if (
      directory.parent !== null &&
      directory.directories.size === 0 &&
      directory.routes.length === 1
    ) {
      directory.parent.routes.push(directory.routes[0]);
      directory.parent.directories.delete(directory.name);
    } else if (directory.directories.size !== 0) {
      for (const [_key, dir] of directory.directories) {
        relocateDirectory(dir);
      }
    }
  }

  async function generateFile(
    outputDir: string,
    outDir: string,
    bundlePath: string,
    directory: Directory,
  ): Promise<void> {
    // create a new directory
    try {
      await fs.promises.mkdir(outDir);
    } catch {}

    // iterate children
    const content: string[] = [];
    for (const [key, dir] of directory.directories) {
      await generateFile(outputDir, `${outDir}/${key}`, bundlePath, dir);
      content.push(`export * as ${key} from './${key}';`);
    }
    if (content.length && directory.routes.length) content.push('');

    // iterate routes
    const importDict = new ImportDictionary();
    directory.routes.forEach((route) => {
      route.imports.forEach((importEle) => {
        importDict.append(importEle.from, importEle.exports);
      });

      content.push(FunctionGenerator.generate(route));
      content.push('');
    });

    // build the content
    if (directory.routes.length !== 0) {
      const head: string[] = [
        `import supertest from 'supertest';`,
        `import { Requester } from '${NodePath.relative(outDir, bundlePath)}';`,
      ];
      if (importDict.size) head.push('', importDict.toScript(outDir));

      content.push(...head, '', ...content.splice(0, content.length));
    }
    const headComment: string =
      '/**\n' + ` * @module ${directory.module}\n` + ' */\n' + content.join('\n');
    await fs.promises.writeFile(`${outDir}/index.ts`, headComment, 'utf8');
  }

  class Directory {
    public readonly module: string;
    public readonly directories: Map<string, Directory>;
    public readonly routes: IRoute[];

    public constructor(
      readonly parent: Directory | null,
      readonly name: string,
    ) {
      this.directories = new Map();
      this.routes = [];
      this.module = this.parent !== null ? `${this.parent.module}.${name}` : `api.${name}`;
    }
  }

  class ImportDictionary {
    private readonly importMap: Map<string, Set<string>>;

    public constructor() {
      this.importMap = new Map();
    }

    public get size() {
      return this.importMap.size;
    }

    public append(moduleSpecifier: string, identifiers: string[]) {
      let identifierSet: Set<string> | undefined = this.importMap.get(moduleSpecifier);
      if (!identifierSet) {
        identifierSet = new Set<string>();
        this.importMap.set(moduleSpecifier, identifierSet);
      }

      identifiers.forEach((id) => identifierSet.add(id));
    }

    public toScript(currentOutDir: string): string {
      const importContents: string[] = [];

      const absoluteOutDirPath = NodePath.join(process.cwd(), currentOutDir);
      this.importMap.forEach((identifierSet, moduleSpecifier) => {
        const isInternalModule = moduleSpecifier.startsWith(process.cwd());

        /** If the module is internal, change it to the relative path */
        const moduleName = isInternalModule
          ? NodePath.relative(absoluteOutDirPath, moduleSpecifier).replace(/\.(js|ts)$/, '')
          : moduleSpecifier;
        if (identifierSet.size > 0) {
          importContents.push(
            `import { ${Array.from(identifierSet).join(', ')} } from '${moduleName}';`,
          );
        }
      });

      return importContents.join('\n');
    }
  }
}
