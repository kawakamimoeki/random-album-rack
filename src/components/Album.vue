<template>
  <div class="album">
    <img :src="album.images[1].url"
          class="album__cover" />
    <h5 class="album__title">
      <a :href="googleSearchLink(album)"
          target="_blank"
          rel="noopener noreferrer">
        {{ album.name }}
      </a>
    </h5>
    <h6 class="album__artist"
        @click="selectArtist(album)">
      {{ album.artists[0].name }}
    </h6>
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

<style lang="scss" scoped>
.album__title {
  margin: 0;
  font-weight: normal;
  padding-top: 5px;
  
  a {
    color: #fff;
  }
}
.album__artist {
  margin: 0;
  opacity: 0.6;
  font-weight: normal;
  padding-top: 4px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
}
.album {
  @media screen and (min-width: 1200px) {
    width: 16.66%;
  }
  @media screen and (min-width: 800px) {
    width: 33.33%;
  }
  width: 50%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.album__cover {
  width: 100%;
  border-radius: 10px;
}
</style>
