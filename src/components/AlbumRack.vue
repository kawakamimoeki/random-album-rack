<template>
  <input type="text"
          v-model="state.input"
          @change="load(state.input)" 
          placeholder="Artist name"
          class="favorite-artist"
          autofocus />

  <div class="rack">
    <div class="artist"
          v-if="state.isLoading && state.artist !== {}">
      <img class="artist__cover" :src="state.artist.images[1].url" />
      <h3 class="artist__name">{{ state.artist.name }}</h3>
    </div>

    <div v-for="album in state.albums"
        :key="album.id"
        class="album">
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
          @click="load(album.artists[0].name)">
        {{ album.artists[0].name }}
      </h6>
    </div>
  </div>
</template>

<style lang="scss">
.favorite-artist {
  font-size: 30px;
  border-radius: 30px;
  padding: 10px 30px;
  width: 100%;
  box-sizing: border-box;
  border: #333 solid 1px;
  background: #333;
  color: #fff;

  &:focus {
    outline: none;
  }
}
.artist {
  width: 100%;
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
}
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

<script>
import { reactive } from 'vue'
import { spotifyApi } from '../lib/spotify-api'

import _ from 'lodash/collection'

export default {
  setup() {
    const state = reactive({
      input: '',
      artist: {},
      artists: [],
      albums: [],
      isLoading: false
    })

    const load = async (name) => {
      state.artists = []
      state.albums = []
      let albums

      await spotifyApi.searchArtists(name).then(
        (data) => {
          if (data.body.artists.items.length > 0) {
            state.artist = data.body.artists.items[0]
          }
        },
        (error) => { alert(`[Spotify]${error}`) }
      )

      await spotifyApi.getArtistAlbums(state.artist.id).then(
        (data) => {
          albums = data.body.items
        },
        (error) => { alert(`[Spotify]${error}`) }
      )

      await spotifyApi.getArtistRelatedArtists(state.artist.id).then(
        (data) => {
          state.artists = data.body.artists
        },
        (error) => { alert(`[Spotify]${error}`) }
      )

      state.isLoading = true

      for (let artist of state.artists) {
        await spotifyApi.getArtistAlbums(artist.id).then(
          (data) => {
            albums = albums.concat(data.body.items)
          }
        ),
        (error) => { alert(`[Spotify]${error}`) }
      }

      albums = _.shuffle(albums)
      state.albums = albums
      state.isLoading = false
    }

    const googleSearchLink = (album) => {
      return `https://google.com/search?q=${encodeURI(album.name)}+${encodeURI(album.artists[0].name)}`
    }

    return { state, load, googleSearchLink }
  }
}
</script>
