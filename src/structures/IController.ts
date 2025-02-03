import { ParamCategory } from './ParamCategory';

export interface IController {
  sourceFileName: string;
  name: string;
  paths: string[];
  version: string | null;
  functions: IController.IFunction[];
}

export declare namespace IController {
  export interface IFunction {
    name: string;
    method: string;
    version: string | null;
    paths: string[];
    parameters: IParameter[];
  }

  export interface IParameter {
    index: number;
    name: string;
    field: string | null;
    category: ParamCategory;
  }
}
