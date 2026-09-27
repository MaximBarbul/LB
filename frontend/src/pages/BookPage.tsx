import { Link } from 'react-router'
import { BookCard } from '../components/BookCard.tsx'
import { books } from '../data/Books.ts'
export function BookPage() {
    return (
        <section>
            <h1>Мои книги</h1>
            <Link to="/books/new">Добавить книгу</Link>
            {books.length === 0 ? (
                <p>книг пока нет.</p>
            ) : (
                <div className="book-list">
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </section>
    )
}