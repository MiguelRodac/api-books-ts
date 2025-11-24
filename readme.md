# 📚 Books API

API Backend construida con **Node.js, Express, TypeORM, PostgreSQL, Zod, JWT**.  
Permite gestionar Autores, Libros y Usuarios con autenticación y tareas programadas.

---

## 🚀 Funcionalidades
- CRUD para Autores, Libros y Usuarios
- Autenticación con JWT (`/api/auth/login`, `/api/auth/register`)
- Documentación Swagger en `/api-docs`
- Tarea programada (cron job) para actualizar el campo `books_count` de los Autores
- Logger centralizado y manejo de errores

---

## Diagrama de la base de datos

El diagrama ER público está disponible en dbdiagram. Puedes explorarlo aquí:
[API Books DB en dbdiagram](https://dbdiagram.io/d/API-Books-DB-6924ead3228c5bbc1a52f55e)

---

## 📦 Instalación

```bash
git clone https://github.com/MiguelRodac/api-books-ts
cd books-api-ts
npm install
```

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=books_db
JWT_SECRET=tu_secreto_generado
```

### 🔑 Cómo generar un `JWT_SECRET` seguro

Debes definir una clave secreta fuerte para firmar y verificar los tokens JWT.  
Puedes generarla usando Node.js o OpenSSL:

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# OpenSSL
openssl rand -hex 64
```

Esto producirá una cadena larga y aleatoria. Copia ese valor en tu archivo `.env` como `JWT_SECRET`.

---

## ▶️ Ejecución

```bash
npm run dev
```

Servidor disponible en: `http://localhost:3000/api`  
Documentación Swagger: `http://localhost:3000/docs`

---

## 📂 Endpoints

### Autenticación
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (requiere JWT)
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

### Usuarios
- `GET /api/users`
- `GET /api/users/{id_user}`
- `POST /api/users`
- `PUT /api/users/{id_user}`
- `DELETE /api/users/{id_user}`

### Autores
- `GET /api/authors`
- `GET /api/authors/{id_author}`
- `POST /api/authors`
- `PUT /api/authors/{id_author}`
- `DELETE /api/authors/{id_author}`

### Libros
- `GET /api/books`
- `GET /api/books/{id_book}`
- `POST /api/books`
- `PUT /api/books/{id_book}`
- `DELETE /api/books/{id_book}`

---

## 🛠️ Notas de Desarrollo
- Usa `Logger` para trazabilidad.
- Todos los comentarios en inglés para legibilidad global.
- Validadores con Zod para asegurar entradas limpias.
- Jobs mantienen actualizado el campo `books_count` automáticamente (ejecuta cada medianoche).
- Swagger provee documentación interactiva en `/api-docs`.

---

## 📖 Licencia
MIT
