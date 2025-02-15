import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BookController } from './modules/books/book.controller';
import { BookService } from './modules/books/book.service';
import { BookConfig } from './config/book.config';


import { ConfigModule } from '@nestjs/config';
import { BookModule } from './modules/books/book.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally
      envFilePath: '.env',
    }),
    BookModule,
  ],
  // controllers: [BookController],
  // providers: [BookService],
})
export class AppModule {}
