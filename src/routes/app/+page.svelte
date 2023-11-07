<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
  <title>Collect-it | App</title>
</svelte:head>

<h1 class="text-4xl font-bold tracking-tighter text-green-600">
  Pontos de coleta
</h1>

<p class="mb-4">Veja os pontos de coleta próximos de você.</p>

<div class="mb-4 flex gap-2 items-center">
  <img
    src={data.user.avatarUrl}
    alt={data.user.username}
    class="w-12 h-12 rounded-full object-cover"
  />
  <div>
    <h2 class="leading-none text-lg font-bold tracking-tighter">
      @{data.user.username}
    </h2>
    <p>{data.user.name}</p>
  </div>
</div>

<ul class="grid gap-4">
  {#each data.points as point (point.id)}
    <li class="p-4 border rounded">
      <img
        src={point.images[0].url}
        alt={point.name}
        class="mb-4 h-48 w-full object-cover rounded"
      />
      <div class="mb-2 flex gap-1 items-center">
        <a
          href={`/app/pontos/${point.id}`}
          class="text-2xl font-bold tracking-tighter">{point.name}</a
        >
        {#if !point.verified}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-blue-600"
          >
            <path
              fill-rule="evenodd"
              d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>
        {/if}
      </div>
      <p>{point.address}.</p>
      <p>{point.city} - {point.state}.</p>
      <p>Criado por @{point.user.username}</p>
    </li>
  {/each}
</ul>
