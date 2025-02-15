import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BookConfig } from '../../../config/book.config';

import { Book } from '../interfaces/book.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GutenbergRepository {

  constructor(private readonly httpService: HttpService, private readonly config: BookConfig) { }


  private async fetchExternalData(url: string): Promise<string | null> {
    try {
      const response = await this.httpService.get(url);
      const d = (await firstValueFrom(response));
      return d.data;
    } catch (error) {
      console.log('Error fetching external data:', error);
      return null;
    }
  }
  async getBook(id: string) : Promise<Book | null> {
    const metaData = await this.fetchExternalData(this.config.bookSourceUrl + `/ebooks/${id}`);
    const book = this.extractMetadata(id, metaData);
    return book;
  }

  private extractMetadata(id: string, html: string): Book | null {
    try {
      
      const imageMatch = html.match(/id="cover-social-wrapper">\s*<div id="cover">\s*<img class="cover-art"\s*src="([^"]+)"/);
      
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const authorMatch = html.match(/by\s*<.*?>(.*?)<\/a>/);
      const descriptionMatch = html.match(/<div class="description">(.*?)<\/div>/);

      if (!titleMatch) return null;

      const title = titleMatch[1].replace(' by Project Gutenberg', '').trim();
      const author = authorMatch ? authorMatch[1].trim() : 'Unknown';
      const description = descriptionMatch 
        ? descriptionMatch[1].replace(/<[^>]*>/g, '').trim()
        : ' - ';
      const image = imageMatch ? imageMatch[1] : null;
      return {
        id,
        title,
        author,
        description,
        image
      };
    } catch (error) {
      console.error('Error parsing metadata:', error);
      return null;
    }
  }

  async getContent(id: string): Promise<string | null> {
    return await this.fetchExternalData(this.config.bookSourceUrl + `/files/${id}/${id}-0.txt`);
  }
}

export default GutenbergRepository;