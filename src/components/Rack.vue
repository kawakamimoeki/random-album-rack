<template>
  <div class="rack">
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

<style lang="scss" scoped>
.rack {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  font-family: sans-serif;
  color: #fff;
  width: 100%;
  padding: 2%;
  box-sizing: border-box;
  justify-content: space-between;
}
</style>
