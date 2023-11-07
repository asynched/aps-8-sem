<script lang="ts">
  import Input from '@/components/forms/Input.svelte'
  import type { ActionData } from './$types'
  import { enhance } from '$app/forms'
  import { fade } from 'svelte/transition'

  export let form: ActionData

  $: error = typeof form?.error === 'string' ? form.error : undefined
</script>

<svelte:head>
  <title>Collect-it | Login</title>
</svelte:head>

<div class="w-full h-screen grid place-items-center">
  <div class="flex flex-col items-center">
    <h1 class="mb-2 text-4xl font-bold tracking-tighter text-green-600">
      Collect-it
    </h1>
    <p class="mb-4 text-center leading-tight">
      Compartilhe pontos de coleta
      <br />
      de lixo recicláveis
    </p>
    <form method="POST" action="?/login" class="mb-4 grid gap-4" use:enhance>
      <Input
        name="username"
        label="Usuário"
        type="text"
        placeholder="Digite seu nome de usuário"
      />
      <Input
        type="password"
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
      />
      <button class="py-2 px-4 bg-green-600 text-white rounded">
        Entrar
      </button>
      {#if error}
        <span in:fade class="text-sm text-red-600 text-center">{error}</span>
      {/if}
    </form>
    <p>
      Não tem uma conta?
      <a class="underline text-green-600" href="/cadastro">Cadastre-se</a>
    </p>
  </div>
</div>
