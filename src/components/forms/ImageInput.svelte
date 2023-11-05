<script lang="ts">
  export let name: string
  export let label: string

  let imageRef: HTMLInputElement
  let files: FileList | null = null

  $: file = files?.[0]
</script>

<div class="flex flex-col gap-1">
  <label for={name}>{label}</label>
  <input
    type="file"
    accept="image/*"
    id={name}
    {name}
    class="hidden"
    bind:files
    bind:this={imageRef}
  />
  <button
    on:click={() => imageRef.click()}
    type="button"
    class="py-3 px-4 border-2 border-dashed rounded text-sm text-gray-600"
  >
    {#if file}
      {file.name}
    {:else}
      Nenhuma imagem foi selecionada
    {/if}
  </button>
</div>
