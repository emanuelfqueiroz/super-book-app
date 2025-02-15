import { Injectable } from '@nestjs/common';
import { BookConfig } from '../../config/book.config';
import { BookRepository } from './repositories/book.repository';
import { GutenbergRepository } from './repositories/gutenberg.repository';
import { Book } from './interfaces/book.interface';



@Injectable()
export class BookService {
  constructor(
    private readonly config: BookConfig,
    private readonly gutenbergRepository: GutenbergRepository,
    private readonly bookRepository: BookRepository,


  ) { }
  async getExternalService(id: string): Promise<Book> {
    return {
      id,
      title: `Book ${Math.floor(Math.random() * 100)}` + this.config.bookSourceUrl,
      author: `Author ${Math.floor(Math.random() * 50)}`,
      image: `${Math.floor((Math.random() * 3) + 1)}.jpg`,
      description: 'Random book description'
    }

  }
  async getRecentBooks(qty: number): Promise<Book[]> {
  
    return [
      { id: '1', title: 'Book 1', author: 'Author 1', image: '1.jpg', description: 'Random book description' },
      { id: '2', title: 'Book 2', author: 'Author 2', image: '2.jpg', description: 'Random book description' },
      { id: '3', title: 'Book 3', author: 'Author 3', image: '3.jpg', description: 'Random book description' },
      { id: '4', title: 'Book 4', author: 'Author 4', image: '4.jpg', description: 'Random book description' },
      { id: '5', title: 'Book 5', author: 'Author 5', image: '5.jpg', description: 'Random book description' },
      { id: '6', title: 'Book 6', author: 'Author 6', image: '6.jpg', description: 'Random book description' }
    ];
  }

  async getBook(id: string): Promise<Book> {
    // Try to get from repository
    let book = await this.bookRepository.findOne(id);

    // If not found, get from external service and cache
    if (!book) {
      book = await this.gutenbergRepository.getBook(id);
      if (book) {
        await this.bookRepository.save(book);
      }
    }

    return book;

  }
  async getAnalysis(id: string): Promise<any> {
    return {
      characters: ['John', 'Mary', 'Peter'],
      language: 'English',
      sentiment: {
        negative: 40, 
        neutral: 40, 
        positive: 20
      },
      plotSummary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    }
  }
  async getContent(id: string): Promise<any> {
    let book = await this.bookRepository.findOne(id) || {id, content: null};
    
    if (!book.content) {
      book.content = await this.gutenbergRepository.getContent(id);
      if (book) {
        await this.bookRepository.save(book);
      }
    }

    return {
      pages: [1, 2, 3],
      planText: book.content
    };
  }
}


