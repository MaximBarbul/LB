import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './app/AppLayout'
import { BookPage } from './pages/BookPage'
import { BookDetailsPage } from './pages/BookDetailsPage'
import { NewBookPage } from './pages/NewBookPage'
import { NotFoundBook } from './pages/NotFoundPage'
import { EditBookPage } from './pages/EditBookPage'
import './styles/App.css'
const appTitle: string = 'Личная библиотека'
import { useState } from 'react'
import type { Book, BookDraft } from './types/Book'
import { books as initialBook } from './data/Books'

export default function App() {
    const [darkMode, setDarkMode] = useState(false)
    const [books, setBooks] = useState<Book[]>(() =>
        initialBook.map((Books) => ({ ...Books}))
    )
    function createBook(draft: BookDraft): string {
        const id = crypto.randomUUID()
        setBooks((current) => [...current, { ...draft, id }])
        return id
    }

    function updateBook(id: string, draft: BookDraft): void {
        setBooks((current) => current.map((Book) =>
            Book.id === id ? { ...draft, id: Book.id } : Book
        ))
    }
    function deleteBook(id: string): void {
        setBooks((current) =>
            current.filter((Book) => Book.id !== id))
    }
    return (
      <main className={darkMode ? 'app dark' : 'app'}>
          <header>
              <h1>{appTitle}</h1>
              <button
                  type="button"
                  onClick={() => setDarkMode((current) => !current)}
              >
                  {darkMode ? '☀ Светлая тема' : '🌙 Тёмная тема'}
              </button>
          </header>
          <Routes>
              <Route element={<AppLayout />}>
                  <Route index element={<Navigate to="/books" replace />} />
                  <Route path="books" element={<BookPage books={books}/>} />
                  <Route path="books/new" element={<NewBookPage onCreate={createBook} />} />
                  <Route path="books/:id" element={<BookDetailsPage books={books} onDelete={deleteBook} />}/>
                  <Route path="books/:id/edit" element={<EditBookPage books={books} onUpdate={updateBook} />}/>

                  <Route path="*" element={<NotFoundBook />} />
              </Route>
          </Routes>
          {/*
          <p>Личные книги, редактирование, чтение.</p>
        <section aria-labelledby="items-title">
          <h2 id="items-title">Мои задачи</h2>
          <p>Здесь появится список книг, поиск по жанрам/авторам, написание/редакция своих личных текстов.</p>
        </section>*/}
      </main>
  )
}