import { useNavigate } from 'react-router'
import { BookForm } from '../components/BookForm'
import type { BookDraft } from '../types/Book'

type NewBookPageProps = {
    onCreate: (draft: BookDraft) => string
}
const emptyBook: BookDraft = {
    title: '',
    genres: [],
    subtitle: '',
    author: '',
    coAuthors: '',
    language: '',
    translator: '',
    date_of_publication: '',
    description: '',
    rating: '',
    note: '',
    status: 'Продолжается',
    tag: undefined }

export function NewBookPage({ onCreate }: NewBookPageProps)
{
    const navigate = useNavigate()
    function handleSave(draft: BookDraft)
    {
        const id = onCreate(draft)
        navigate(`/books/${id}`)
    }
    return (
        <>
            <h1>Создание книги</h1>
            <BookForm initialValues={emptyBook}
                      onSave={handleSave}
                      onCancel={() => navigate('/books')}
            />
        </>
    )
}