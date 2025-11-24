export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Books API",
    version: "1.0.0",
    description: `
      API para gestionar Usuarios, Autores y Libros.
      Construida con Node.js, Express, TypeORM, PostgreSQL, Zod y JWT.
      
      🔑 Autenticación:
      - Usa JWT en el header Authorization: Bearer <token>.
      - Genera tu secreto JWT_SECRET en .env.
    `,
  },
  servers: [{ url: "http://localhost:3000/api" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    // ============================
    // Auth Endpoints
    // ============================
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Registrar usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nickname: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["nickname", "email", "password"],
              },
            },
          },
        },
        responses: {
          201: { description: "Usuario registrado con token" },
          400: { description: "Datos inválidos" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login y generación de JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: { description: "Login exitoso con token" },
          401: { description: "Credenciales inválidas" },
        },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Obtener usuario actual",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Usuario actual" },
          401: { description: "No autorizado" },
        },
      },
    },
    "/auth/refresh": {
      post: {
        tags: ["Auth"],
        summary: "Refrescar token",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Token renovado" },
          401: { description: "No autorizado" },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Cerrar sesión",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Logout exitoso" },
        },
      },
    },

    // ============================
    // Users Endpoints
    // ============================
    "/users": {
      get: {
        tags: ["Users"],
        summary: "Listar usuarios",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Lista de usuarios" } },
      },
      post: {
        tags: ["Users"],
        summary: "Crear usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nickname: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["nickname", "email", "password"],
              },
            },
          },
        },
        responses: { 201: { description: "Usuario creado" } },
      },
    },
    "/users/{id_user}": {
      get: {
        tags: ["Users"],
        summary: "Obtener usuario por ID",
        parameters: [
          {
            name: "id_user",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Usuario encontrado" },
          404: { description: "No encontrado" },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Actualizar usuario",
        parameters: [
          {
            name: "id_user",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          content: { "application/json": { schema: { type: "object" } } },
        },
        responses: { 200: { description: "Usuario actualizado" } },
      },
      delete: {
        tags: ["Users"],
        summary: "Eliminar usuario",
        parameters: [
          {
            name: "id_user",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Usuario eliminado" },
          404: { description: "No encontrado" },
        },
      },
    },

    // ============================
    // Authors Endpoints
    // ============================
    "/authors": {
      get: {
        tags: ["Authors"],
        summary: "Listar autores",
        responses: { 200: { description: "Lista de autores" } },
      },
      post: {
        tags: ["Authors"],
        summary: "Crear autor",
        requestBody: {
          content: { "application/json": { schema: { type: "object" } } },
        },
        responses: { 201: { description: "Autor creado" } },
      },
    },
    "/authors/{id_author}": {
      get: {
        tags: ["Authors"],
        summary: "Obtener autor por ID",
        parameters: [
          {
            name: "id_author",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Autor encontrado" },
          404: { description: "No encontrado" },
        },
      },
      put: {
        tags: ["Authors"],
        summary: "Actualizar autor",
        parameters: [
          {
            name: "id_author",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          content: { "application/json": { schema: { type: "object" } } },
        },
        responses: { 200: { description: "Autor actualizado" } },
      },
      delete: {
        tags: ["Authors"],
        summary: "Eliminar autor",
        parameters: [
          {
            name: "id_author",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Autor eliminado" },
          404: { description: "No encontrado" },
        },
      },
    },

    // ============================
    // Books Endpoints
    // ============================
    "/books": {
      get: {
        tags: ["Books"],
        summary: "Listar libros",
        responses: { 200: { description: "Lista de libros" } },
      },
      post: {
        tags: ["Books"],
        summary: "Crear libro",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  published_at: { type: "string", format: "date" },
                  available: { type: "boolean" },
                  id_author: { type: "integer" },
                },
                required: ["title", "id_author"],
              },
            },
          },
        },
        responses: { 201: { description: "Libro creado" } },
      },
    },
    "/books/{id_book}": {
      get: {
        tags: ["Books"],
        summary: "Obtener libro por ID",
        parameters: [
          {
            name: "id_book",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Libro encontrado" },
          404: { description: "No encontrado" },
        },
      },
      put: {
        tags: ["Books"],
        summary: "Actualizar libro",
        parameters: [
          {
            name: "id_book",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          content: { "application/json": { schema: { type: "object" } } },
        },
        responses: { 200: { description: "Libro actualizado" } },
      },
      delete: {
        tags: ["Books"],
        summary: "Eliminar libro",
        parameters: [
          {
            name: "id_book",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Libro eliminado" },
          404: { description: "No encontrado" },
        },
      },
    },
  },
};
