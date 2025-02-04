import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import { Configs } from '../configs';

export namespace ImportAnalyzer {
  export function analyze(configs: Configs, sourceFile: ts.SourceFile) {
    const importMap: Map<string, string> = new Map();

    const customPathPair = Object.entries(configs.compileOptions?.paths ?? {});
    const extensions = ['.ts', '.js', '/index.ts', '/index.js'];

    /**
     * If the alias path is set in tsconfig, change it to the original absolute path.
     */
    const replaceToAbsolutePath = (inputPath: string) => {
      for (const [_key, _customPaths] of customPathPair) {
        const key = _key.replace(/\/\*$/, '');
        const customPaths = _customPaths.map((path) => path.replace(/[*]/g, ''));
        if (inputPath.startsWith(key)) {
          for (const customPath of customPaths) {
            const relativePath = inputPath.replace(key, customPath);
            const absolutePath = path.resolve(process.cwd(), relativePath);

            for (const extension of extensions) {
              const filePath = absolutePath + extension;
              try {
                fs.accessSync(filePath);
                return filePath;
              } catch {}
            }
          }
        }
      }
      return inputPath;
    };

    sourceFile.forEachChild((node) => {
      if (ts.isImportDeclaration(node)) {
        const moduleSpecifierText = node.moduleSpecifier.getText().replace(/^['"]+|['"]+$/g, '');
        const module = replaceToAbsolutePath(moduleSpecifierText);

        if (node.importClause?.namedBindings) {
          if (ts.isNamedImports(node.importClause.namedBindings)) {
            node.importClause.namedBindings.elements.map((ele) => {
              importMap.set(ele.name.escapedText.toString(), module);
            });
          } else if (ts.isNamespaceImport(node.importClause.namedBindings)) {
            importMap.set(node.importClause.namedBindings.name.escapedText.toString(), module);
          }
        }
      }
    });

    return importMap;
  }
}
