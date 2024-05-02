import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { MovieEntity } from './../movie/movie.entity';
import { UserEntity } from './../user/user.entity';
import { CommentDto, type ICommentDtoOptions } from './dtos/comment.dto';

@Entity({ name: 'comments' })
@UseDto(CommentDto)
export class CommentEntity extends AbstractEntity<
  CommentDto,
  ICommentDtoOptions
> {
  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn()
  user?: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.comments)
  @JoinColumn()
  movies?: MovieEntity;
}
