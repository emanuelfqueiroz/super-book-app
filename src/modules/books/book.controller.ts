import { Controller, Get, NotFoundException, Param, Post, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { BookService } from './book.service';


@Controller()
export class BookController {
  
  constructor(
    private readonly service: BookService,
    
  ) {}

  @Get()
  @Render('home')
  root() {
    return { title: 'Home Page', books: [] };
  }

  @Get('/about')
  @Render('about')
  about() {
    return { title: 'About Page' };
  }
  @Get('/pricing')
  @Render('pricing')
  pricing() {
    return { title: 'Pricing Page' };
  }
  @Get('/book/:id')
  @Render('book')
  async getBook(@Param('id') id: string) {
    const book = await this.service.getBook(id);
    const bookContent = await this.service.getContent(id);
   
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return {book, bookContent};
  }

  @Get('/book/_partials/recent')
  async getRecentBooks(@Res() res: Response) {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const recentBooks = await this.service.getRecentBooks(5); // get last 5 books
    return res.render('partials/recent-books', {
      layout: false,
      books: recentBooks
    });
  }

  @Get('/book/_partials/analysis/:id')
  async getAnalysis(@Res() res: Response, @Param('id') id: string) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const analysis = await this.service.getAnalysis(id);
    return res.render('partials/books/analysis', {
      layout: false,
      analysis
    });
  }
}
