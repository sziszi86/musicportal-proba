'use client'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { playAlbum } from '@/store/audioSlice'
import { generateAlbums } from '@/lib/faker'
import { HorizontalScroll } from './HorizontalScroll'

export function PopularAlbums() {
  const [albums, setAlbums] = useState<any[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    const allAlbums = generateAlbums(10)
    const shuffled = [...allAlbums].sort(() => Math.random() - 0.5)
    setAlbums(shuffled)
  }, [])

  const handlePlayAlbum = (album: any) => {
    dispatch(playAlbum(album))
  }

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Top albums</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/albums" className="text-primary text-sm">View all</Link>
          </Button>
        </div>
        
        <HorizontalScroll className="flex gap-3 md:gap-4 pb-2">
          {albums.map((album, index) => (
            <Card key={album.id} className="group hover:shadow-lg transition-shadow bg-secondary/20 border-none w-36 sm:w-40 md:w-48 flex-shrink-0">
              <CardContent className="p-3">
                <div className="relative mb-3">
                  <div className="relative w-full h-24 sm:h-28 md:h-32 overflow-hidden rounded-lg">
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          onClick={() => handlePlayAlbum(album)}
                        >
                          <Play className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <Link href={`/albums/${album.id}`}>
                            Hallgasd meg
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < 2 && (
                    <Badge 
                      className="absolute top-2 right-2"
                      variant={index === 0 ? "default" : "secondary"}
                    >
                      {index === 0 ? "Népszerű" : "Újdonság"}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm text-foreground line-clamp-1">
                    {album.title}
                  </h3>
                  <p className="text-muted-foreground text-xs line-clamp-1">
                    {album.artist}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  )
}