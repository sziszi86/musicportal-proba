'use client'

import { AudioPlayer } from '@/components/AudioPlayer'
import { Album } from '@/lib/faker'

interface AlbumAudioPlayerProps {
  album: Album
}

export function AlbumAudioPlayer({ album }: AlbumAudioPlayerProps) {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <AudioPlayer />
      </div>
    </section>
  )
}