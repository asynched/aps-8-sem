<script lang="ts">
  import Input from '@/components/forms/Input.svelte'
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'

  const dispatch = createEventDispatcher<{ close: void }>()
</script>

<div
  in:fade
  out:fade
  class="w-full h-screen bg-black fixed top-0 right-0 z-10 bg-opacity-50 backdrop-blur-sm grid place-items-center"
>
  <div class="p-8 bg-white rounded max-w-sm relative">
    <button class="absolute top-8 right-8" on:click={() => dispatch('close')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-gray-600"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <h2 class="mb-2 text-2xl font-bold tracking-tighter">Criar avaliação</h2>
    <p class="mb-4 leading-none">
      Preencha o formulário<br />para criar uma avaliação
    </p>
    <form method="POST" action="?/createRating" class="grid gap-4">
      <Input
        name="comment"
        label="Comentário"
        placeholder="Digite seu comentário"
        type="text"
      />
      <Input
        name="rating"
        label="Nota"
        placeholder="Digite sua nota"
        type="number"
      />
      <button class="py-2 px-4 bg-green-600 text-white rounded">
        Criar avaliação
      </button>
    </form>
  </div>
</div>
