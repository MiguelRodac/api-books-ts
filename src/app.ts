import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import routes from "./routes/routes";
import welcome from "./routes/welcome.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundHandler } from "./shared/utils/handlers/notFoundHandler";
import "./config/jobs/authorsPublished.job";

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
      title: "API Books",
      version: "1.0.0",
      description:
        "API para gestionar libros y autor. Desarrollada con Node.js, Express y TypeScript.",
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
// Middleware to enable CORS
app.use(cors());
// Middlewares to parse request body
app.use(express.json()); // to parse JSON
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded data
// ===========================================
//          Register Routes
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
