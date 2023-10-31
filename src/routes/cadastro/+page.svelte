<script lang="ts">
  import Input from '@/components/Input.svelte'
</script>

<div class="w-full h-screen grid place-items-center">
  <div class="flex flex-col items-center">
    <h1 class="mb-2 text-4xl font-bold tracking-tighter text-green-600">
      Cadastro
    </h1>
    <p class="leading-tight text-center mb-4">
      Preencha o formulário<br />para se cadastrar
    </p>
    <form method="POST" action="?/register" class="mb-4 grid gap-4">
      <Input
        name="name"
        label="Nome"
        type="text"
        placeholder="Digite seu nome completo"
      />
      <Input
        name="username"
        label="Usuário"
        type="text"
        placeholder="Digite seu nome de usuário"
      />
      <Input
        name="email"
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
      />
      <Input
        type="password"
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
      />
      <button class="py-2 px-4 rounded bg-green-600 text-white">
        Cadastrar
      </button>
    </form>
    <p>
      Já tem uma conta?
      <a class="underline text-green-600" href="/">Faça login</a>
    </p>
  </div>
</div>
