import fs from 'fs';

export namespace DirectoryUtil {
  export async function remove(path: string) {
    await fs.promises.rm(path, { recursive: true, force: true });
  }

  export async function remake(path: string): Promise<void> {
    await remove(path);
    await fs.promises.mkdir(path);
  }

  export async function copy(from: string, to: string) {
    await remake(to);
    await _copy(from, to);
  }

  async function _copy(from: string, to: string) {
    const dir = await fs.promises.readdir(from);
    for (const file of dir) {
      const fromPath: string = `${from}/${file}`;
      const toPath: string = `${to}/${file}`;
      const stats: fs.Stats = await fs.promises.stat(fromPath);

      if (stats.isDirectory() === true) {
        await fs.promises.mkdir(toPath);
        await _copy(fromPath, toPath);
      } else {
        const data: string = await fs.promises.readFile(fromPath, 'utf-8');
        await fs.promises.writeFile(toPath, data, 'utf-8');
      }
    }
  }
}
