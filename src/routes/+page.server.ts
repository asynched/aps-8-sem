import { object, string } from 'zod'
import type { Actions } from './$types'
import { db } from '@/db/client'
import { fail, redirect } from '@sveltejs/kit'
import { compare } from 'bcryptjs'
import crypto from 'node:crypto'
import type { User } from '@prisma/client'

const login = object({
  username: string().max(16),
  password: string().max(255),
})

function generateSessionToken(user: User) {
  return crypto
    .createHash('sha256')
    .update(
      JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        date: new Date(),
      }),
    )
    .digest('hex')
}

export const actions: Actions = {
  async login({ request, cookies }) {
    const body = Object.fromEntries(await request.formData())

    const result = login.safeParse(body)

    if (!result.success) {
      return fail(400, {
        error: result.error.flatten().fieldErrors,
      })
    }

    const data = result.data

    const user = await db.user.findUnique({
      where: {
        username: data.username,
      },
    })

    if (!user) {
      return fail(400, {
        error: 'Usuário não encontrado',
      })
    }

    const isPasswordValid = await compare(data.password, user.password)

    if (!isPasswordValid) {
      return fail(400, {
        error: 'Senha incorreta',
      })
    }

    const token = generateSessionToken(user)

    await db.session.create({
      data: {
        token,
        userId: user.id,
      },
    })

    cookies.set('token', token, {
      path: '/',
      httpOnly: true,
    })

    throw redirect(302, '/app')
  },
}
