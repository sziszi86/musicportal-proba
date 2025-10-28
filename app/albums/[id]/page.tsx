import { notFound } from 'next/navigation'
import { AlbumHeader } from './AlbumHeader'
import { AlbumDetails } from './AlbumDetails'
import { AlbumQuote } from './AlbumQuote'
import { AlbumAudioPlayer } from './AlbumAudioPlayer'
import { AlbumReview } from './AlbumReview'

async function getAlbum(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/albums/${id}`, {
    next: { revalidate: 86400 }
  })
  
  if (!response.ok) {
    return null
  }
  
  return response.json()
}

async function getReview(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/reviews/${id}`, {
    next: { revalidate: 86400 }
  })
  
  if (!response.ok) {
    return null
  }
  
  return response.json()
}

export default async function AlbumPage({ params }: { params: { id: string } }) {
  const [album, review] = await Promise.all([
    getAlbum(params.id),
    getReview(params.id)
  ])
  
  if (!album) {
    notFound()
  }
  
  return (
    <div className="min-h-screen">
      <AlbumHeader album={album} />
      <AlbumDetails album={album} />
      <AlbumQuote />
      <AlbumAudioPlayer album={album} />
      {review && <AlbumReview review={review} />}
    </div>
  )
}