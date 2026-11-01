import { Link, useParams, useNavigate } from 'react-router';
import { useGenres } from '../hooks/useGenres'
import { getGenreNames } from '../utils/getGenreNames'
import type { Book } from '../types/Book.ts'
type BookDetailsPageProps =
    {
    books: Book[],onDelete: (id: string) => void
    }

export function BookDetailsPage({books,onDelete}: BookDetailsPageProps) {
    const { id } = useParams()
    const { load } = useGenres()
    const navigate = useNavigate();
    const book = books.find((item) => item.id === id)
    if (!book) {
        return (
            <section>
                <h1>Книга не найдена</h1>
                <Link to="/books">К списку книг</Link>
            </section>
        )
    }
    const genreNames =
        book && load.status === 'success'
            ? getGenreNames(book.genres, load.data)
            : []
    return (
        <section>
            <h2>
                {book.title}
            </h2>
            <p><strong>Автор:</strong> {book.author}</p>
            <p><strong>Соавторы:</strong> {book.coAuthors || "Нет"}</p>
            <p><strong>Жанры:</strong> {genreNames.join(', ')}</p>
            <p><strong>Подзаголовок:</strong> {book.subtitle}</p>
            <p><strong>Описание:</strong> {book.description}</p>
            <p><strong>Год выпуска:</strong> {book.date_of_publication}</p>
            <p><strong>Язык:</strong> {book.language}</p>
            <p><strong>Переводчик:</strong> {book.translator || "Нет"}</p>
            <p><strong>Рейтинг:</strong> {book.rating}</p>
            <p><strong>Заметка:</strong> {book.note}</p>
            <p><strong>Статус:</strong> {book.status}</p>
            <p><strong>Тег:</strong> {book.tag}</p>
            <button
                type="button"
                onClick={() => {
                    if (window.confirm(`Редактировать книгу «${book.title}»?`)) {
                        navigate(`/books/${book.id}/edit`);
                    }
                }}
            >
                Изменить
            </button>

            <button type="button" onClick={() => {
                if (window.confirm(`Удалить книгу «${book.title}»?`)) {
                    onDelete(book.id)
                    navigate('/books', { replace: true })
                }
            }}>
                Удалить
            </button>
            <p><Link to="/Books">К списку книг</Link></p>
        </section>

    )
}