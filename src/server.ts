import "dotenv/config";
import app from "./app";
import { Logger } from "./shared/utils/logger";

const PORT = process.env.PORT || 3000;

/**
 * Inicia el servidor y escucha en el puerto especificado.
 */
const start = async () => {
  try {
    // await connectDB(); // Conectar a la base de datos
    app.listen(PORT, () => {
      Logger.info(`🚀 Server running on port ${PORT}`);
      Logger.info(`📚 API docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

/**
 * Evento de cierre del servidor.
 * @param signal El símbolo del sinal que generó la detención del
 */
process.on("SIGINT", () => {
  Logger.info("\n🔴 Server shutting down...");
  process.exit(0);
});

start();
