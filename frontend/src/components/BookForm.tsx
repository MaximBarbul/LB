import { useState } from 'react'
import type { FormEvent } from 'react'
import type {BookDraft, BookStatus, Booktag} from '../types/Book'
type BookFormProps = {
    initialValues: BookDraft
    onSave: (draft: BookDraft) => void
    onCancel: () => void
}
import { bookGenres } from '../types/Book'
import '../styles/NewBookPage.css'
export function BookForm(props: BookFormProps) {
    const [draft, setDraft] = useState(() => ({...props.initialValues}))
    const [errors, setErrors] = useState<Record<string, string>>({})

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newErrors: Record<string, string> = {}

        const title = draft.title.trim()
        const author = draft.author.trim()
        const language = draft.language.trim()
        const dateOfPublication = draft.date_of_publication.trim()
        const rating = draft.rating?.trim() ?? ''

        if (title === '') {
            newErrors.title = 'Заполните название книги.'
        }

        if (author === '') {
            newErrors.author = 'Заполните автора книги.'
        }

        if (draft.genres.length === 0) {
            newErrors.genres = 'Выберите хотя бы один жанр.'
        }

        if (language === '') {
            newErrors.language = 'Укажите язык книги.'
        }

        if (dateOfPublication === '') {
            newErrors.date_of_publication =
                'Укажите дату публикации.'
        }

        if (rating === '') {
            newErrors.rating =
                'Поставьте рейтинг от 1 до 5.'
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        }

        props.onSave({
            ...draft,
            title,
            author,
            language,
            date_of_publication: dateOfPublication,
            rating
        })
    }
    function updateField<K extends keyof BookDraft>(
        field: K,
        value: BookDraft[K]
    ) {
        setDraft((current) => ({
            ...current,
            [field]: value }))
    }
    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <div>
                <label htmlFor="title">Название книги</label>
                <input
                    id="title"
                    type="text"
                    value={draft.title}

                    onChange={(event) =>
                        updateField('title', event.target.value)
                }
                    required
                />
                {errors.title && (
                    <p className="field-error">
                        {errors.title}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="author">Автор</label>
                <input
                    id="author" type="text" value={draft.author}
                    onChange={(event) =>
                        updateField('author', event.target.value)
                }
                    required
                />
                {errors.author && (
                    <p className="field-error">
                        {errors.author}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="subtitle">Подзаголовок</label>
                <input id="subtitle" type="text" value={draft.subtitle ?? ''}
                       onChange={(event) =>
                           updateField('subtitle', event.target.value) }
                />
            </div>
            <div>
                <label htmlFor="coAuthors">Соавторы</label>
                <input id="coAuthors" type="text" value={draft.coAuthors ?? ''}
                       onChange={(event) =>
                           updateField('coAuthors', event.target.value) }
                />
            </div>
            <div>
                <label htmlFor="language">Язык</label>
                <input id="language" type="text" value={draft.language ?? ''}
                       onChange={(event) =>
                           updateField('language', event.target.value) }
                />
                {errors.language && (
                    <p className="field-error">
                        {errors.language}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="translator">Переводчик</label>
                <input id="translator" type="text" value={draft.translator ?? ''}
                       onChange={(event) =>
                           updateField('translator', event.target.value) }
                />
            </div>
            <div>
                <label htmlFor="date_of_publication"> Дата публикации </label>
                <input id="date_of_publication" type="text" value={draft.date_of_publication ?? ''}
                       onChange={(event) =>
                           updateField( 'date_of_publication', event.target.value ) }
                />
                {errors.date_of_publication && (
                    <p className="field-error">
                        {errors.date_of_publication}
                    </p>
                )}
            </div>
            <div>
                <fieldset className="genres-fieldset">
                    <legend>Жанры</legend>

                    <div className="genres-grid">
                        {[...bookGenres]
                            .sort((a, b) => a.localeCompare(b, 'ru'))
                            .map((genre) => (
                                <label
                                    key={genre}
                                    className="genre-checkbox"
                                >
                                    <input
                                        type="checkbox"
                                        checked={draft.genres.includes(genre)}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setDraft({
                                                    ...draft,
                                                    genres: [...draft.genres, genre]
                                                })
                                            } else {
                                                setDraft({
                                                    ...draft,
                                                    genres: draft.genres.filter(
                                                        (item) => item !== genre
                                                    )
                                                })
                                            }
                                        }}
                                    />

                                    <span>{genre}</span>
                                </label>
                            ))}
                    </div>
                    {errors.genres && (
                        <p className="field-error">
                            {errors.genres}
                        </p>
                    )}
                </fieldset>
            </div>
            <div>
                <label htmlFor="description">Описание</label>
                <textarea id="description" value={draft.description ?? ''}
                          onChange={(event) =>
                              updateField('description', event.target.value) }
                />
            </div>
            <div className="rating-field">
                <label>Рейтинг</label>

                <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={
                                Number(draft.rating ?? 0) >= star
                                    ? 'star active'
                                    : 'star'
                            }
                            onClick={() =>
                                updateField('rating', String(star))
                            }
                            aria-label={`Оценка ${star} из 5`}
                        >
                            ★
                        </button>
                    ))}
                    {errors.rating && (
                        <p className="field-error">
                            {errors.rating}
                        </p>
                    )}

                    {draft.rating && (
                        <button
                            type="button"
                            className="rating-clear"
                            onClick={() => updateField('rating', '')}
                        >
                            Сбросить
                        </button>
                    )}
                </div>
            </div>
            <div>
                <label htmlFor="note">Заметка</label>
                <textarea id="note" value={draft.note ?? ''}
                          onChange={(event) =>
                              updateField('note', event.target.value) }
                />
            </div>
            <div>
                <label htmlFor="status">Статус</label>
                <select id="status" value={draft.status}
                        onChange={(event) =>
                            updateField( 'status', event.target.value as BookStatus ) }
                        required
                >
                    <option value="Закончено">Закончено</option>
                    <option value="Приостановлено">Приостановлено</option>
                    <option value="Продолжается">Продолжается</option>
                    <option value="Незавершённая">Незавершённая</option>
                </select>
            </div>
            <div>
                <label htmlFor="tag">Тег</label>
                <select id="tag" value={draft.tag ?? ''}
                        onChange={(event) =>
                            updateField( 'tag', event.target.value ? event.target.value as Booktag : undefined ) } >
                    <option value="">Без тега</option>
                    <option value="Читаю">Читаю</option>
                    <option value="В планах">В планах</option>
                    <option value="Брошено">Брошено</option>
                    <option value="Прочитано">Прочитано</option>
                    <option value="Любимые">Любимые</option>
                    <option value="Перечитать">Перечитать</option>
                </select>
            </div>
            <div>
                <button type="submit"> Сохранить </button>
                <button type="button" onClick={props.onCancel} > Отмена </button>
            </div>
        </form>
    )
}
