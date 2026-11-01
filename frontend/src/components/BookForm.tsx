import { useState, type FormEvent } from 'react'

import type { BookDraft, BookStatus, Booktag } from '../types/Book'
import type { Genre } from '../types/genre'

import { useGenres } from '../hooks/useGenres'

type BookFormProps = {
    initialValues: BookDraft
    onSave: (book: BookDraft) => void
    onCancel: () => void
}

function BookForm({
                      initialValues,
                      onSave,
                      onCancel
                  }: BookFormProps) {

    const [draft, setDraft] = useState<BookDraft>(initialValues)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [error, setError] = useState('')

    const { load, retry } = useGenres()

    const genres: Genre[] =
        load.status === 'success' ? load.data : []

    const selectedGenresExist =
        draft.genres.length > 0 &&
        draft.genres.every((id) =>
            genres.some((genre) => genre.id === id)
        )

    const canSave =
        load.status === 'success' && selectedGenresExist

    // Обновление обычных полей формы
    function updateField<K extends keyof BookDraft>(
        field: K,
        value: BookDraft[K]
    ) {
        setDraft((current) => ({
            ...current,
            [field]: value
        }))
    }

    // Выбор и снятие выбора жанров
    function handleGenreChange(
        genreId: string,
        checked: boolean
    ) {
        setDraft((current) => ({
            ...current,
            genres: checked
                ? [...current.genres, genreId]
                : current.genres.filter((id) => id !== genreId)
        }))

        setErrors((current) => ({
            ...current,
            genres: ''
        }))
        setError('')
    }

    // Проверка формы
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setError('')

        if (load.status !== 'success') {
            setErrors((current) => ({
                ...current,
                genres: 'Дождитесь загрузки справочника жанров.'
            }))
            return
        }

        if (!canSave) {
            setErrors((current) => ({
                ...current,
                genres: 'Выберите хотя бы один доступный жанр.'
            }))
            return
        }

        const newErrors: Record<string, string> = {}

        if (!draft.title.trim()) {
            newErrors.title = 'Введите название книги.'
        } else if (draft.title.length > 100) {
            newErrors.title = 'Название не должно превышать 100 символов.'
        }

        if (!draft.author.trim()) {
            newErrors.author = 'Введите автора книги.'
        } else if (draft.author.length > 100) {
            newErrors.author = 'Имя автора не должно превышать 100 символов.'
        }

        if (
            draft.rating.trim() !== '' &&
            (
                Number.isNaN(Number(draft.rating)) ||
                Number(draft.rating) < 1 ||
                Number(draft.rating) > 5
            )
        ) {
            newErrors.rating = 'Рейтинг должен быть от 1 до 5.'
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        }

        onSave(draft)
    }

    return (
        <form onSubmit={handleSubmit} noValidate>

            <h2>
                {initialValues.title ? 'Редактирование книги' : 'Добавление книги'}
            </h2>

            {/* Название */}
            <div className="form-group">
                <label htmlFor="title">Название книги *</label>

                <input
                    id="title"
                    type="text"
                    value={draft.title}
                    onChange={(event) =>
                        updateField('title', event.target.value)
                    }
                />

                {errors.title && (
                    <p className="form-error">{errors.title}</p>
                )}
            </div>

            {/* Автор */}
            <div className="form-group">
                <label htmlFor="author">Автор *</label>

                <input
                    id="author"
                    type="text"
                    value={draft.author}
                    onChange={(event) =>
                        updateField('author', event.target.value)
                    }
                />

                {errors.author && (
                    <p className="form-error">{errors.author}</p>
                )}
            </div>

            {/* Соавторы */}
            <div className="form-group">
                <label htmlFor="coAuthors">Соавторы</label>

                <input
                    id="coAuthors"
                    type="text"
                    value={draft.coAuthors ?? ''}
                    onChange={(event) =>
                        updateField('coAuthors', event.target.value)
                    }
                />
            </div>

            {/* Подзаголовок */}
            <div className="form-group">
                <label htmlFor="subtitle">Подзаголовок</label>

                <input
                    id="subtitle"
                    type="text"
                    value={draft.subtitle ?? ''}
                    onChange={(event) =>
                        updateField('subtitle', event.target.value)
                    }
                />
            </div>

            {/* Язык */}
            <div className="form-group">
                <label htmlFor="language">Язык</label>

                <input
                    id="language"
                    type="text"
                    value={draft.language}
                    onChange={(event) =>
                        updateField('language', event.target.value)
                    }
                />
            </div>

            {/* Переводчик */}
            <div className="form-group">
                <label htmlFor="translator">Переводчик</label>

                <input
                    id="translator"
                    type="text"
                    value={draft.translator ?? ''}
                    onChange={(event) =>
                        updateField('translator', event.target.value)
                    }
                />
            </div>

            {/* Дата публикации */}
            <div className="form-group">
                <label htmlFor="date_of_publication">
                    Дата публикации
                </label>

                <input
                    id="date_of_publication"
                    type="text"
                    value={draft.date_of_publication}
                    onChange={(event) =>
                        updateField('date_of_publication', event.target.value)
                    }
                />
            </div>

            {/* Жанры */}
            <fieldset className="form-group">
                <legend>Жанры *</legend>

                {load.status === 'loading' && (
                    <p>Загрузка справочника жанров...</p>
                )}

                {load.status === 'error' && (
                    <div>
                        <p className="form-error">{load.message}</p>

                        <button
                            type="button"
                            onClick={retry}
                        >
                            Повторить загрузку
                        </button>
                    </div>
                )}

                {load.status === 'success' && (
                    <div className="genres-grid">
                        {[...genres]
                            .sort((a, b) =>
                                a.name.localeCompare(b.name, 'ru')
                            )
                            .map((genre) => (
                                <label key={genre.id}>
                                    <input
                                        type="checkbox"
                                        checked={draft.genres.includes(genre.id)}
                                        onChange={(event) =>
                                            handleGenreChange(
                                                genre.id,
                                                event.target.checked
                                            )
                                        }
                                    />

                                    {genre.name}
                                </label>
                            ))}
                    </div>
                )}

                {errors.genres && (
                    <p className="form-error">{errors.genres}</p>
                )}
            </fieldset>

            {/* Описание */}
            <div className="form-group">
                <label htmlFor="description">Описание</label>

                <textarea
                    id="description"
                    value={draft.description ?? ''}
                    onChange={(event) =>
                        updateField('description', event.target.value)
                    }
                />
            </div>

            {/* Рейтинг */}
            <div className="form-group">
                <label htmlFor="rating">Рейтинг (от 1 до 5)</label>

                <input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={draft.rating}
                    onChange={(event) =>
                        updateField('rating', event.target.value)
                    }
                />

                {errors.rating && (
                    <p className="form-error">{errors.rating}</p>
                )}
            </div>

            {/* Заметка */}
            <div className="form-group">
                <label htmlFor="note">Заметка</label>

                <textarea
                    id="note"
                    value={draft.note ?? ''}
                    onChange={(event) =>
                        updateField('note', event.target.value)
                    }
                />
            </div>

            {/* Статус */}
            <div className="form-group">
                <label htmlFor="status">Статус</label>

                <select
                    id="status"
                    value={draft.status}
                    onChange={(event) =>
                        updateField('status', event.target.value as BookStatus)
                    }
                >
                    <option value="Закончено">Закончено</option>
                    <option value="Приостановлено">Приостановлено</option>
                    <option value="Продолжается">Продолжается</option>
                    <option value="Незавершённая">Незавершённая</option>
                </select>
            </div>

            {/* Тег */}
            <div className="form-group">
                <label htmlFor="tag">Тег</label>

                <select
                    id="tag"
                    value={draft.tag ?? ''}
                    onChange={(event) =>
                        updateField(
                            'tag',
                            event.target.value
                                ? event.target.value as Booktag
                                : undefined
                        )
                    }
                >
                    <option value="">Без тега</option>
                    <option value="Читаю">Читаю</option>
                    <option value="В планах">В планах</option>
                    <option value="Брошено">Брошено</option>
                    <option value="Прочитано">Прочитано</option>
                    <option value="Любимые">Любимые</option>
                    <option value="Перечитать">Перечитать</option>
                </select>
            </div>

            {error && (
                <p className="form-error">{error}</p>
            )}

            {/* Кнопки */}
            <div className="form-buttons">
                <button
                    type="submit"
                    disabled={!canSave}
                >
                    Сохранить
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                >
                    Отмена
                </button>
            </div>

        </form>
    )
}

export default BookForm