<template>
  <ArtistInput :input="state.input"
                @entered="load" />
  <Artist :artist="state.artist"/>
  <Rack :albums="state.albums"
        @artist-selected="load" />
</template>

<script>
import _ from 'lodash/collection'
import { reactive } from 'vue'
import { spotifyApi } from './lib/spotify-api'
import ArtistInput from './components/ArtistInput.vue'
import Artist from './components/Artist.vue'
import Rack from './components/Rack.vue'

export default {
  components: {
    ArtistInput,
    Artist,
    Rack
  },
  setup() {
    const state = reactive({
      input: '',
      artist: {},
      albums: []
    })

    const load = async (name) => {
      if (name === '') return 0

      state.albums = []
      let artists
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
        (data) => { albums = data.body.items },
        (error) => { alert(`[Spotify]${error}`) }
      )

      await spotifyApi.getArtistRelatedArtists(state.artist.id).then(
        (data) => { artists = data.body.artists },
        (error) => { alert(`[Spotify]${error}`) }
      )

      for (let artist of artists) {
        await spotifyApi.getArtistAlbums(artist.id).then(
          (data) => { albums = albums.concat(data.body.items) },
          (error) => { alert(`[Spotify]${error}`) }
        )
      }

      albums = _.shuffle(albums)
      state.albums = albums
    }

    return { state, load }
  }
}
</script>
