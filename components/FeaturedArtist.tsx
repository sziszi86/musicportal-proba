'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { faker } from '@faker-js/faker'

interface Artist {
  name: string
  quote: string
  image: string
}

export function FeaturedArtist() {
  const [artist, setArtist] = useState<Artist | null>(null)

  useEffect(() => {
    const generateArtist = (): Artist => {
      faker.seed(Date.now())
      return {
        name: faker.person.fullName(),
        quote: faker.lorem.sentence({ min: 10, max: 20 }),
        image: `https://picsum.photos/seed/${faker.string.uuid()}/200/200?grayscale`,
      }
    }

    setArtist(generateArtist())

    const interval = setInterval(() => {
      setArtist(generateArtist())
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (!artist) return null

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Featured Artist
        </h2>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover rounded-full"
            />
          </div>
          
          <blockquote className="text-2xl lg:text-3xl font-light italic text-foreground mb-6 leading-relaxed">
            "{artist.quote}"
          </blockquote>
          
          <cite className="text-lg font-semibold text-primary">
            — {artist.name}
          </cite>
        </div>
      </div>
    </section>
  )
}