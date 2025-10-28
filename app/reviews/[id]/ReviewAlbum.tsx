'use client'

import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Calendar, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Album } from '@/lib/faker'
import { playAlbum } from '@/store/audioSlice'

interface ReviewAlbumProps {
  album: Album
}

export function ReviewAlbum({ album }: ReviewAlbumProps) {
  const dispatch = useDispatch()

  const handlePlayAlbum = () => {
    dispatch(playAlbum(album))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Album Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full h-64">
            <Image
              src={album.cover}
              alt={album.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">{album.title}</h3>
            <p className="text-lg text-muted-foreground">{album.artist}</p>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{album.genre}</Badge>
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Released: {album.releaseDate}
              </div>
              <div className="flex items-center">
                <Music className="w-4 h-4 mr-2" />
                {album.trackCount} tracks • {album.totalDuration}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button className="w-full" onClick={handlePlayAlbum}>
              <Play className="w-4 h-4 mr-2" />
              Play Album
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/albums/${album.id}`}>
                View Album Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>About This Album</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground leading-relaxed">
            {album.description}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}