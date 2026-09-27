Лб1
шаг 1:
Создал проект на Vite при помощи команд:

mkdir course-app
cd course-app
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm run dev

шаг 2:
Заменил содержимое в App.tsx,App.css,index.css,

шаг 3: 
проверил структуру проекта.

шаг 4:
подготовил README и историю этапов.
## Запуск
Из корня скачанного проекта:
```bash
cd frontend
npm ci
npm run dev
```
## Проверка сборки
Остановите dev через Ctrl+C. Выполните в frontend:
```bash
npm run build
npm run preview

Лб2
шаг 1 
наметил страницы своей темы

шаг 2
описал данные приложения
в файл Book.ts создал шаблон с параметрами книги

шаг 3
создал BookCard, компонент выводящий осн информацию о книге

шаг 4
создал BooksPage, список импортирует единый
массив данных и передаёт каждую запись в BookCard

шаг 5
Добавил BookDetailsPage, подробный вывод информации о книге

шаг 6
создал оставшиеся элементы AppLayout, NewBookPage, NotFoundPage

шаг 7
В main добавим импорты BrowserRouter

шаг 8
Добавим стили в App.css