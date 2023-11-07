<script lang="ts">
  import type { PageData } from './$types'
  import Input from '@/components/forms/Input.svelte'

  export let data: PageData
</script>

<svelte:head>
  <title>Collect-it | Perfil</title>
</svelte:head>

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

<form method="POST" action="?/updateProfile" class="grid gap-4">
  <Input
    label="Nome"
    name="name"
    type="text"
    placeholder="Digite seu nome"
    value={data.user.name}
    required={false}
  />
  <Input
    label="E-mail"
    name="email"
    type="email"
    placeholder="Digite seu e-mail"
    value={data.user.email}
    required={false}
  />
  <Input
    label="Senha"
    name="password"
    type="password"
    placeholder="Digite sua senha"
    required={false}
  />
  <button class="py-2 px-4 bg-green-600 text-white rounded"> Salvar </button>
  <button
    class="py-2 px-4 border border-red-600 text-red-600 rounded"
    formaction="?/signOut"
  >
    Sair
  </button>
</form>
