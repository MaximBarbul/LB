
export type BookStatus =
    | 'Закончено'
    | 'Приостановлено'
    | 'Продолжается'
    | 'Незавершённая'

export type Booktag =
    | 'Читаю'
    | 'В планах'
    | 'Брошено'
    | 'Прочитано'
    | 'Любимые'
    | 'Перечитать'

export type Book = {
    id: string
    title: string
    genres: string[]
    subtitle?: string
    author: string
    coAuthors?: string
    language: string
    translator?: string
    date_of_publication: string
    description?: string
    rating: string
    note?: string
    status: BookStatus
    tag?: Booktag
}

export type BookDraft = Omit<Book, 'id'>
