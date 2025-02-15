import { Injectable } from '@nestjs/common';
import { BookConfig } from 'src/config/book.config';
import { BookRepository } from './repositories/book.repository';
import { Book } from './interfaces/book.interface';



@Injectable()
export class BookService {
  constructor(
    private readonly config: BookConfig,
    private readonly bookRepository: BookRepository

  ) { }
  async getExternalService(id: string): Promise<Book> {
    return {
      id,
      title: `Book ${Math.floor(Math.random() * 100)}`,
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
      book = await this.getExternalService(id);
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
    return {
      pages: [1, 2, 3],

      planText: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,


    };
  }
}


