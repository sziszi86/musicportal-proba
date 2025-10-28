import { NextRequest, NextResponse } from 'next/server'
import { generateAlbums, generateReviews } from '@/lib/faker'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const allAlbums = generateAlbums(100)
  const allReviews = generateReviews(100, allAlbums)
  const review = allReviews.find(r => r.id === params.id)
  
  if (!review) {
    return NextResponse.json(
      { error: 'Review not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(review)
}