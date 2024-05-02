import { NotFoundException } from '@nestjs/common';

export class UserMovieNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.userMovieNotFound', error);
  }
}
