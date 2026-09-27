import { NavLink, Outlet } from 'react-router'
export function AppLayout() {
    return (
        <div className="app">
            <header>
                <p className="app-title"></p>
                <nav aria-label="Основная навигация">
                    <NavLink to="/Books" end>Книги</NavLink>
                    <NavLink to="/Books/new">Добавить</NavLink>
                </nav>
            </header>
            <main><Outlet /></main>
        </div>
    )
}
