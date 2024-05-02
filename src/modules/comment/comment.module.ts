import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateCommentHandler } from './commands/create-comment.command';
import { CommentController } from './comment.controller';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';
import { GetCommentHandler } from './queries/get-comment.query';

export const handlers = [CreateCommentHandler, GetCommentHandler];

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService, ...handlers],
  controllers: [CommentController],
})
export class CommentModule {}
