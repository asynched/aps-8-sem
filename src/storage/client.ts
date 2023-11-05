import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

type Bytes = Buffer | Uint8Array | ArrayBuffer

type FilePath = {
  absolute: string
  relative: string
  url: string
}

export interface Storage {
  save(path: string, filename: string, data: Bytes): Promise<FilePath>
}

export class NodeStorage implements Storage {
  private readonly root = join(process.cwd(), 'static')

  async save(path: string, filename: string, data: Bytes): Promise<FilePath> {
    const buffer = Buffer.from(data)

    const relative = join(path, filename)
    const absolute = join(this.root, relative)

    await writeFile(absolute, buffer)

    return {
      absolute,
      relative,
      url: `/${relative}`,
    }
  }
}

export const storage = new NodeStorage()
