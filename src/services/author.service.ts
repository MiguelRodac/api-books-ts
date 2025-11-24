import { AppDataSource } from "../config/db/db";
import { Author } from "../config/entities/author.model";
import { AuthorRequest } from "../interfaces/author.interface";

export class AuthorService {
  private entity = AppDataSource.getRepository(Author);

  /**
   * Get all authors
   */
  async getAll(): Promise<Author[]> {
    return this.entity.find();
  }

  /**
   * Find an author
   */
  async getById(id: number): Promise<Author | null> {
    return this.entity.findOneBy({ id_author: id });
  }

  /**
   * Create a new author
   */
  async create(data: AuthorRequest): Promise<Author> {
    const author = this.entity.create(data);
    return this.entity.save(author);
  }

  /**
   * Update an author
   */
  async update(
    id: number,
    data: Partial<AuthorRequest>
  ): Promise<Author | null> {
    const author = await this.entity.findOneBy({ id_author: id });
    if (!author) return null;
    Object.assign(author, data);
    return this.entity.save(author);
  }

  /**
   * Delete an author
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.entity.delete(id);
    return result.affected !== 0;
  }
}

export default new AuthorService();
