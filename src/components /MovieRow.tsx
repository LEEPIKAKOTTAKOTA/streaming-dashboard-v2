'use client'
import Image from 'next/image'
import Link from 'next/link'
import { imgUrl } from '@/lib/tmdb'
import { Key } from 'react'

export default function MovieRow({ movies, categoryTitle }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">{categoryTitle}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {movies.map((movie: { id: Key | null | undefined; poster_path: string | null | undefined; title: any }) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <Image
              src={imgUrl(movie.poster_path, 'w500')!}
              alt={movie.title || 'Untitled'}
              width={200}
              height={300}
              className="rounded-lg hover:scale-105 transition-transform"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
