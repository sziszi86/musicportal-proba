'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { 
  togglePlayPause, 
  nextTrack, 
  previousTrack, 
  setCurrentTime, 
  setVolume 
} from '@/store/audioSlice'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2 
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AudioPlayer() {
  const dispatch = useDispatch()
  const { 
    isPlaying, 
    currentAlbum, 
    currentTrack, 
    currentTime, 
    volume, 
    currentTrackIndex 
  } = useSelector((state: RootState) => state.audio)
  
  const [progress, setProgress] = useState(0)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audioElement = new Audio('/music.mp3')
      audioElement.loop = true
      audioElement.volume = volume / 100
      setAudio(audioElement)
    }
  }, [])

  useEffect(() => {
    if (audio) {
      audio.volume = volume / 100
    }
  }, [volume, audio])

  useEffect(() => {
    if (audio) {
      if (isPlaying && currentTrack) {
        audio.play().catch(console.error)
      } else {
        audio.pause()
      }
    }
  }, [isPlaying, currentTrack, audio])

  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        const newTime = currentTime + 1
        const [minutes, seconds] = currentTrack.duration.split(':').map(Number)
        const totalSeconds = minutes * 60 + seconds
        
        if (newTime >= totalSeconds) {
          if (currentTrackIndex < (currentAlbum?.tracks.length || 0) - 1) {
            dispatch(nextTrack())
          } else {
            dispatch(togglePlayPause())
          }
        } else {
          dispatch(setCurrentTime(newTime))
          setProgress((newTime / totalSeconds) * 100)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isPlaying, currentTime, currentTrack, currentTrackIndex, currentAlbum, dispatch])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTrack) {
      const [minutes, seconds] = currentTrack.duration.split(':').map(Number)
      const totalSeconds = minutes * 60 + seconds
      const newTime = Math.floor((parseInt(e.target.value) / 100) * totalSeconds)
      dispatch(setCurrentTime(newTime))
      setProgress(parseInt(e.target.value))
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setVolume(parseInt(e.target.value)))
  }

  if (!currentAlbum || !currentTrack) {
    return null
  }

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 backdrop-blur rounded-lg p-4 min-w-[400px]">
      <div className="flex flex-col items-center space-y-4">
        {/* Progress bar */}
        <div className="w-full flex items-center space-x-2">
          <span className="text-xs text-white/70 w-10">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-xs text-white/70 w-10">
            {currentTrack.duration}
          </span>
        </div>
        
        {/* Track info */}
        <div className="text-center">
          <h4 className="font-medium text-white text-lg">
            {currentTrack.title}
          </h4>
          <p className="text-sm text-white/70">
            {currentAlbum.artist}
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(previousTrack())}
            disabled={currentTrackIndex === 0}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={() => dispatch(togglePlayPause())}
            className="text-white hover:text-white hover:bg-white/10 w-12 h-12 rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(nextTrack())}
            disabled={currentTrackIndex === (currentAlbum?.tracks.length || 0) - 1}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Volume */}
        <div className="flex items-center space-x-3">
          <Volume2 className="w-4 h-4 text-white/70" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}