import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookConfig } from '../../config/book.config';
import { BookRepository } from './repositories/book.repository';
import { GutenbergRepository } from './repositories/gutenberg.repository';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [BookController],
  providers: [BookService, BookConfig, BookRepository, GutenbergRepository],
})
export class BookModule {}