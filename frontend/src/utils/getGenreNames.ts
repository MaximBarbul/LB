import type { Genre } from '../types/genre'

export function getGenreNames(
    genreIds: string[],
    genres: Genre[]
): string[] {
    return genreIds.map((id) => {
        const genre = genres.find((item) => item.id === id)
        return genre ? genre.name : id
    })
}