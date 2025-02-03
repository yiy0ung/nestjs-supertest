#!/usr/bin/env node

import '@nestjs/common';
import commander from 'commander';
import path from 'path';
import { parse as parseTsConfig } from 'tsconfck';
import ts from 'typescript';

import pkg from '../../package.json';
import { NestjsSupertestApp } from '../nestjs-supertest-app';
import { Configs } from '../configs';

interface Command {
  input: string[];
  output: string;
  project: string;
}

async function loadConfig(command: Command): Promise<Configs> {
  const tsconfigFile: string = path.join(process.cwd(), command.project ?? 'tsconfig.json');
  const tsconfigFilePath: string = path.dirname(tsconfigFile);
  const tsconfigFileName: string = path.basename(tsconfigFile);

  const configFileName: string | undefined = ts.findConfigFile(
    tsconfigFilePath,
    ts.sys.fileExists,
    tsconfigFileName,
  );
  if (!configFileName) throw new Error(`unable to find "${tsconfigFileName}" file.`);
  const { tsconfig } = await parseTsConfig(configFileName);
  const configFileText = JSON.stringify(tsconfig);
  const { config } = ts.parseConfigFileTextToJson(configFileName, configFileText);
  const content = ts.parseJsonConfigFileContent(config, ts.sys, path.dirname(configFileName));

  return {
    input: command.input,
    output: command.output,
    tsconfigFile,
    compileOptions: content.options,
    rawCompileOptions: content.raw.compilerOptions,
  };
}

async function main(command: Command) {
  const config = await loadConfig(command);

  const apiSpecGenApp = new NestjsSupertestApp(config);
  await apiSpecGenApp.generate(pkg.version);
}

commander.program
  .version(pkg.version, '-v, --version', 'output the current version')
  .requiredOption('-i, --input <dir_path...>', '')
  .requiredOption('-o, --output <dir_path>', '')
  .option(
    '-p, --project <project_file_path>',
    'Use --project to explicitly specify the path to a tsconfig.json',
    'tsconfig.json',
  );
commander.program.parse(process.argv);

main(commander.program.opts()).catch((err) => {
  console.log(err);
  process.exit(-1);
});
