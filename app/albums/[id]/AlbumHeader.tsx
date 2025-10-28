'use client'

import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { Play, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Album } from '@/lib/faker'
import { playAlbum } from '@/store/audioSlice'

interface AlbumHeaderProps {
  album: Album
}

export function AlbumHeader({ album }: AlbumHeaderProps) {
  const dispatch = useDispatch()

  const handlePlayAlbum = () => {
    dispatch(playAlbum(album))
  }

  return (
    <section className="bg-gradient-to-br from-background to-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="relative w-80 h-80 flex-shrink-0">
            <Image
              src={album.cover}
              alt={album.title}
              fill
              className="object-cover rounded-lg shadow-2xl"
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <Badge variant="outline" className="mb-2">
                {album.genre}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {album.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                by {album.artist}
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {album.releaseDate}
                </div>
                <div>{album.trackCount} tracks</div>
                <div>{album.totalDuration}</div>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {album.description}
            </p>
            
            <Button size="lg" onClick={handlePlayAlbum}>
              <Play className="w-5 h-5 mr-2" />
              Play Album
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}