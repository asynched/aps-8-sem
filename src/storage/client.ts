import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { put } from '@vercel/blob'
import { env } from '$env/dynamic/private'

type Bytes = Buffer | Uint8Array | ArrayBuffer

type FilePath = {
  absolute: string
  relative: string
  url: string
}

export interface Storage {
  save(path: string, filename: string, data: Bytes): Promise<FilePath>
}

export class VercelStorage implements Storage {
  async save(path: string, filename: string, data: Bytes): Promise<FilePath> {
    try {
      const { url } = await put(`${path}/${filename}`, data, {
        access: 'public',
      })

      return {
        url,
        absolute: url,
        relative: url,
      }
    } catch (err) {
      throw err
    }
  }
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

export let storage: Storage = new VercelStorage()

if (env.NODE_ENV === 'development') {
  storage = new NodeStorage()
}
