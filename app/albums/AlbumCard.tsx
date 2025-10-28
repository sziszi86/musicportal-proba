'use client'

import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Album } from '@/lib/faker'
import { playAlbum } from '@/store/audioSlice'

interface AlbumCardProps {
  album: Album
}

export function AlbumCard({ album }: AlbumCardProps) {
  const dispatch = useDispatch()

  const handlePlayAlbum = () => {
    dispatch(playAlbum(album))
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <div className="relative w-full h-48 overflow-hidden rounded-lg">
            <Image
              src={album.cover}
              alt={album.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <Button
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handlePlayAlbum}
              >
                <Play className="w-4 h-4 mr-1" />
                Play
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
            {album.title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {album.artist}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {album.genre}
            </Badge>
            <p className="text-xs text-muted-foreground">
              {album.trackCount} tracks • {album.totalDuration}
            </p>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {album.description}
          </p>
          <Button variant="ghost" size="sm" asChild className="w-full">
            <Link href={`/albums/${album.id}`}>
              View Album
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}