import cron from "node-cron";
import { AppDataSource } from "../db/db";
import Author from "../entities/author.model";
import Book from "../entities/book.model";
import { Logger } from "../../shared/utils/logger";

const authorRepo = AppDataSource.getRepository(Author);
const bookRepo = AppDataSource.getRepository(Book);

/**
 * Job: Update books_count for all authors
 * Runs every day at midnight
 */
cron.schedule("0 0 * * *", async () => {
  Logger.info("Running job to update authors books_count");
  try {
    const authors = await authorRepo.find();

    for (const author of authors) {
      // Count books for this author
      const count = await bookRepo.count({
        where: { author: { id_author: author.id_author } },
      });

      // Update books_count
      author.books_published = count;
      await authorRepo.save(author);

      Logger.info(
        `Updated books_count for author ${author.id_author}: ${count}`
      );
    }

    Logger.info("Authors books_count updated successfully");
  } catch (error) {
    Logger.error("Error running authors books_count job", error);
  }
});
