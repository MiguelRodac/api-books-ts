import { AppDataSource } from "../config/db/db";
import { Book } from "../config/entities/book.model";
import { Author } from "../config/entities/author.model";
import { Logger } from "../shared/utils/logger";
import { BookCreateDTO } from "../shared/validators/book.validator";
import { updateBooksCount } from "../config/jobs/authorsPublished.job";

export class BookService {
  private entity = AppDataSource.getRepository(Book);
  private authorRepo = AppDataSource.getRepository(Author);

  /**
   * Get all books
   */
  async getAll(): Promise<Book[]> {
    try {
      return await this.entity.find({ relations: ["author"] });
    } catch (error) {
      Logger.error("Error in getAll Books", error);
      throw error;
    }
  }

  /**
   * Get book by ID
   * @param id - Book ID
   */
  async getById(id: number): Promise<Book | null> {
    try {
      return await this.entity.findOne({
        where: { id_book: id },
        relations: ["author"],
      });
    } catch (error) {
      Logger.error("Error in getById Book", error);
      throw error;
    }
  }

  /**
   * Create a new book
   * @param data - Book data
   */
  async create(data: BookCreateDTO): Promise<Book> {
    try {
      // Fetch the author relation
      const author = await this.authorRepo.findOneBy({
        id_author: data.id_author,
      });
      if (!author) {
        throw new Error(`Author with ID ${data.id_author} not found`);
      }

      // Map DTO to entity
      const book = this.entity.create({
        title: data.title,
        description: data.description,
        published_at: data.published_at,
        available: data.available,
        author, // relation object
      });

      // Update author's books count
      await updateBooksCount(author.id_author);

      return await this.entity.save(book);
    } catch (error) {
      Logger.error("Error in create Book", error);
      throw error;
    }
  }

  /**
   * Update an existing book
   * @param id - Book ID
   * @param data - Partial book data
   */
  async update(id: number, data: Partial<BookCreateDTO>): Promise<Book | null> {
    try {
      const book = await this.entity.findOneBy({ id_book: id });
      if (!book) return null;

      // If author is being updated, fetch relation
      if (data.id_author) {
        const author = await this.authorRepo.findOneBy({
          id_author: data.id_author,
        });
        if (!author) {
          throw new Error(`Author with ID ${data.id_author} not found`);
        }
        book.author = author;
      }

      Object.assign(book, {
        title: data.title ?? book.title,
        description: data.description ?? book.description,
        published_at: data.published_at ?? book.published_at,
        available: data.available ?? book.available,
      });

      return await this.entity.save(book);
    } catch (error) {
      Logger.error("Error in update Book", error);
      throw error;
    }
  }

  /**
   * Delete a book
   * @param id - Book ID
   */
  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.entity.delete(id);
      return result.affected !== 0;
    } catch (error) {
      Logger.error("Error in delete Book", error);
      throw error;
    }
  }
}

export default new BookService();
