import { Link, useParams } from 'react-router'
import { books } from '../data/Books'
export function BookDetailsPage() {
    const { id } = useParams()
    const book = books.find((item) => item.id === id)
    if (!book) {
        return (
            <section>
                <h1>Книга не найдена</h1>
                <Link to="/books">К списку книг</Link>
            </section>
        )
    }
    return (
        <section>
            <p><strong>Автор:</strong> {book.author}</p>
            <p><strong>Соавторы:</strong> {book.coAuthors || "Нет"}</p>
            <p><strong>Жанры:</strong> {book.genres.join(", ")}</p>
            <p><strong>Подзаголовок:</strong> {book.subtitle}</p>
            <p><strong>Описание:</strong> {book.description}</p>
            <p><strong>Год выпуска:</strong> {book.date_of_publication}</p>
            <p><strong>Язык:</strong> {book.language}</p>
            <p><strong>Переводчик:</strong> {book.translator || "Нет"}</p>
            <p><strong>Рейтинг:</strong> {book.rating}</p>
            <p><strong>Заметка:</strong> {book.note}</p>
            <p><strong>Статус:</strong> {book.status}</p>
            <p><strong>Тег:</strong> {book.tag}</p>
            <Link to="/Books">К списку книг</Link>
        </section>
    )
}