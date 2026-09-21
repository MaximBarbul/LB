

## Создание проекта
```bash
mkdir course-app
cd course-app
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm run dev
```


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