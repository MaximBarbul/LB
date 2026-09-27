import { Link } from 'react-router'

export function NewBookPage() {
    return (
        <>
            <h1>Добавление книги</h1>

            <p>
                Здесь в дальнейшем будет расположена форма создания новой книги.
            </p>

            <Link to="/books">Вернуться к списку книг</Link>
        </>
    )
}