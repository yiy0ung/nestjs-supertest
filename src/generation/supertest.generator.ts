import fs from 'fs';
import NodePath from 'path';
import { Configs } from '../configs';
import { IRoute } from '../structures';
import { FileGenerator } from './file.generator';

export namespace SupertestGenerator {
  export async function generate(
    configs: Configs,
    bundlePath: string,
    routes: IRoute[],
  ): Promise<void> {
    const specPath = NodePath.join(configs.output, 'supertest-client');

    try {
      await fs.promises.mkdir(specPath);
    } catch {}

    await FileGenerator.generate(specPath, bundlePath, routes);
  }
}
