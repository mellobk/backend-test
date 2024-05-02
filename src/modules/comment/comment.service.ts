import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { type PageDto } from '../../common/dto/page.dto';
import { CreateCommentCommand } from './commands/create-comment.command';
import { CommentEntity } from './comment.entity';
import { type CommentDto } from './dtos/comment.dto';
import { type CommentPageOptionsDto } from './dtos/comment-page-options.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { type UpdateCommentDto } from './dtos/update-comment.dto';
import { CommentNotFoundException } from './exceptions/comment-not-found.exception';
import { GetCommentQuery } from './queries/get-comment.query';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Transactional()
  createComment(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return this.commandBus.execute<CreateCommentCommand, CommentEntity>(
      new CreateCommentCommand(createCommentDto),
    );
  }

  async getAllComment(
    commentPageOptionsDto: CommentPageOptionsDto,
  ): Promise<PageDto<CommentDto>> {
    const queryBuilder = this.commentRepository.createQueryBuilder('comment');
    const [items, pageMetaDto] = await queryBuilder.paginate(
      commentPageOptionsDto,
    );

    return items.toPageDto(pageMetaDto);
  }

  async getSingleComment(id: Uuid): Promise<CommentEntity> {
    return this.queryBus.execute<GetCommentQuery, CommentEntity>(
      new GetCommentQuery(id),
    );
  }

  async updateComment(
    id: Uuid,
    updateCommentDto: UpdateCommentDto,
  ): Promise<void> {
    const queryBuilder = this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id });

    const commentEntity = await queryBuilder.getOne();

    if (!commentEntity) {
      throw new CommentNotFoundException();
    }

    this.commentRepository.merge(commentEntity, updateCommentDto);

    await this.commentRepository.save(commentEntity);
  }

  async deleteComment(id: Uuid): Promise<void> {
    const deleteResult = await this.commentRepository.softDelete(id);

    if (deleteResult.affected === 0) {
      throw new CommentNotFoundException();
    }
  }
}
