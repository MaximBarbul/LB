import { Link } from 'react-router'
import type { Book } from '../types/Book'
type BookCardProps = { book: Book }
export function BookCard({ book }: BookCardProps) {
    return (
        <article className="book-card">
            <h2>
                <Link to={`/books/${book.id}`}>
                    {book.title}
                </Link>
            </h2>
            <p><strong>Автор:</strong> {book.author}</p>
            <p><strong>Жанры:</strong> {book.genres.join(", ")}</p>
            <p><strong>Описание:</strong> {book.description}</p>
            <p><strong>Год выпуска:</strong> {book.date_of_publication}</p>
            <p><strong>Язык:</strong> {book.language}</p>
            <p><strong>Рейтинг:</strong> {book.rating}</p>
            <p><strong>Статус:</strong> {book.status}</p>
            <p><strong>Тег:</strong> {book.tag}</p>
        </article>
    )
}