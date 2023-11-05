import { redirect, fail } from '@sveltejs/kit'
import { object, string, instanceof as instanceOf } from 'zod'
import type { Actions } from './$types'
import { hash, genSalt } from 'bcryptjs'

import { db } from '@/db/client'
import { avatar } from '@/avatar/client'
import { storage } from '@/storage/client'

const register = object({
  name: string().min(2).max(255),
  username: string()
    .min(4)
    .max(16)
    .regex(/^[a-z0-9_]+$/i),
  email: string().email().max(255),
  password: string().min(8).max(255),
  avatar: instanceOf(File).optional(),
})

export const actions: Actions = {
  async register({ request }) {
    const body = Object.fromEntries(await request.formData())

    const result = register.safeParse(body)

    if (!result.success) {
      console.log(
        '🚀 ~ file: +page.server.ts:26 ~ register ~ result:',
        result.error,
      )

      return fail(400, {
        errors: result.error.flatten().fieldErrors,
      })
    }

    const data = result.data

    data.password = await hash(data.password, await genSalt())

    const user = await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        username: data.username,
        password: data.password,
        avatarUrl: avatar.getAvatar(data.username),
      },
    })

    if (data.avatar) {
      const fileInfo = await storage.save(
        'avatars',
        `${crypto.randomUUID()}.jpg`,
        await data.avatar.arrayBuffer(),
      )

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          avatarUrl: fileInfo.url,
        },
      })
    }

    throw redirect(302, '/')
  },
}
