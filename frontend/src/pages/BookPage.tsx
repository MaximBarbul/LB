import { useState } from 'react'
import { Link } from 'react-router'
import { BookCard } from '../components/BookCard'
import type { Book, BookStatus } from '../types/Book'
type BookPageProps = { books: Book[] }
type BookStatusFilter = BookStatus | 'all'


export function BookPage({ books }: BookPageProps) {
    const [status, setStatus] = useState<BookStatusFilter>('all')

    const visibleBooks = books.filter(
        (book) =>
            status === 'all' || book.status === status
    )
    function handleStatusChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        const value = event.target.value

        if ( value === 'all' ||
            value === 'Закончено' ||
            value === 'Приостановлено' ||
            value === 'Продолжается' ||
            value === 'Незавершённая'
        ) {
            setStatus(value)
        }
    }
    return (
        <section>
            <h1>Мои книги</h1>
            <Link to="/books/new"> Добавить книгу </Link>

            <div>
                <label htmlFor="book-status-filter"> Статус: </label>
                <select
                    id="book-status-filter"
                    value={status}
                    onChange={handleStatusChange}
                >
                    <option value="all">Все</option>
                    <option value="Закончено"> Закончено </option>
                    <option value="Приостановлено"> Приостановлено </option>
                    <option value="Продолжается"> Продолжается </option>
                    <option value="Незавершённая"> Незавершённая </option>
                </select>
                <button type="button" onClick={() => setStatus('all')} >
                    Сбросить фильтр
                </button>
            </div>
            {books.length === 0 ? (
                <p>Книг пока нет.</p>
            ) : visibleBooks.length === 0 ? (
                <p>
                    Книг с выбранным статусом нет.
                </p> ) : (
                    <div className="book-list">
                        {visibleBooks.map((book) => (
                            <BookCard key={book.id} book={book}
                            />
                        ))}
                    </div>
            )}
        </section>
    )
}