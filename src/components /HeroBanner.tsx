'use client'

import Image from 'next/image'
import { imgUrl } from '@/lib/tmdb'

interface HeroBannerProps {
  movie: {
    title?: string
    name?: string
    overview?: string
    backdrop_path?: string | null
  }
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const title = movie.title ?? movie.name ?? 'Untitled'
  const src = imgUrl(movie.backdrop_path, 'original')

  return (
    <section className="relative h-[45vh] rounded-xl overflow-hidden">
      {src && (
        <Image
          src={src}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute bottom-6 left-6 max-w-xl">
        <h1 className="text-2xl md:text-4xl font-semibold">{title}</h1>
        {movie.overview && (
          <p className="mt-2 text-sm md:text-base text-gray-200 line-clamp-3">
            {movie.overview}
          </p>
        )}
      </div>
    </section>
  )
}
