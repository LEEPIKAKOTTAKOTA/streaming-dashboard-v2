import { tmdbFetch, imgUrl } from '@/lib/tmdb'
import Image from 'next/image'
import MovieRow from '@/components/MovieRow'

type MovieDetails = {
  id: number
  title: string
  overview: string
  backdrop_path?: string | null
  poster_path?: string | null
  release_date?: string
  vote_average?: number
  runtime?: number
  genres?: { id: number; name: string }[]
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await tmdbFetch<MovieDetails>(`/movie/${params.id}`)
  const credits = await tmdbFetch<{ cast: { id: number; name: string; profile_path?: string | null; character?: string }[] }>(
    `/movie/${params.id}/credits`
  )
  const similar = await tmdbFetch<{ results: MovieDetails[] }>(`/movie/${params.id}/similar`)

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div className="relative h-[45vh] w-full rounded-xl overflow-hidden mb-6">
          <Image
            src={imgUrl(movie.backdrop_path, 'original')!}
            alt={movie.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
      )}

      {/* Title + Overview */}
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="text-gray-300 mb-6">{movie.overview}</p>

      {/* Cast */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Cast</h2>
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
          {credits.cast.slice(0, 12).map((actor) => (
            <div key={actor.id} className="w-32 shrink-0 text-center">
              {actor.profile_path ? (
                <Image
                  src={imgUrl(actor.profile_path, 'w300')!}
                  alt={actor.name}
                  width={120}
                  height={160}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-[120px] h-[160px] bg-gray-800 rounded-lg" />
              )}
              <p className="mt-2 text-sm text-gray-200">{actor.name}</p>
              {actor.character && <p className="text-xs text-gray-400">{actor.character}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Similar Movies */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">You Might Also Like</h2>
        <MovieRow movies={similar.results} categoryTitle="Similar Movies" />
      </section>
    </main>
  )
}
