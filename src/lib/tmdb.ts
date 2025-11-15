const BASE_URL = 'https://api.themoviedb.org/3'

// Generic fetch wrapper for TMDB
export async function tmdbFetch<T>(endpoint: string): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) throw new Error('TMDB API key is missing')

  const url = `${BASE_URL}${endpoint}?api_key=${apiKey}`

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // ✅ options must be inside fetch()
  })

  if (!res.ok) {
    const error = await res.json()
    console.log('Fetching URL:', url);
    console.error('TMDB fetch error:', error)
    throw new Error(`TMDB API error: ${error.status_message}`)
  }

  return res.json()
}

// Helper for building image URLs
export function imgUrl(
  path: string | null | undefined,
  size: 'w300' | 'w500' | 'original' | 'w780' | 'w1280' = 'w500'
): string | null {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}
