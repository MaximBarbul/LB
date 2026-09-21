import './App.css'
const appTitle: string = 'Личная библиотека'
export default function App() {
  return (
      <main className="app">
        <header>
          <h1>{appTitle}</h1>
          <p>Личные книги, редактирование, чтение.</p>
        </header>
        <section aria-labelledby="items-title">
          <h2 id="items-title">Мои задачи</h2>
          <p>Здесь появится список книг, поиск по жанрам/авторам, написание/редакция своих личных текстов.</p>
        </section>
      </main>
  )
}