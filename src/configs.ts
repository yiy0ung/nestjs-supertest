import ts from 'typescript';

export interface Configs {
  input: string[];
  output: string;
  tsconfigFile: string;
  compileOptions: ts.CompilerOptions;
  rawCompileOptions: any;
}
