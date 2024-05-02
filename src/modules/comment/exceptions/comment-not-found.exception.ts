import { NotFoundException } from '@nestjs/common';

export class CommentNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.commentNotFound', error);
  }
}
