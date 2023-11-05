<script lang="ts">
  import ImageInput from '@/components/forms/ImageInput.svelte'
  import Input from '@/components/forms/Input.svelte'

  let images = 1

  function addImages() {
    if (images > 3) {
      return
    }

    images += 1
  }

  function removeImages() {
    if (images <= 1) {
      return
    }

    images -= 1
  }
</script>

<h1 class="mb-2 text-4xl font-bold tracking-tighter text-green-600">
  Criar ponto
</h1>
<p class="mb-4 leading-tight">
  Preencha o formulário para criar um novo ponto de coleta
</p>

<form
  method="POST"
  enctype="multipart/form-data"
  action="?/create"
  class="grid gap-4"
>
  <Input
    name="name"
    type="text"
    label="Nome"
    placeholder="Nome do ponto de coleta"
  />
  <Input
    name="address"
    type="text"
    label="Endereço"
    placeholder="Endereço do ponto de coleta"
  />
  <Input name="city" type="text" label="Cidade" placeholder="Cidade" />
  <Input name="state" type="text" label="Estado" placeholder="Estado" />
  {#each Array.from({ length: images }) as _, index (index)}
    <ImageInput label="Imagem" name="image" />
  {/each}
  <div class="grid grid-cols-2 gap-4 text-gray-800">
    <button
      type="button"
      class="py-2 px-4 border rounded grid place-items-center disabled:bg-gray-100"
      on:click={removeImages}
      disabled={images <= 1}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
      </svg>
    </button>
    <button
      type="button"
      class="py-2 px-4 border rounded grid place-items-center disabled:bg-gray-100"
      on:click={addImages}
      disabled={images >= 3}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  </div>
  <button class="py-2 px-4 bg-green-600 rounded text-white">Criar</button>
</form>
