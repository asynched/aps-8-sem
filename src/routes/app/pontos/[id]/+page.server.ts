import { db } from '@/db/client'
import type { Actions, PageServerLoad } from './$types'
import { fail } from '@sveltejs/kit'
import { coerce, number, object, string } from 'zod'

export const load: PageServerLoad = async ({ params }) => {
  const point = await db.point.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      images: {
        select: {
          id: true,
          url: true,
        },
      },
      ratings: {
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              username: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  })

  if (!point) {
    throw new Error('Point not found')
  }

  return {
    point,
  }
}

const createRating = object({
  comment: string().default(''),
  rating: coerce.number().min(0).max(5),
})

export const actions: Actions = {
  async createRating({ request, locals, params }) {
    try {
      const user = locals.user

      if (!user) {
        return fail(400, {
          error: 'User not found',
        })
      }

      const form = Object.fromEntries(await request.formData())
      const result = createRating.safeParse(form)

      if (!result.success) {
        return fail(400, {
          error: result.error.flatten().fieldErrors,
        })
      }

      await db.pointRating.create({
        data: {
          ...result.data,
          pointId: Number(params.id),
          userId: user.id,
        },
      })

      return { success: true }
    } catch (err) {
      return fail(400, {
        error: 'Error creating rating, rating already exists',
      })
    }
  },
}
