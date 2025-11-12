import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Album, Track } from '@/lib/faker'

interface AudioState {
  isPlaying: boolean
  currentAlbum: Album | null
  currentTrack: Track | null
  currentTrackIndex: number
  currentTime: number
  volume: number
}

const initialState: AudioState = {
  isPlaying: false,
  currentAlbum: null,
  currentTrack: null,
  currentTrackIndex: 0,
  currentTime: 0,
  volume: 70,
}

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setCurrentAlbum: (state, action: PayloadAction<Album>) => {
      state.currentAlbum = action.payload
      state.currentTrack = action.payload.tracks[0] || null
      state.currentTrackIndex = 0
      state.currentTime = 0
    },
    setCurrentTrack: (state, action: PayloadAction<{ track: Track; index: number }>) => {
      state.currentTrack = action.payload.track
      state.currentTrackIndex = action.payload.index
      state.currentTime = 0
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying
    },
    nextTrack: (state) => {
      if (state.currentAlbum && state.currentTrackIndex < state.currentAlbum.tracks.length - 1) {
        state.currentTrackIndex += 1
        state.currentTrack = state.currentAlbum.tracks[state.currentTrackIndex]
        state.currentTime = 0
      }
    },
    previousTrack: (state) => {
      if (state.currentTrackIndex > 0) {
        state.currentTrackIndex -= 1
        if (state.currentAlbum) {
          state.currentTrack = state.currentAlbum.tracks[state.currentTrackIndex]
        }
        state.currentTime = 0
      }
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
  },
})

export const {
  setCurrentAlbum,
  setCurrentTrack,
  togglePlayPause,
  nextTrack,
  previousTrack,
  setCurrentTime,
  setVolume,
} = audioSlice.actions

export const playAlbum = setCurrentAlbum
export const playTrack = setCurrentTrack

export default audioSlice.reducer