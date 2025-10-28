import { Suspense } from 'react'
import { ReviewsList } from './ReviewsList'
import { ReviewsLoading } from './ReviewsLoading'

interface ReviewsPageProps {
  searchParams: {
    page?: string
  }
}

export default function ReviewsPage({ searchParams }: ReviewsPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Reviews</h1>
        <p className="text-muted-foreground">
          Read in-depth reviews and critiques of the latest albums
        </p>
      </div>
      
      <Suspense fallback={<ReviewsLoading />}>
        <ReviewsList searchParams={searchParams} />
      </Suspense>
    </div>
  )
}