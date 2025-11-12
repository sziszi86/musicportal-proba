import { notFound } from 'next/navigation'
import { ReviewHeader } from './ReviewHeader'
import { ReviewContent } from './ReviewContent'
import { ReviewAlbum } from './ReviewAlbum'

async function getReview(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/reviews/${id}`, {
    next: { revalidate: 86400 }
  })
  
  if (!response.ok) {
    return null
  }
  
  return response.json()
}

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/reviews`)
  const reviews = await response.json()
  
  return reviews.slice(0, 10).map((review: any) => ({
    id: review.id,
  }))
}

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const review = await getReview(id)
  
  if (!review) {
    notFound()
  }
  
  return (
    <div className="min-h-screen">
      <ReviewHeader review={review} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ReviewContent review={review} />
          </div>
          <div className="lg:col-span-1">
            <ReviewAlbum album={review.album} />
          </div>
        </div>
      </div>
    </div>
  )
}