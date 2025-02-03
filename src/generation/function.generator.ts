import { IRoute } from '../structures';

export namespace FunctionGenerator {
  export function generate(route: IRoute): string {
    const content: string[] = [];

    const commentBlock = buildComment(route);
    const callFuncBlock = buildCallFunc(route);
    const namespaceBlock = buildNamespace(route);

    if (commentBlock) {
      content.push(commentBlock);
    }
    content.push(callFuncBlock);
    content.push(namespaceBlock);

    return content.join('\n');
  }

  function buildComment(route: IRoute): string | null {
    if (route.comment.length === 0) return null;

    const comments = route.comment.split('\n').map((line) => ` * ${line}`);
    if (comments.length === 0) return null;

    return `/**\n` + comments.join('\n') + `\n */`;
  }

  function buildCallFunc(route: IRoute) {
    return (
      `export async function ${route.name}(\n` +
      `  connection: Requester.IConnection,\n` +
      `  params: ${route.name}.Parameters,\n` +
      `): Promise<${route.name}.Response> {\n` +
      `  return await Requester.request(\n` +
      `    connection,\n` +
      `    ${route.name}.METHOD,\n` +
      `    ${route.name}.PATH,\n` +
      `    params,\n` +
      `  )\n` +
      `}`
    );
  }

  function buildNamespace(route: IRoute) {
    const pathParams = route.parameters.filter((param) => param.category === 'Param');
    const queryParams = route.parameters.filter((param) => param.category === 'Query');
    const bodyParam = route.parameters.find((param) => param.category === 'Body');

    const queryType = buildQueryType(queryParams);

    return (
      `export namespace ${route.name} {\n` +
      (pathParams.length
        ? `  export type PathParams = {\n` +
          `${pathParams.map((param) => `    ${param.field}: ${param.type};`).join('\n')}\n` +
          `  };\n`
        : '') +
      (queryType ? `  export type Query = ${queryType};\n` : '') +
      (bodyParam ? `  export type Body = ${bodyParam.type};\n` : '') +
      `  export type Parameters = ${(() => {
        const properties: string[] = [];
        if (pathParams.length) properties.push(`    path: PathParams;`);
        if (queryType) properties.push(`    query: Query;`);
        if (bodyParam) properties.push(`    body: Body;`);

        return properties.length ? `{\n${properties.join('\n')}\n  };` : `{}`;
      })()}\n` +
      `  export type Response = ${route.returnType};\n` +
      `\n` +
      `  export const METHOD = '${route.method}' as const;\n` +
      `  export const PATH: string = '${route.path}';\n` +
      `}`
    );
  }

  function buildQueryType(queryParams: IRoute.IParameter[]): string | undefined {
    if (queryParams.length === 0) return undefined;

    const aliasTypeNames: string[] = [];
    const aliasTypes: string[] = [];
    const aliasTypeFieldMap: Record<string, string> = {};
    queryParams.forEach((param) => {
      if (param.field !== null && param.field !== '') {
        aliasTypeFieldMap[param.field] = param.type;
      } else if (param.field === '' && param.type.startsWith('{')) {
        aliasTypes.push(param.type);
      } else {
        aliasTypeNames.push(param.type);
      }
    });

    const aliasTypeFieldArrays = Object.entries(aliasTypeFieldMap);
    return [
      ...aliasTypeNames,
      ...aliasTypes,
      aliasTypeFieldArrays.length > 0
        ? '{\n' +
          aliasTypeFieldArrays.map(([field, type]) => `      ${field}: ${type};`).join('\n') +
          '\n    }'
        : undefined,
    ]
      .filter((str) => !!str)
      .join(` &\n    `);
  }
}
