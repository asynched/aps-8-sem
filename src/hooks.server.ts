import type { User } from '@prisma/client'
import { redirect, type Handle } from '@sveltejs/kit'
import { db } from './db/client'

export const handle: Handle = async ({ event, resolve }) => {
  const isPrivate = event.request.url.includes('/app')

  let user: User | null = null
  const token = event.cookies.get('token')

  if (token) {
    const session = await db.session.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    })

    user = session?.user || null
  }

  event.locals.user = user

  if (isPrivate && !user) {
    throw redirect(302, '/')
  }

  if (!isPrivate && user) {
    throw redirect(302, '/app')
  }

  return resolve(event)
}
