import { redirect } from '@sveltejs/kit'
import { object, string } from 'zod'
import type { Actions } from './$types'
import { hash, genSalt } from 'bcryptjs'

import { db } from '@/db/client'

const register = object({
  name: string().min(2).max(255),
  username: string()
    .min(4)
    .max(16)
    .regex(/^[a-z0-9_]+$/i),
  email: string().email().max(255),
  password: string().min(8).max(255),
})

export const actions: Actions = {
  async register({ request }) {
    const body = Object.fromEntries(await request.formData())

    const data = register.parse(body)

    data.password = await hash(data.password, await genSalt())

    await db.user.create({
      data,
    })

    throw redirect(302, '/')
  },
}
