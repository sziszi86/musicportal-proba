import { NextRequest, NextResponse } from 'next/server'
import { generateAlbums } from '@/lib/faker'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const allAlbums = generateAlbums(100)
  const album = allAlbums.find(a => a.id === id)
  
  if (!album) {
    return NextResponse.json(
      { error: 'Album not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(album)
}