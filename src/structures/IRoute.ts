import ts from 'typescript';
import { ParamCategory } from './ParamCategory';

export interface IRoute {
  method: string;

  name: string;
  version: string | null;
  path: string;
  paths: string[];

  controllerName: string;
  controllerVersion: string | null;
  controllerPath: string[];

  returnType: string;
  imports: IRoute.IImport[];
  parameters: IRoute.IParameter[];

  comment: string;
  tags: ts.JSDocTagInfo[];

  skip: boolean;
}

export declare namespace IRoute {
  export interface IImport {
    exports: string[];
    from: string;
  }

  export interface IParameter {
    name: string;
    field: string | null;
    category: ParamCategory;
    type: string;
  }
}
