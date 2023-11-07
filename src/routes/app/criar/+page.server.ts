import {
  object,
  string,
  instanceof as instanceOf,
  array,
  union,
  literal,
} from 'zod'
import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { db } from '@/db/client'
import { storage } from '@/storage/client'

const STATES = [
  { name: 'Acre', value: 'AC' },
  { name: 'Alagoas', value: 'AL' },
  { name: 'Amapá', value: 'AP' },
  { name: 'Amazonas', value: 'AM' },
  { name: 'Bahia', value: 'BA' },
  { name: 'Ceará', value: 'CE' },
  { name: 'Distrito Federal', value: 'DF' },
  { name: 'Espírito Santo', value: 'ES' },
  { name: 'Goiás', value: 'GO' },
  { name: 'Maranhão', value: 'MA' },
  { name: 'Mato Grosso', value: 'MT' },
  { name: 'Mato Grosso do Sul', value: 'MS' },
  { name: 'Minas Gerais', value: 'MG' },
  { name: 'Pará', value: 'PA' },
  { name: 'Paraíba', value: 'PB' },
  { name: 'Paraná', value: 'PR' },
  { name: 'Pernambuco', value: 'PE' },
  { name: 'Piauí', value: 'PI' },
  { name: 'Rio de Janeiro', value: 'RJ' },
  { name: 'Rio Grande do Norte', value: 'RN' },
  { name: 'Rio Grande do Sul', value: 'RS' },
  { name: 'Rondônia', value: 'RO' },
  { name: 'Roraima', value: 'RR' },
  { name: 'Santa Catarina', value: 'SC' },
  { name: 'São Paulo', value: 'SP' },
  { name: 'Sergipe', value: 'SE' },
  { name: 'Tocantins', value: 'TO' },
] as const

const create = object({
  name: string()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    .max(255, {
      message: 'Nome deve ter no máximo 255 caracteres',
    }),
  address: string()
    .min(2, {
      message: 'Endereço deve ter pelo menos 2 caracteres',
    })
    .max(255, {
      message: 'Endereço deve ter no máximo 255 caracteres',
    }),
  city: string()
    .min(2, {
      message: 'Cidade deve ter pelo menos 2 caracteres',
    })
    .max(255, {
      message: 'Cidade deve ter no máximo 255 caracteres',
    }),
  state: string().max(32),
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
        error: formResult.error.flatten().fieldErrors,
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
        error: filesResult.error.flatten().fieldErrors,
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
