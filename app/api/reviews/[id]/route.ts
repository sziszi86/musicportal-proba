import { NextRequest, NextResponse } from 'next/server'
import { generateAlbums, generateReviews } from '@/lib/faker'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const allAlbums = generateAlbums(100)
  const allReviews = generateReviews(100, allAlbums)
  const review = allReviews.find(r => r.id === id)
  
  if (!review) {
    return NextResponse.json(
      { error: 'Review not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(review)
}