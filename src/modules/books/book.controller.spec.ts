import { Test, TestingModule } from '@nestjs/testing';
import { BookController as BookController } from './book.controller';
import { BookService as BookService } from './book.service';

describe('AppController', () => {
  let appController: BookController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    appController = app.get<BookController>(BookController);
  });

  it('renders root', () => {
    expect(appController.root()).toStrictEqual({ title: 'Home Page' });
  });

  it('renders /about', () => {
    expect(appController.about()).toStrictEqual({ title: 'About Page' });
  });
});
