import SpotifyWebApi from 'spotify-web-api-node'
import ky from 'ky'

const api = new SpotifyWebApi({
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET
})

ky.post('https://accounts.spotify.com/api/token', {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic OWE3MmQ3N2IzOWQ5NGEzM2EzNTdlNjliMmI3ZjI5OWE6ZjI3NzYwMDc2MzhlNDM0ZDg0MzI4NzM4N2ZiYWJlYzM='
  },
  body: 'grant_type=client_credentials'
}).then(
  async (data) => {
    const body = await data.json()
    api.setAccessToken(body.access_token)
  },
  (error) => {
    window.alert(`[Spotify]${error}`)
  }
)

export const spotifyApi = api
