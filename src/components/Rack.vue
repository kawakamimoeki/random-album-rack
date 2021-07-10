<template>
  <div class="flex flex-row flex-wrap my-5">
    <Album v-for="album in albums"
            :key="album.id"
            :album="album"
            @artist-selected="selectArtist" />
  </div>
</template>

<script>
import Album from './Album.vue'

export default {
  components: {
    Album
  },
  props: {
    albums: Array 
  },
  setup (_, { emit }) {
    const selectArtist = (artistName) => {
      emit('artist-selected', artistName)
    }

    return { selectArtist }
  }
}
</script>
