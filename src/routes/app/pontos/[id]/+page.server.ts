import { db } from '@/db/client'
import type { PageServerLoad } from './$types'

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
    },
  })

  if (!point) {
    throw new Error('Point not found')
  }

  return {
    point,
  }
}
