import { hash, genSalt } from 'bcryptjs'
import { object, string } from 'zod'
import type { Actions, PageServerLoad } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { db } from '@/db/client'

export const load: PageServerLoad = ({ locals }) => {
  const user = locals.user!

  return {
    user,
  }
}

const updateProfile = object({
  name: string().min(2).max(255).optional(),
  email: string().email().max(255).optional(),
  password: string().min(8).max(255).optional(),
})

export const actions: Actions = {
  async signOut({ cookies }) {
    const token = cookies.get('token')

    if (!token) {
      return fail(400, {
        error: 'Token not found',
      })
    }

    await db.session.delete({
      where: {
        token,
      },
    })

    throw redirect(302, '/')
  },

  async updateProfile({ request, locals }) {
    const user = locals.user!

    if (!user) {
      return fail(400, {
        error: 'User not found',
      })
    }

    const form = Object.fromEntries(await request.formData())

    const result = updateProfile.safeParse(form)

    if (!result.success) {
      console.log('Error', form)
      return fail(400, {
        error: result.error.flatten().fieldErrors,
      })
    }

    const data = result.data

    if (data.password) {
      data.password = await hash(data.password, await genSalt())
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data,
    })

    return { success: true }
  },
}
