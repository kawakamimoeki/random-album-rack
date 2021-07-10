<template>
  <div class="w-full my-3"
        v-if="Object.keys(artist).length > 0">
    <img class="w-64 h-64 object-cover mx-auto rounded-full"
            :src="artist.images[1].url" />
    <h3 class="text-center mt-4 font-bold">
      <a :href="googleSearchLink(artist)"
          target="_blank" rel="noopener noreferrer"
          class="underline">
        {{ artist.name }}
      </a>
    </h3>
  </div>
</template>

<script>
import { GoogleSearchLink } from '../lib/google-search-link'

export default {
  props: {
    artist: Object
  },
  setup () {
    const googleSearchLink = (artist) => {
      return new GoogleSearchLink(artist.name).link
    }

    return { googleSearchLink }
  }
}
</script>
