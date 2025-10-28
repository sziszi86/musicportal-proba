'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { HorizontalScroll } from '@/components/HorizontalScroll'
import { faker } from '@faker-js/faker'

const genres = [
  'Pop', 'Jazz', 'Rock', 'Indie', 'Electronic', 
  'Hip Hop', 'Classical', 'Folk'
]

interface Artist {
  name: string
  quote: string
  image: string
}

export function GenresAndFeatured() {
  const [artist, setArtist] = useState<Artist | null>(null)

  useEffect(() => {
    const generateArtist = (): Artist => {
      faker.seed(Date.now())
      return {
        name: faker.person.fullName(),
        quote: faker.lorem.sentence({ min: 8, max: 12 }),
        image: `https://picsum.photos/seed/${faker.string.uuid()}/150/150?grayscale`,
      }
    }

    setArtist(generateArtist())

    const interval = setInterval(() => {
      setArtist(generateArtist())
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Genres */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Genres</h2>
            <HorizontalScroll>
              <div className="flex gap-3 min-w-max">
                {genres.map((genre) => (
                  <Link key={genre} href={`/albums?genre=${genre.toLowerCase()}`}>
                    <Badge 
                      variant="outline" 
                      className="text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {genre}
                    </Badge>
                  </Link>
                ))}
              </div>
            </HorizontalScroll>
          </div>

          {/* Featured Artist */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Featured artist</h2>
            {artist && (
              <div className="flex items-start space-x-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <blockquote className="text-sm italic text-foreground leading-relaxed mb-3">
                    "{artist.quote}"
                  </blockquote>
                  <cite className="text-sm font-semibold text-primary">
                    {artist.name}
                  </cite>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}