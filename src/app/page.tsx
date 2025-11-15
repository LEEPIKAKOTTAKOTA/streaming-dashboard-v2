import HeroBanner from '@/components /HeroBanner'
import MovieRow from '@/components /MovieRow'
import { tmdbFetch } from '@/lib/tmdb'

type Paginated<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

type Movie = {
  id: number
  title?: string
  name?: string
  overview?: string
  backdrop_path?: string | null
  poster_path?: string | null
}

export default async function Page() {
  const [trending, topRated, upcoming] = await Promise.all([
    tmdbFetch<Paginated<Movie>>('/trending/movie/day'),
    tmdbFetch<Paginated<Movie>>('/movie/top_rated'),
    tmdbFetch<Paginated<Movie>>('/movie/upcoming'),
  ])

  const hero = trending.results[0] ?? {
    title: 'No data',
    overview: 'Trending could not be loaded.',
    backdrop_path: null,
  }

  return (
    <div className="mx-auto max-w-7xl px-6 space-y-10">
      <HeroBanner movie={hero} />
      <MovieRow movies={trending.results} categoryTitle="Trending" />
      <MovieRow movies={topRated.results} categoryTitle="Top Rated" />
      <MovieRow movies={upcoming.results} categoryTitle="Upcoming" />
    </div>
  )
}
