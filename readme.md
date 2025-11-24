# 📚 Books API

Backend API built with **Node.js, Express, TypeORM, PostgreSQL, Zod, JWT**.  
Manages Authors, Books, and Users with authentication and scheduled jobs.

---

## 🚀 Features
- CRUD for Authors, Books, Users
- JWT Authentication (`/api/auth/login`, `/api/auth/register`)
- Swagger docs at `/docs`
- Cron job to update `books_count` for Authors
- Centralized Logger and error handling

---

## 📦 Installation

```bash
git https://github.com/MiguelRodac/api-books-ts
cd books-api-ts
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=books_db
JWT_SECRET=super_secret_key
```

---

## ▶️ Run

```bash
npm run dev
```

Server runs at: `http://localhost:8000/api`  
Swagger docs: `http://localhost:8000/docs`

---

## 📂 Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (requires JWT)
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

### Users
- `GET /api/users`
- `GET /api/users/{id_user}`
- `POST /api/users`
- `PUT /api/users/{id_user}`
- `DELETE /api/users/{id_user}`

### Authors
- `GET /api/authors`
- `GET /api/authors/{id_author}`
- `POST /api/authors`
- `PUT /api/authors/{id_author}`
- `DELETE /api/authors/{id_author}`

### Books
- `GET /api/books`
- `GET /api/books/{id_book}`
- `POST /api/books`
- `PUT /api/books/{id_book}`
- `DELETE /api/books/{id_book}`

---

## 🛠️ Development Notes
- Use `Logger` for traceability.
- All comments in English for global readability.
- Validators with Zod ensure clean input.
- Jobs keep `books_count` updated automatically.

---

## 📖 License
MIT
