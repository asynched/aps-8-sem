<script lang="ts">
  import type { PageData } from './$types'
  import CreateRatingModal from '@/components/modals/CreateRatingModal.svelte'

  export let data: PageData

  const { point } = data

  let modal = false
  let activeImage = 0

  const toggleModal = () => {
    modal = !modal
  }
</script>

<svelte:head>
  <title>Collect-it | {point.name}</title>
</svelte:head>

<img
  src={point.images[activeImage].url}
  alt={point.name}
  class="h-72 w-full object-cover rounded mb-4"
/>

<div class="mb-4 grid grid-cols-3 gap-4">
  {#each point.images as image, index (image.id)}
    <button
      on:click={() => {
        activeImage = index
      }}
    >
      <img
        class="h-full object-cover rounded"
        class:brightness-50={activeImage !== index}
        src={image.url}
        alt={point.name}
      />
    </button>
  {/each}
</div>

<div class="flex gap-2 items-center">
  <h1 class="text-4xl font-bold tracking-tighter">
    {point.name}
  </h1>
  {#if point.verified}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-8 h-8 text-blue-600"
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
<p class="mb-4">{point.city} - {point.state}.</p>

<button
  on:click={toggleModal}
  class="mb-4 py-2 w-full text-white bg-green-600 rounded">Avaliar</button
>

<h2 class="mb-4 text-2xl font-bold tracking-tighter">Avaliações</h2>

{#if point.ratings.length > 0}
  <ul>
    {#each point.ratings as rating (rating.id)}
      <li class="p-4 border rounded">
        <div class="mb-2 flex gap-2 items-center">
          <img
            src={rating.user.avatarUrl}
            alt={rating.user.username}
            class="w-10 h-10 rounded-full"
          />
          <div>
            <p class="text-sm leading-none text-gray-600">
              @{rating.user.username}
            </p>
            <p>{rating.user.name}</p>
          </div>
        </div>
        <p>{rating.comment}</p>
        <div class="flex mb-2">
          {#each Array(5).fill(null) as _, index (index)}
            {@const stars = rating.rating}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4"
              class:text-gray-300={index >= stars}
              class:text-yellow-500={index < stars}
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              />
            </svg>
          {/each}
        </div>
        <p class="text-sm text-gray-600">
          {point.createdAt.toLocaleDateString()}
        </p>
      </li>
    {/each}
  </ul>
{:else}
  <div class="p-4 bor">
    <p class="text-gray-600">Nenhuma avaliação encontrada.</p>
  </div>
{/if}

{#if modal}
  <CreateRatingModal on:close={toggleModal} />
{/if}
