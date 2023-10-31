import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user!

  return {
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    },
  }
}
