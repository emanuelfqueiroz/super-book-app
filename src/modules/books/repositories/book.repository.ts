import { Injectable } from '@nestjs/common';
import { Book } from '../interfaces/book.interface';

@Injectable()
export class BookRepository {
  private readonly cache: Map<string, Book> = new Map();

  async findOne(id: string): Promise<Book | null> {
    return this.cache.get(id) || null;
  }

  async save(book: Book): Promise<void> {
    this.cache.set(book.id, book);
  }
  
}

export default BookRepository;