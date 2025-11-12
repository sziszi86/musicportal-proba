import { Suspense } from 'react'
import { AlbumsList } from './AlbumsList'
import { AlbumsLoading } from './AlbumsLoading'
import { NewsletterSignup } from '@/components/NewsletterSignup'

interface AlbumsPageProps {
  searchParams: Promise<{
    page?: string
    genre?: string
  }>
}

export default async function AlbumsPage({ searchParams }: AlbumsPageProps) {
  const resolvedSearchParams = await searchParams
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Albums</h1>
        <p className="text-muted-foreground">
          Discover amazing music from various artists and genres
        </p>
      </div>
      
      <Suspense fallback={<AlbumsLoading />}>
        <AlbumsList searchParams={resolvedSearchParams} />
      </Suspense>
      
      <NewsletterSignup />
    </div>
  )
}