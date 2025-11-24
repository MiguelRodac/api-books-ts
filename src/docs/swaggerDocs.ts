/**
 * @openapi
 * components:
 *   securitySchemes:
 *     x-tkn:
 *       type: apiKey
 *       in: header
 *       name: x-tkn
 * tags:
 *   - name: Connection
 *     description: Endpoints para verificar el estado de la API.
 *   - name: PDF
 *     description: Endpoints para generación y manejo de archivos PDF.
 *   - name: Device
 *     description: Endpoints para información de dispositivos.
 * 
 * /health:
 *   get:
 *     tags:
 *       - Connection
 *     summary: Verifica el estado de la API
 *     description: Endpoint para comprobar que la API está activa y funcionando.
 *     security:
 *       - x-tkn: []
 *     responses:
 *       200:
 *         description: API activa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *       401:
 *         description: Token inválido o no enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 * /ping:
 *   get:
 *     tags:
 *       - Connection
 *     summary: Verificación básica de conectividad
 *     description: Endpoint que responde "PONG" en HTML para verificar conectividad
 *     security:
 *       - x-tkn: []
 *     responses:
 *       200:
 *         description: PONG response exitoso
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<h1 style='...'>PONG</h1>"
 *
 * /api/pdf/ticket-and-print:
 *   post:
 *     tags:
 *       - PDF
 *     summary: Generar ticket PDF e imprimir
 *     description: |
 *       Genera un ticket en formato PDF para transacciones y lo envía a impresión automáticamente.
 *       Además, sube el archivo PDF a un servidor CMS y registra el proceso.
 *     security:
 *       - x-tkn: []
 *     requestBody:
 *       required: true
 *       description: Datos de la transacción para generar el ticket
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - hours
 *               - refNumber
 *               - abononumber
 *               - amount
 *               - mac_address
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la transacción (formato DD/MM/YYYY)
 *                 example: "05/08/2025"
 *               hours:
 *                 type: string
 *                 description: Hora de la transacción con formato
 *                 example: "09:45:10 a. m."
 *               refNumber:
 *                 type: string
 *                 description: Número de referencia de la transacción
 *                 example: "111111"
 *               numSeq:
 *                 type: string
 *                 description: Número secuencial opcional
 *                 example: "54"
 *               abononumber:
 *                 type: string
 *                 description: Número de abono o identificación del cliente
 *                 example: "C4390"
 *               status:
 *                 type: string
 *                 description: Estado de la transacción
 *                 example: "APROBADA"
 *                 enum: [APROBADA, RECHAZADA, PENDIENTE]
 *               describe:
 *                 type: string
 *                 description: Descripción del pago o transacción
 *                 example: "Abono de Mensualidad"
 *               amount:
 *                 type: string
 *                 description: Monto de la transacción
 *                 example: "1.50"
 *               methodPayment:
 *                 type: string
 *                 description: Método de pago utilizado
 *                 example: "Master Debit"
 *               mac_address:
 *                 type: string
 *                 format: mac
 *                 description: Dirección MAC del dispositivo que realiza la operación
 *                 example: "50:9a:4c:50:df:4e"
 *               is_anulation:
 *                 type: boolean
 *                 description: Indica si es una transacción de anulación
 *                 example: true
 *     responses:
 *       200:
 *         description: PDF generado, impreso y subido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Ticket generado exitosamente - PDF enviado a impresión"
 *                 data:
 *                   type: object
 *                   properties:
 *                     path:
 *                       type: string
 *                       description: Ruta local del archivo PDF generado
 *                       example: "C:\\proyectos\\api-driver\\temp\\tickets\\C4390_111111_05_08_2025_H09_45_10_a__m__ticket.pdf"
 *                     file:
 *                       type: object
 *                       properties:
 *                         url:
 *                           type: string
 *                           format: uri
 *                           description: URL del archivo subido al CMS
 *                           example: "https://cms.fibextelecom.info/uploads/Auto_Pago_Files_C4390_111111_05_08_2025_H09_45_10_a_m_ticket_pdf_a39325ccef.pdf"
 *                         file:
 *                           type: object
 *                           properties:
 *                             status:
 *                               type: integer
 *                               example: 201
 *                             message:
 *                               type: string
 *                               example: "Ticket files created successfully"
 *                             invoices_files:
 *                               type: object
 *                               properties:
 *                                 total:
 *                                   type: integer
 *                                   example: 1
 *                                 success:
 *                                   type: integer
 *                                   example: 1
 *                                 errors:
 *                                   type: integer
 *                                   example: 0
 *                             errorDetails:
 *                               type: string
 *                               nullable: true
 *                               example: null
 *                             logMessage:
 *                               type: object
 *                               properties:
 *                                 status:
 *                                   type: integer
 *                                   example: 201
 *                                 message:
 *                                   type: string
 *                                   example: "Log creado exitosamente"
 *                                 logID:
 *                                   type: integer
 *                                   example: 70
 *                                 log_type:
 *                                   type: string
 *                                   example: "ADMINISTRATIVO/FILES_UPLOAD"
 *                                 is_success:
 *                                   type: boolean
 *                                   example: true
 *       400:
 *         description: Datos de entrada inválidos o faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Faltan campos requeridos: date, refNumber, abononumber"
 *       401:
 *         description: Token inválido o no enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Error en generación, impresión o upload del PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Error al conectar con la impresora"
 *     x-codeSamples:
 *       - lang: curl
 *         label: cURL Example
 *         source: |
 *           curl -X POST "http://localhost:4200/api/pdf/ticket-and-print" \
 *           -H "Accept: application/json" \
 *           -H "Content-Type: application/json" \
 *           -H "x-tkn: Token" \
 *           -d '{
 *             "date": "05/08/2025",
 *             "hours": "09:45:10 a. m.",
 *             "refNumber": "111111",
 *             "numSeq": "54",
 *             "abononumber": "C4390",
 *             "status": "APROBADA",
 *             "describe": "Abono de Mensualidad",
 *             "amount": "1.50",
 *             "methodPayment": "Master Debit",
 *             "mac_address": "50:9a:4c:50:df:4e",
 *             "is_anulation": true
 *           }'
 * 
 * /api/pdf/closing-and-upload:
 *   post:
 *     tags:
 *       - PDF
 *     summary: Procesar y subir archivo de precierre de caja
 *     description: |
 *       Procesa un archivo de precierre de caja, genera documentación relacionada
 *       y sube los archivos resultantes al servidor CMS.
 *     security:
 *       - x-tkn: []
 *     requestBody:
 *       required: true
 *       description: Datos para procesar el precierre de caja
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - register
 *               - pathRoute
 *               - typeFile
 *             properties:
 *               register:
 *                 type: string
 *                 format: mac
 *                 description: |
 *                   Dirección MAC del registro o dispositivo que genera el precierre.
 *                   Formato MAC address (XX:XX:XX:XX:XX:XX)
 *                 example: "50:9a:4c:50:df:4e"
 *               pathRoute:
 *                 type: string
 *                 description: |
 *                   Ruta completa del archivo de precierre a procesar.
 *                   Incluye directorio, nombre de archivo y extensión.
 *                 example: "C:\\voucher\\precierres\\Precierre_Caja_fibexval02_20250828.txt"
 *               typeFile:
 *                 type: boolean
 *                 description: |
 *                   Tipo de archivo a procesar.
 *                   true - Archivo de precierre de caja
 *                   false - Otro tipo de archivo
 *                 example: true
 *     responses:
 *       200:
 *         description: Precierre procesado y archivos subidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Precierre procesado exitosamente - Archivos subidos al CMS"
 *                 data:
 *                   type: object
 *                   properties:
 *                     originalFile:
 *                       type: string
 *                       description: Ruta del archivo original procesado
 *                       example: "C:\\voucher\\precierres\\Precierre_Caja_fibexval02_20250828.txt"
 *                     generatedFiles:
 *                       type: array
 *                       description: Lista de archivos generados y subidos
 *                       items:
 *                         type: object
 *                         properties:
 *                           fileName:
 *                             type: string
 *                             example: "Precierre_Caja_fibexval02_20250828.pdf"
 *                           fileUrl:
 *                             type: string
 *                             format: uri
 *                             example: "https://cms.fibextelecom.info/uploads/precierres/Precierre_Caja_fibexval02_20250828.pdf"
 *                           fileSize:
 *                             type: string
 *                             example: "2.5 MB"
 *                     processingSummary:
 *                       type: object
 *                       properties:
 *                         totalTransactions:
 *                           type: integer
 *                           example: 150
 *                         totalAmount:
 *                           type: number
 *                           format: float
 *                           example: 12500.75
 *                         processedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-01-15T14:30:00Z"
 *       400:
 *         description: Datos de entrada inválidos o archivo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Archivo no encontrado en la ruta especificada"
 *                 details:
 *                   type: object
 *                   properties:
 *                     pathRoute:
 *                       type: string
 *                       example: "C:\\voucher\\precierres\\Precierre_Caja_fibexval02_20250828.txt"
 *                     error:
 *                       type: string
 *                       example: "El archivo no existe o no se puede acceder"
 *       401:
 *         description: Token inválido o no enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Error en el procesamiento o upload del archivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Error al procesar el archivo de precierre"
 *                 errorDetails:
 *                   type: string
 *                   example: "Error de conexión con el servidor CMS"
 *     x-codeSamples:
 *       - lang: curl
 *         label: cURL Example
 *         source: |
 *           curl -X POST "http://localhost:4200/api/pdf/closing-and-upload" \
 *           -H "Accept: application/json" \
 *           -H "Content-Type: application/json" \
 *           -H "x-tkn: token" \
 *           -d '{
 *             "register": "50:9a:4c:50:df:4e",
 *             "pathRoute": "C:\\voucher\\precierres\\Precierre_Caja_fibexval02_20250828.txt",
 *             "typeFile": true
 *           }'
 * 
 * /api/divice-info/mac:
 *   get:
 *     tags:
 *       - Device
 *     summary: Obtener MAC address del dispositivo actual
 *     description: |
 *       Recupera la dirección MAC del dispositivo asociado al token de autenticación.
 *       Este endpoint utiliza el token para identificar y retornar la MAC address del dispositivo.
 *     security:
 *       - x-tkn: []
 *     responses:
 *       200:
 *         description: MAC address obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Data found"
 *                 data:
 *                   type: string
 *                   format: mac
 *                   description: Dirección MAC del dispositivo autenticado
 *                   example: "50:9a:4c:50:df:4e"
 *       401:
 *         description: Token inválido, expirado o no enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Token inválido o expirado"
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Dispositivo no encontrado para el token proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Dispositivo no encontrado para el token proporcionado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Error al obtener información del dispositivo"
 *     x-codeSamples:
 *       - lang: curl
 *         label: cURL Example
 *         source: |
 *           curl --location 'localhost:4200/api/divice-info/mac' \
 *           --header 'Accept: application/json' \
 *           --header 'Content-Type: application/json' \
 *           --header 'x-tkn: rJ4EctGahhSkEU2ZNhrzU4IjL06wUP'
 *       - lang: javascript
 *         label: JavaScript Fetch
 *         source: |
 *           fetch('localhost:4200/api/divice-info/mac', {
 *             method: 'GET',
 *             headers: {
 *               'Accept': 'application/json',
 *               'Content-Type': 'application/json',
 *               'x-tkn': 'rJ4EctGahhSkEU2ZNhrzU4IjL06wUP'
 *             }
 *           })
 *           .then(response => response.json())
 *           .then(data => console.log(data))
 *           .catch(error => console.error('Error:', error));
 *       - lang: nodejs
 *         label: Node.js Axios
 *         source: |
 *           const axios = require('axios');
 *           
 *           const config = {
 *             method: 'get',
 *             url: 'localhost:4200/api/divice-info/mac',
 *             headers: { 
 *               'Accept': 'application/json', 
 *               'Content-Type': 'application/json', 
 *               'x-tkn': 'rJ4EctGahhSkEU2ZNhrzU4IjL06wUP'
 *             }
 *           };
 *           
 *           axios.request(config)
 *           .then((response) => {
 *             console.log(JSON.stringify(response.data));
 *           })
 *           .catch((error) => {
 *             console.log(error);
 *           });
 */