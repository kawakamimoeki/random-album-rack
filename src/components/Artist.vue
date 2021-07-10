<template>
  <div class="artist"
        v-if="Object.keys(artist).length > 0">
    <img class="artist__cover" :src="artist.images[1].url" />
    <h3 class="artist__name">
      <a :href="googleSearchLink(artist)">
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

<style lang="scss" scoped>
.artist {
  width: 100%;
  margin: 20px 0;
}
.artist__cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  border-radius: 100%;
  margin-bottom: 10px;
}
.artist__name {
  margin: 0 auto;
  display: block;
  text-align: center;
  
  a {
    color: #fff;
  }
}
</style>
