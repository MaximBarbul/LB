import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './app/AppLayout'
import { BookPage } from './pages/BookPage'
import { BookDetailsPage } from './pages/BookDetailsPage'
import { NewBookPage } from './pages/NewBookPage'
import { NotFoundBook } from './pages/NotFoundPage'
import './App.css'
/*const appTitle: string = 'Личная библиотека'*/
export default function App() {
  return (
      <main className="app">
          <Routes>
              <Route element={<AppLayout />}>
                  <Route index element={<Navigate to="/books" replace />} />
                  <Route path="books" element={<BookPage />} />
                  <Route path="books/new" element={<NewBookPage />} />
                  <Route path="books/:id" element={<BookDetailsPage />} />
                  <Route path="*" element={<NotFoundBook />} />
              </Route>
          </Routes>
          {/*<header>
          <h1>{appTitle}</h1>
          <p>Личные книги, редактирование, чтение.</p>
        </header>
        <section aria-labelledby="items-title">
          <h2 id="items-title">Мои задачи</h2>
          <p>Здесь появится список книг, поиск по жанрам/авторам, написание/редакция своих личных текстов.</p>
        </section>*/}
      </main>
  )
}