export type BookStatus =
    'Закончено'
    | 'Приостановлено'
    | 'Продолжается'
    | 'Незавершенна'

export type BookGenre =
    | 'Фэнтези'
    | 'Фантастика'
    | 'Детектив'
    | 'Триллер'
    | 'Ужасы'
    | 'Приключения'
    | 'Роман'
    | 'Любовный роман'
    | 'Драма'
    | 'Комедия'
    | 'Трагедия'
    | 'Исторический'
    | 'Биография'
    | 'Мистика'
    | 'Психология'
    | 'Философия'
    | 'Приключенческий роман'
    | 'Научная фантастика'
    | 'Антиутопия'
    | 'Постапокалипсис'
    | 'Киберпанк'
    | 'Стимпанк'
    | 'Военный'
    | 'Политический'
    | 'Социальный'
    | 'Религиозный'
    | 'Мифология'
    | 'Сказка'
    | 'Поэзия'
    | 'Документальная литература'

export type Booktag =
    |'Читаю'
    |'В планах'
    |'Брошено'
    |'Прочитано'
    |'Любимые'
    |'Перечитать'

export type Book = {
    id: string
    title: string
    genres: string[]
    subtitle: string
    author: string
    coAuthors: string
    language: string
    translator: string
    date_of_publication: string
    description: string
    rating: string
    note: string
    status: BookStatus
    tag: Booktag
}
