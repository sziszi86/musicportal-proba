import { faker } from '@faker-js/faker'

export interface Track {
  id: string
  title: string
  duration: string
}

export interface Album {
  id: string
  title: string
  artist: string
  cover: string
  genre: string
  description: string
  tracks: Track[]
  trackCount: number
  totalDuration: string
  releaseDate: string
}

export interface Review {
  id: string
  albumId: string
  title: string
  author: string
  rating: number
  summary: string
  content: string
  date: string
  album: Album
}

const genres = ['Pop', 'Jazz', 'Rock', 'Indie', 'Electronic', 'Hip Hop', 'Classical', 'Folk', 'R&B', 'Alternative']

function generateTrack(): Track {
  const minutes = faker.number.int({ min: 2, max: 6 })
  const seconds = faker.number.int({ min: 0, max: 59 })
  
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
  }
}

function calculateTotalDuration(tracks: Track[]): string {
  let totalSeconds = 0
  
  tracks.forEach(track => {
    const [minutes, seconds] = track.duration.split(':').map(Number)
    totalSeconds += minutes * 60 + seconds
  })
  
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const remainingSeconds = totalSeconds % 60
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function generateAlbum(): Album {
  const trackCount = faker.number.int({ min: 8, max: 15 })
  const tracks = Array.from({ length: trackCount }, generateTrack)
  
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    artist: faker.person.fullName(),
    cover: `https://picsum.photos/seed/${faker.string.uuid()}/300/300`,
    genre: faker.helpers.arrayElement(genres),
    description: faker.lorem.paragraphs(2),
    tracks,
    trackCount,
    totalDuration: calculateTotalDuration(tracks),
    releaseDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
  }
}

export function generateReview(album?: Album): Review {
  const reviewAlbum = album || generateAlbum()
  
  return {
    id: reviewAlbum.id,
    albumId: reviewAlbum.id,
    title: `Review: ${reviewAlbum.title}`,
    author: faker.person.fullName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    summary: faker.lorem.paragraph(),
    content: faker.lorem.paragraphs(5),
    date: faker.date.past({ years: 1 }).toISOString().split('T')[0],
    album: reviewAlbum,
  }
}

export function generateAlbums(count: number): Album[] {
  faker.seed(12345)
  return Array.from({ length: count }, generateAlbum)
}

export function generateReviews(count: number, albums?: Album[]): Review[] {
  faker.seed(54321)
  if (albums) {
    return albums.slice(0, count).map(album => generateReview(album))
  }
  return Array.from({ length: count }, () => generateReview())
}