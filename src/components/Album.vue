<template>
  <div class="flex flex-col
              xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2
              box-border p-2">
    <img :src="album.images[1].url"
        class="w-full rounded-2xl" />
    <div class="p-2">
      <h5 class="text-lg">
        <a :href="googleSearchLink(album)"
            target="_blank" rel="noopener noreferrer"
            class="underline">
          {{ album.name }}
        </a>
      </h5>
      <h6 class="text-sm opacity-50 underline cursor-pointer"
          @click="selectArtist(album)">
        {{ album.artists[0].name }}
      </h6>
    </div>
  </div>
</template>

<script>
import { GoogleSearchLink } from '../lib/google-search-link'

export default {
  props: {
    album: Object
  },
  setup(_, { emit }) {
    const googleSearchLink = (album) => {
      return new GoogleSearchLink(`${encodeURI(album.name)}+${encodeURI(album.artists[0].name)}`).link
    }

    const selectArtist = (album) => {
      emit('artist-selected', album.artists[0].name)
    }

    return { googleSearchLink, selectArtist }
  }
}
</script>
