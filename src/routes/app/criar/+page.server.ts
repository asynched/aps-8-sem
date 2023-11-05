import { object, string, instanceof as instanceOf, array } from 'zod'
import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { db } from '@/db/client'
import { storage } from '@/storage/client'

const create = object({
  name: string().min(2).max(255),
  address: string().min(2).max(255),
  city: string().min(2).max(255),
  state: string().min(2).max(255),
})

const images = array(instanceOf(File)).min(1)

export const actions: Actions = {
  async create({ request, locals }) {
    const user = locals.user

    if (!user) {
      return fail(400, {
        error: 'Você precisa estar logado para criar um ponto de coleta',
      })
    }

    const form = await request.formData()
    const formResult = create.safeParse(Object.fromEntries(form))

    if (!formResult.success) {
      return fail(400, {
        errors: formResult.error.flatten().fieldErrors,
      })
    }

    const point = await db.point.create({
      data: {
        ...formResult.data,
        userId: user.id,
      },
    })

    const filesResult = images.safeParse(Array.from(form.getAll('image')))

    if (!filesResult.success) {
      return fail(400, {
        errors: filesResult.error.flatten().fieldErrors,
      })
    }

    const files = filesResult.data

    const paths = await Promise.all(
      files.map(async (file) =>
        storage.save(
          'points',
          `${crypto.randomUUID()}-${file.name}.jpg`,
          await file.arrayBuffer(),
        ),
      ),
    )

    await Promise.all(
      paths.map((path) =>
        db.pointImage.create({
          data: {
            url: path.url,
            pointId: point.id,
          },
        }),
      ),
    )

    throw redirect(302, '/app')
  },
}
