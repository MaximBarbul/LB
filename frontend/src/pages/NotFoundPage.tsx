import { Link } from 'react-router'

export function NotFoundBook() {
    return (
        <>
            <h1>Страница не найдена</h1>

            <Link to="/books">Вернуться к списку книг</Link>
        </>
    )
}