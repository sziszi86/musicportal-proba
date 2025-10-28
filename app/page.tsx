import { HeroSection } from '@/components/HeroSection'
import { PopularAlbums } from '@/components/PopularAlbums'
import { LatestReviews } from '@/components/LatestReviews'
import { GenresAndFeatured } from '@/components/GenresAndFeatured'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PopularAlbums />
      <LatestReviews />
      <GenresAndFeatured />
      <NewsletterSignup />
    </div>
  )
}