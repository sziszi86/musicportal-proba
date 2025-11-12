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
  coverImage: string
  description: string
  releaseDate: string
  genre: string
  tracks: Track[]
  totalDuration: string
}

export interface Review {
  id: string
  albumId: string
  title: string
  author: string
  rating: number
  content: string
  publishedAt: string
  summary: string
  album: Album
}

const genres = [
  'Pop', 'Jazz', 'Rock', 'Indie', 'Electronic', 
  'Hip Hop', 'Classical', 'Folk'
]

export function generateTracks(count: number = 10): Track[] {
  faker.seed(12345)
  return Array.from({ length: count }, (_, index) => ({
    id: `track-${index + 1}`,
    title: faker.music.songName(),
    duration: `${faker.number.int({ min: 2, max: 6 })}:${faker.number.int({ min: 10, max: 59 }).toString().padStart(2, '0')}`
  }))
}

export function generateAlbums(count: number = 100): Album[] {
  faker.seed(12345)
  return Array.from({ length: count }, (_, index) => {
    const tracks = generateTracks(faker.number.int({ min: 8, max: 15 }))
    const totalMinutes = tracks.reduce((acc, track) => {
      const [min, sec] = track.duration.split(':').map(Number)
      return acc + min + (sec / 60)
    }, 0)
    
    return {
      id: `album-${index + 1}`,
      title: `${faker.music.genre()} ${faker.word.words(2)}`,
      artist: faker.person.fullName(),
      coverImage: `https://picsum.photos/seed/album-${index + 1}/400/400`,
      description: faker.lorem.paragraphs(2),
      releaseDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
      genre: faker.helpers.arrayElement(genres),
      tracks,
      totalDuration: `${Math.floor(totalMinutes)}:${Math.floor((totalMinutes % 1) * 60).toString().padStart(2, '0')}`
    }
  })
}

export function generateReviews(count: number = 100, albums: Album[]): Review[] {
  faker.seed(12345)
  return Array.from({ length: count }, (_, index) => {
    const album = albums[index] || albums[0]
    return {
      id: `album-${index + 1}`,
      albumId: album.id,
      title: `Review: ${album.title}`,
      author: faker.person.fullName(),
      rating: faker.number.int({ min: 1, max: 5 }),
      content: faker.lorem.paragraphs(5),
      publishedAt: faker.date.past({ years: 1 }).toISOString(),
      summary: faker.lorem.paragraph(),
      album
    }
  })
}