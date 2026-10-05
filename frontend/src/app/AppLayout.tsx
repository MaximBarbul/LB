import { NavLink, Outlet } from 'react-router'

export function AppLayout() {
    return (
        <div className="app">
            <header className="app-header">
                <div className="header-left">

                    <nav aria-label="Основная навигация">
                        <NavLink to="/Books" end>
                            Книги
                        </NavLink>

                        <NavLink to="/Books/new">
                            Добавить книгу
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}
