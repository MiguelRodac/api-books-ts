/**
 * @openapi
 * tags:
 *   - name: Books
 *     description: Endpoints para gestión de libros.
 *
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Obtener todos los libros
 *     description: Retorna la lista completa de libros con su autor.
 *     responses:
 *       200:
 *         description: Lista de libros obtenida correctamente
 *   post:
 *     tags:
 *       - Books
 *     summary: Crear un nuevo libro
 *     description: Crea un libro asociado a un autor existente.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - id_author
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Clean Code"
 *               description:
 *                 type: string
 *                 example: "A book about writing maintainable code"
 *               published_at:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-24"
 *               available:
 *                 type: boolean
 *                 example: true
 *               id_author:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *       400:
 *         description: Datos inválidos
 *
 * /books/{id_book}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Obtener un libro por ID
 *     parameters:
 *       - in: path
 *         name: id_book
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Libro encontrado
 *       404:
 *         description: Libro no encontrado
 *   put:
 *     tags:
 *       - Books
 *     summary: Actualizar un libro
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_book
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Refactoring"
 *               description:
 *                 type: string
 *                 example: "Improving the design of existing code"
 *               available:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Libro actualizado
 *       404:
 *         description: Libro no encontrado
 *   delete:
 *     tags:
 *       - Books
 *     summary: Eliminar un libro
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_book
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Libro eliminado
 *       404:
 *         description: Libro no encontrado
 */
