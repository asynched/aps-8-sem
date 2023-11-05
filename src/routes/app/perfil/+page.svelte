<script lang="ts">
  import ImageInput from '@/components/forms/ImageInput.svelte'
  import type { PageData } from './$types'
  import Input from '@/components/forms/Input.svelte'

  export let data: PageData
</script>

<h1 class="text-4xl font-bold tracking-tighter text-green-600">Perfil</h1>
<p class="mb-4">Altere as informações do seu perfil</p>

<div class="mb-4 flex flex-col items-center">
  <img
    src={data.user.avatarUrl}
    alt="Avatar"
    class="mb-4 w-32 h-32 rounded-full"
  />
  <h2 class="text-2xl font-bold tracking-tighter">@{data.user.username}</h2>
  <p>{data.user.name}</p>
</div>

<form class="grid gap-4">
  <Input
    label="Nome"
    name="name"
    type="text"
    placeholder="Digite seu nome"
    value={data.user.name}
  />
  <Input
    label="E-mail"
    name="email"
    type="email"
    placeholder="Digite seu e-mail"
    value={data.user.email}
  />
  <Input
    label="Senha"
    name="password"
    type="password"
    placeholder="Digite sua senha"
  />
  <button class="py-2 px-4 bg-green-600 text-white rounded"> Salvar </button>
</form>
