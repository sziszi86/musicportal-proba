'use client'

import { useDispatch } from 'react-redux'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Album } from '@/lib/faker'
import { playTrack, playAlbum } from '@/store/audioSlice'

interface AlbumDetailsProps {
  album: Album
}

export function AlbumDetails({ album }: AlbumDetailsProps) {
  const dispatch = useDispatch()

  const handlePlayTrack = (track: any, index: number) => {
    dispatch(playTrack({ track, index }))
    dispatch(playAlbum(album))
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Tracklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {album.tracks.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 flex items-center justify-center text-sm text-muted-foreground">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {track.title}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      {track.duration}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handlePlayTrack(track, index)}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}