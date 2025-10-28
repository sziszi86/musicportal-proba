'use client'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { playAlbum } from '@/store/audioSlice'
import { generateAlbums } from '@/lib/faker'

export function HeroSection() {
  const [featuredAlbum, setFeaturedAlbum] = useState<any>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const albums = generateAlbums(1)
    setFeaturedAlbum(albums[0])
  }, [])

  const handlePlayAlbum = () => {
    if (featuredAlbum) {
      dispatch(playAlbum(featuredAlbum))
    }
  }

  if (!featuredAlbum) return null

  return (
    <section className="relative bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="lg:w-1/3">
            <Card className="relative group overflow-hidden border-none shadow-xl">
              <div className="relative w-full h-80">
                <Image
                  src={featuredAlbum.cover}
                  alt={featuredAlbum.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <Button
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-16 h-16"
                    onClick={handlePlayAlbum}
                  >
                    <Play className="w-8 h-8" fill="currentColor" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="lg:w-2/3 space-y-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {featuredAlbum.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-3">
                {featuredAlbum.artist}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {featuredAlbum.description.slice(0, 120)}...
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href={`/albums/${featuredAlbum.id}`}>
                  Hallgasd meg
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/reviews/${featuredAlbum.id}`}>
                  További részletek
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}