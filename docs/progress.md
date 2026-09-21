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
