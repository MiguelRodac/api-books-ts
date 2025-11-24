import cron from "node-cron";
import { AppDataSource } from "../db/db";
import { Author } from "../entities/author.model";
import { Book } from "../entities/book.model";
import { Logger } from "../../shared/utils/logger";

const authorRepo = AppDataSource.getRepository(Author);
const bookRepo = AppDataSource.getRepository(Book);

/**
 * Actualiza el books_published de un autor específico
 */
export async function updateBooksCount(id_author: number): Promise<void> {
  try {
    const count = await bookRepo.count({ where: { author: { id_author } } });
    await authorRepo.update(id_author, { books_published: count });
    Logger.info(`Books count actualizado para autor ${id_author}: ${count}`);
  } catch (error) {
    Logger.error("Error en updateBooksCount", error);
    throw error;
  }
}

/**
 * Actualiza el books_published de todos los autores
 */
export async function updateAllBooksCount(): Promise<void> {
  try {
    const authors = await authorRepo.find();
    for (const author of authors) {
      const count = await bookRepo.count({
        where: { author: { id_author: author.id_author } },
      });
      await authorRepo.update(author.id_author, { books_published: count });
      Logger.info(
        `Books count actualizado para autor ${author.id_author}: ${count}`
      );
    }
    Logger.info("Todos los autores actualizados correctamente");
  } catch (error) {
    Logger.error("Error en updateAllBooksCount", error);
    throw error;
  }
}

/**
 * Job programado: corre cada día a medianoche
 */
cron.schedule("0 0 * * *", async () => {
  Logger.info("Ejecutando job nocturno para actualizar books_count de autores");
  await updateAllBooksCount();
});
