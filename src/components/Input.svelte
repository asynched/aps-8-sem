<script lang="ts">
  export let label: string
  export let type: string
  export let name: string
  export let placeholder: string
</script>

<div class="flex flex-col gap-1">
  <label for={name}>{label}</label>
  <input
    {type}
    {name}
    id={name}
    {placeholder}
    class="py-2 px-4 border rounded outline-none"
  />
</div>
