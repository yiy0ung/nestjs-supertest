import ts from 'typescript';

export namespace TypeAnalyzer {
  export function analyze(
    checker: ts.TypeChecker,
    importMap: Map<string, string>,
    importCollector: Map<string, Set<string>>,
    type: ts.Type,
  ) {
    function collectImport(importEscapedText: string) {
      const moduleSpecifier = importMap.get(importEscapedText);
      if (moduleSpecifier) {
        let set = importCollector.get(moduleSpecifier);
        if (!set) {
          set = new Set<string>();
          importCollector.set(moduleSpecifier, set);
        }
        set.add(importEscapedText);
      }
    }

    let name = exploreTypeName(checker, type, collectImport);
    if (isAliasType(name)) {
      name = exploreAliasType(checker, type) ?? 'unknown';
    }
    return { name };
  }

  function exploreTypeName(
    checker: ts.TypeChecker,
    type: ts.Type,
    collectImport: (importEscapedText: string) => void,
  ): string {
    const symbol: ts.Symbol | undefined = type.getSymbol() || type.aliasSymbol;
    if (type.aliasSymbol === undefined && type.isUnionOrIntersection()) {
      // UNION OR INTERSECT
      const joiner: string = type.isIntersection() ? ' & ' : ' | ';
      return type.types.map((child) => exploreTypeName(checker, child, collectImport)).join(joiner);
    } else if (symbol === undefined) {
      // Primitive Type
      return checker.typeToString(type, undefined, undefined);
    }

    const name = getName(symbol);
    const importSymbol = name.split('.')[0];
    collectImport(importSymbol);

    const generic = checker.getTypeArguments(type as ts.TypeReference);

    if (generic.length > 0) {
      if (name === 'Promise') {
        return exploreTypeName(checker, generic[0], collectImport);
      } else {
        return `${name}<${generic
          .map((child) => exploreTypeName(checker, child, collectImport))
          .join(', ')}>`;
      }
    }
    if (isAliasType(name)) {
      const aliasType = exploreAliasType(checker, type);
      if (aliasType) return aliasType;
    }

    return name;
  }

  function exploreAliasType(checker: ts.TypeChecker, type: ts.Type) {
    const symbol: ts.Symbol | undefined = type.getSymbol() || type.aliasSymbol;
    const generic = isTypeReference(type) ? checker.getTypeArguments(type) : [];

    if (symbol) {
      const name = getName(symbol);
      if (name === 'Promise') {
        return exploreAliasType(checker, generic[0]);
      }

      // alias type declarations
      const declarations = symbol.getDeclarations();
      if (declarations && declarations.length > 0) {
        const decl = declarations[0];

        if (ts.isTypeLiteralNode(decl)) {
          if (ts.isTypeAliasDeclaration(decl.parent)) {
            const aliasTypeSymbol = checker.getSymbolAtLocation(decl.parent.name);
            if (aliasTypeSymbol) {
              return getName(aliasTypeSymbol);
            }
          }
        }
        return decl.getFullText().trim();
      }
    }

    return undefined;
  }

  function getName(symbol: ts.Symbol) {
    return exploreName(symbol.escapedName.toString(), symbol.getDeclarations()?.[0].parent);
  }

  function exploreName(name: string, decl?: ts.Node): string {
    let parentDeclaration: ts.Node | undefined;
    let parentDeclarationName: string | undefined;
    if (decl && ts.isModuleBlock(decl)) {
      parentDeclaration = decl.parent.parent;
      parentDeclarationName = decl.parent.name.getText();
    } else if (decl && ts.isEnumDeclaration(decl)) {
      parentDeclaration = decl.parent;
      parentDeclarationName = decl.name.getText();
    }
    return parentDeclarationName && parentDeclaration
      ? exploreName(`${parentDeclarationName}.${name}`, parentDeclaration)
      : name;
  }

  function isTypeReference(type: ts.Type): type is ts.TypeReference {
    // 타입이 객체 타입인지 확인
    if (type.flags & ts.TypeFlags.Object) {
      const objectType = type as ts.ObjectType;
      // 객체 타입의 플래그가 Reference인지 확인
      return !!(objectType.objectFlags & ts.ObjectFlags.Reference);
    }
    return false;
  }

  function isAliasType(name: string): boolean {
    return ['__type', '__object'].includes(name);
  }
}
