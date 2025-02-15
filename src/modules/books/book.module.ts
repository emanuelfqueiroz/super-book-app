import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookConfig } from '../../config/book.config';
import { GutenbergRepository } from './repositories/gutenberg.repository';
import { BookRepository } from './repositories/book.repository';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [BookController],
  providers: [
    BookService,
    BookConfig,
    GutenbergRepository,
    BookRepository
  ],
})
export class BookModule {}