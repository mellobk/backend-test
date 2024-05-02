import {
  CommandHandler,
  type ICommand,
  type ICommandHandler,
} from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from '../comment.entity';
import { type CreateCommentDto } from '../dtos/create-comment.dto';

export class CreateCommentCommand implements ICommand {
  constructor(public readonly createCommentDto: CreateCommentDto) {}
}

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements ICommandHandler<CreateCommentCommand, CommentEntity>
{
  constructor(
    @InjectRepository(CommentEntity)
    private commentEntityRepository: Repository<CommentEntity>,
  ) {}

  async execute(command: CreateCommentCommand) {
    const { createCommentDto } = command;
    const commentEntity = this.commentEntityRepository.create(createCommentDto);

    await this.commentEntityRepository.save(commentEntity);

    return commentEntity;
  }
}
