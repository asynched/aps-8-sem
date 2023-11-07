import { redirect, fail } from '@sveltejs/kit'
import { object, string, instanceof as instanceOf } from 'zod'
import type { Actions } from './$types'
import { hash, genSalt } from 'bcryptjs'

import { db } from '@/db/client'
import { avatar } from '@/avatar/client'
import { storage } from '@/storage/client'

const register = object({
  name: string()
    .min(2, { message: 'Nome precisa ter pelo menos 2 caracteres ' })
    .max(255, {
      message: 'Nome pode ter no máximo 255 caracteres',
    }),
  username: string()
    .min(4, { message: 'Usuário precisa ter pelo menos 4 caracteres' })
    .max(16, { message: 'Usuário pode ter no máximo 16 caracteres' })
    .regex(/^[a-z0-9_]+$/i, {
      message: 'Usuário só pode conter letras, números e _',
    }),
  email: string().email({ message: 'E-mail precisa ser válido' }).max(255),
  password: string()
    .min(8, { message: 'Senha precisa ter pelo menos 8 caracteres ' })
    .max(255, {
      message: 'Senha pode ter no máximo 255 caracteres',
    }),
  avatar: instanceOf(File).optional(),
})

export const actions: Actions = {
  async register({ request }) {
    const body = Object.fromEntries(await request.formData())

    const result = register.safeParse(body)

    if (!result.success) {
      return fail(400, {
        error: result.error.flatten().fieldErrors,
      })
    }

    try {
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
    } catch (err) {
      return fail(400, {
        error: 'Usuário já existe',
      })
    }

    throw redirect(302, '/')
  },
}
