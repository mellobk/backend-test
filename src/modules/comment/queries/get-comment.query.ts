import { type IQuery, type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from '../comment.entity';
import { CommentNotFoundException } from '../exceptions/comment-not-found.exception';

export class GetCommentQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetCommentQuery)
export class GetCommentHandler implements IQueryHandler<GetCommentQuery> {
  constructor(
    @InjectRepository(CommentEntity)
    private commentEntityRepository: Repository<CommentEntity>,
  ) {}

  async execute(query: GetCommentQuery): Promise<CommentEntity> {
    const commentEntity = await this.commentEntityRepository.findOneBy({
      id: query.id,
    });

    if (!commentEntity) {
      throw new CommentNotFoundException();
    }

    return commentEntity;
  }
}
