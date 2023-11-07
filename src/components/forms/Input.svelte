<script lang="ts">
  export let label: string
  export let type: string
  export let name: string
  export let placeholder: string
  export let value: string | undefined = undefined
  export let required = true
  export let error: string | undefined = undefined
</script>

<div class="flex flex-col gap-1">
  <label for={name}>{label}</label>
  <input
    {type}
    {name}
    {placeholder}
    {required}
    value={value ?? ''}
    id={name}
    class="py-2 px-4 border rounded outline-none"
  />
  {#if error}
    <span class="text-sm text-red-600">{error}</span>
  {/if}
</div>
