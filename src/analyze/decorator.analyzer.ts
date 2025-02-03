import path from 'path';
import { IController, ParamCategory } from '../structures';
import { equalArrayElement, findBetweenString, hasElements } from '../utils';

type IModule = {
  [key: string]: any;
};

type NestParameters = { [key: string]: INestParam };
interface INestParam {
  index: number;
  data: string | undefined;
  pipes: unknown[];
}

const METHOD = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'ALL', 'OPTIONS', 'HEAD'];

/** [Reference](https://github.com/nestjs/nest/blob/master/packages/common/enums/route-paramtypes.enum.ts) */
const NEST_ROUTE_PARAM_TYPES = [
  undefined,
  undefined,
  undefined,
  'Body',
  'Query',
  'Param',
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
] as const;

export namespace ReflectAnalyzer {
  export async function analyze(sourceFileNames: string[]): Promise<IController[]> {
    const result: IController[] = [];

    for (const sourceFileName of sourceFileNames) {
      const filePath: string = path.join(process.cwd(), sourceFileName);
      const modules: IModule = await import(filePath);
      for (const [name, creator] of Object.entries(modules)) {
        const controller: IController | null = analyzeController(sourceFileName, name, creator);
        if (controller !== null) result.push(controller);
      }
    }

    return result;
  }

  function analyzeController(
    sourceFileName: string,
    name: string,
    creator: any,
  ): IController | null {
    //----
    // Validation
    //----
    if (!(creator instanceof Function) || !(creator.constructor instanceof Function)) {
      return null;
    } else if (hasElements(Reflect.getMetadataKeys(creator), 'path', 'host') === false) {
      return null;
    }

    //----
    // Construction
    //----
    const meta: IController = {
      sourceFileName,
      name,
      paths: getPaths(Reflect.getMetadata('path', creator)),
      version: Reflect.getMetadata('__version__', creator),
      functions: [],
    };
    for (const [name, proto] of getPrototypeEntries(creator)) {
      const func = analyzeFunction(creator.prototype, meta, name, proto);
      if (func !== null) meta.functions.push(func);
    }

    return meta;
  }

  function getPrototypeEntries(creator: any): Array<[string, unknown]> {
    const keyList = Object.getOwnPropertyNames(creator.prototype);
    const entries: Array<[string, unknown]> = keyList.map((key) => [key, creator.prototype[key]]);
    const parent = Object.getPrototypeOf(creator);
    if (parent.prototype !== undefined) entries.push(...getPrototypeEntries(parent));
    return entries;
  }

  function getPaths(value: string | string[]): string[] {
    if (typeof value === 'string') return [value];
    else if (value.length === 0) return [''];
    else return value;
  }

  function analyzeFunction(
    classProto: any,
    controllerMeta: IController,
    name: string,
    proto: any,
  ): IController.IFunction | null {
    //----
    // Validation
    //----
    if (!(proto instanceof Function)) {
      return null;
    } else if (hasElements(Reflect.getMetadataKeys(proto), 'path', 'method') === false) {
      return null;
    }

    //----
    // Construction
    //----
    const meta: IController.IFunction = {
      name,
      method: METHOD[Reflect.getMetadata('method', proto)],
      version: Reflect.getMetadata('__version__', proto),
      paths: getPaths(Reflect.getMetadata('path', proto)),
      parameters: [],
    };
    const nestParameters: NestParameters | undefined = Reflect.getMetadata(
      '__routeArguments__',
      classProto.constructor,
      name,
    );

    if (nestParameters !== undefined) {
      for (const [key, nestParam] of Object.entries(nestParameters)) {
        const param = analyzeParameter(key, nestParam);
        if (param !== null) meta.parameters.push(param);
      }
      meta.parameters = meta.parameters.sort((x, y) => x.index - y.index);
    }

    // Validate path arguments
    for (const controllerPath of controllerMeta.paths) {
      for (const metaPath of meta.paths) {
        const funcPathArguments = findBetweenString(
          path.join(controllerPath, metaPath).split('\\').join('/'),
          ':',
          '/',
        ).sort();
        const paramPathArguments = meta.parameters
          .reduce<string[]>((acc, param) => {
            if (param.category === 'Param') acc.push(param.field!);
            return acc;
          }, [])
          .sort();

        if (equalArrayElement(funcPathArguments, paramPathArguments) === false) {
          throw new Error(
            `Error on ${
              controllerMeta.name
            }.${name}(): binded arguments in the "path" between function's decorator and parameters' decorators are different (function: [${funcPathArguments.join(
              ', ',
            )}], parameters: [${paramPathArguments.join(', ')}])`,
          );
        }
      }
    }

    return meta;
  }

  function analyzeParameter(key: string, param: INestParam): IController.IParameter | null {
    const paramSymbol: string = key.split(':')[0];
    if (paramSymbol.indexOf('__custom') !== -1) return null;

    const paramTypeIndex: number = Number(paramSymbol[0]);
    if (isNaN(paramTypeIndex) === true) return null;

    const category: ParamCategory | undefined = NEST_ROUTE_PARAM_TYPES[paramTypeIndex];
    if (category === undefined) return null;

    return {
      index: param.index,
      name: key,
      field: param.data || '',
      category,
    };
  }
}
