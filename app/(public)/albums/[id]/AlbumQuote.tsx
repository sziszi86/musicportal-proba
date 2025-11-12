'use client'

import { useState, useEffect } from 'react'
import { faker } from '@faker-js/faker'

export function AlbumQuote() {
  const [quote, setQuote] = useState({ text: '', author: '' })

  useEffect(() => {
    const generateQuote = () => {
      setQuote({
        text: faker.lorem.sentence(8),
        author: faker.person.fullName()
      })
    }

    generateQuote()
    const interval = setInterval(generateQuote, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl lg:text-3xl font-light italic text-foreground mb-6 leading-relaxed">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <cite className="text-lg text-muted-foreground font-medium">
            — {quote.author}
          </cite>
        </div>
      </div>
    </section>
  )
}