import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Track {
  id: string
  title: string
  duration: string
}

interface Album {
  id: string
  title: string
  artist: string
  cover: string
  tracks: Track[]
}

interface AudioState {
  isPlaying: boolean
  currentAlbum: Album | null
  currentTrack: Track | null
  currentTime: number
  volume: number
  playlist: Track[]
  currentTrackIndex: number
}

const initialState: AudioState = {
  isPlaying: false,
  currentAlbum: null,
  currentTrack: null,
  currentTime: 0,
  volume: 80,
  playlist: [],
  currentTrackIndex: 0,
}

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    playAlbum: (state, action: PayloadAction<Album>) => {
      state.currentAlbum = action.payload
      state.playlist = action.payload.tracks
      state.currentTrack = action.payload.tracks[0]
      state.currentTrackIndex = 0
      state.isPlaying = true
      state.currentTime = 0
    },
    playTrack: (state, action: PayloadAction<{ track: Track; index: number }>) => {
      state.currentTrack = action.payload.track
      state.currentTrackIndex = action.payload.index
      state.isPlaying = true
      state.currentTime = 0
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying
    },
    nextTrack: (state) => {
      if (state.currentTrackIndex < state.playlist.length - 1) {
        state.currentTrackIndex += 1
        state.currentTrack = state.playlist[state.currentTrackIndex]
        state.currentTime = 0
      }
    },
    previousTrack: (state) => {
      if (state.currentTrackIndex > 0) {
        state.currentTrackIndex -= 1
        state.currentTrack = state.playlist[state.currentTrackIndex]
        state.currentTime = 0
      }
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
    stopPlayback: (state) => {
      state.isPlaying = false
      state.currentTime = 0
    },
  },
})

export const {
  playAlbum,
  playTrack,
  togglePlayPause,
  nextTrack,
  previousTrack,
  setCurrentTime,
  setVolume,
  stopPlayback,
} = audioSlice.actions

export default audioSlice.reducer