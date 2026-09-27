import { Link } from 'react-router'

export function NotFoundBook() {
    return (
        <>
            <h1>Книга не найдена</h1>

            <p>
                Такой книги не существует или она была перемещена.
            </p>

            <Link to="/books">Вернуться к списку книг</Link>
        </>
    )
}