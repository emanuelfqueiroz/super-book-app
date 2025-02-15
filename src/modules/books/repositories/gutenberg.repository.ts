import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BookConfig } from '../../../config/book.config';

import { Book } from '../interfaces/book.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GutenbergRepository {
  constructor(private readonly httpService: HttpService, private readonly config: BookConfig) {}

  async getContent(id: string): Promise<Book | null> {
    
      try {
        console.log('Getting book from external service');
        const contentResponse = await this.httpService
          .get("https://www.gutenberg.org/ebooks/37106");
  
        const fileContent = (await firstValueFrom(contentResponse)).data;
       // console.log(fileContent);
      } catch (error) {
        console.log(error);
      }

      return null;
    
  }
}

export default GutenbergRepository;