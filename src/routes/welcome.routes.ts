import { Router } from "express";
import { responseHandler } from "../shared/utils/handlers/responsesHandler";
import { Logger } from "../shared/utils/logger";

const router = Router();

// ===========================================
//          Routes test conection
// ===========================================

/**
 * Route /
 * @returns html || json
 */
router.get("/", (req, res) => {
  // HTML response
  if (req.accepts("html")) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>API Books</title>
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            text-align: center;
            background: #fff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          }
          h1 {
            color: #0077b6;
            margin-bottom: 10px;
          }
          .status {
            font-size: 1.2rem;
            color: #555;
            margin-bottom: 20px;
          }
          a {
            display: inline-block;
            margin: 10px;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            background: #0077b6;
            color: #fff;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>📚 API Books</h1>
          <div class="status">API activa</div>
          <p>Explora la documentación en <code>/docs</code></p>
          <a href="api-docs/">Ver Endpoints</a>
        </div>
      </body>
      </html>
    `);
  }

  // JSON response
  if (req.accepts("json")) {
    return responseHandler(res, {
      status: 200,
      message: "API activa",
      data: {
        documentation: "api-docs/",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Fallback: texto plano
  return res.send("API activa - documentación en /docs");
});

/**
 * Health Check
 * @returns JSON o HTML según Accept header
 */
router.get("/health", (req, res) => {
  Logger.info(
    `Health check from IP: ${
      req.ip
    } - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
  );

  // HTML response
  if (req.accepts("html")) {
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Health Check</title>
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            background: #f0f4f8;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            text-align: center;
            background: #fff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          }
          h1 {
            color: #0077b6;
            margin-bottom: 10px;
          }
          .status {
            font-size: 1.2rem;
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>📡 API Health</h1>
          <div class="status">Status: OK</div>
          <p>Documentación disponible en <code>/docs</code></p>
        </div>
      </body>
      </html>
    `);
  }

  if (req.accepts("json")) {
    return responseHandler(res, {
      status: 200,
      message: "API activa",
      data: {
        status: "OK",
        timestamp: new Date().toISOString(),
        documentation: "api-docs/",
        version: "1.0.0",
      },
    });
  }

  return res.send("API activa");
});

/**
 * Ping pong connection
 * @returns JSON o HTML según Accept header
 */
router.get("/ping", (req, res) => {
  Logger.info(
    `Ping requested - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
  );

  // HTML response
  if (req.accepts("html")) {
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>PING</title>
        <style>
          body {
            background: linear-gradient(135deg, #000 0%, #0077b6 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
          }
          h1 {
            color: #00f2fe;
            font-size: 4rem;
            text-align: center;
            text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        </style>
      </head>
      <body>
        <h1>PONG</h1>
      </body>
      </html>
    `);
  }

  // JSON response
  if (req.accepts("json")) {
    return responseHandler(res, {
      status: 200,
      message: "PONG",
      data: {
        documentation: "api-docs/",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
      },
    });
  }

  return res.send("PONG");
});

export default router;
