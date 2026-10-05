import { Link, useNavigate, useParams } from 'react-router'
import { BookForm } from '../components/BookForm'
import type { Book, BookDraft } from '../types/Book'

type EditBookPageProps = {
    books: Book[]
    onUpdate: (id: string, draft: BookDraft) => void
}

export function EditBookPage({ books, onUpdate }: EditBookPageProps)
{
    const { id } = useParams()
    const navigate = useNavigate()
    const book = books.find((item) => item.id === id)
    if (!book)
    {
        return (
            <>
                <h1>Книга не найдена</h1>
                <Link to="/books">К списку книг</Link>
            </>
        )
    }
    const initialValues: BookDraft =
        {
            title: book.title,
            genres: [...book.genres],
            subtitle: book.subtitle ?? '',
            author: book.author,
            coAuthors: book.coAuthors ?? '',
            language: book.language ?? '',
            translator: book.translator ?? '',
            date_of_publication: book.date_of_publication ?? '',
            description: book.description ?? '',
            rating: book.rating ?? '',
            note: book.note ?? '',
            status: book.status,
            tag: book.tag
        }
    return (
        <>
            <h1>Редактирование книги</h1>
            <BookForm
                key={book.id}
                initialValues={initialValues}
                onSave={(draft) => {
                    onUpdate(book.id, draft)
                    navigate(`/books/${book.id}`)
                }}
                onCancel={() => navigate(`/books/${book.id}`)}
            />
        </>
    )
}