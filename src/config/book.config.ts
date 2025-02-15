import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookConfig {
  public readonly apiKey: string;
  public readonly baseUrl: string;
  public readonly bookSourceUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY');
    this.baseUrl = this.configService.get<string>('BASE_URL');
    this.bookSourceUrl = this.configService.get<string>('BOOK_SOURCE_URL');
  }
}