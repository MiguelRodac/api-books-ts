import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import routes from "./routes/routes";
import welcome from "./routes/welcome.routes";
// import { validateToken } from "./middlewares/token.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundHandler } from "./shared/utils/handlers/notFoundHandler";

// ===========================================
//          Create Express App
// ===========================================
const app = express();
// ===========================================
//          Swagger Config
// ===========================================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Driver",
      version: "1.0.0",
      description:
        "Documentación de la API para gestión de archivos PDF, base64 y dispositivos.",
    },
  },
  apis: ["./src/docs/swaggerDocs.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
// ===========================================
//          Swagger UI
// ===========================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ===========================================
// Middlewares
// ===========================================
// Middleware para habilitar CORS
app.use(cors());
// Middleware para validar el token
// app.use(validateToken);
// Middlewares para parsear JSON y datos de formularios
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para datos de formularios
// ===========================================
//          Register main routes
// ===========================================
app.use("/", welcome);
app.use("/api", routes);
// ===========================================
//      Handle non-existent routes (404)
// ===========================================
app.use(notFoundHandler);
// ===========================================
//          Error Middleware
// ===========================================
app.use(errorMiddleware);

export default app;
