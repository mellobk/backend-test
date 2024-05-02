/* eslint-disable import/no-duplicates */
import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { CommentEntity } from './../comment/comment.entity';
import { UserMovieEntity } from './../user-movie/user-movie.entity';
import { type IMovieDtoOptions } from './dtos/movie.dto';
import { MovieDto } from './dtos/movie.dto';

@Entity({ name: 'movies' })
@UseDto(MovieDto)
export class MovieEntity extends AbstractEntity<MovieDto, IMovieDtoOptions> {
  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  year?: string;

  @Column({ nullable: true })
  director?: string;

  @Column({ nullable: true })
  genres?: string;

  @Column({ nullable: true })
  cover?: string;

  @Column({ nullable: false })
  likes?: number;

  @Column({ nullable: false })
  disLikes?: number;

  @OneToMany(() => UserMovieEntity, (userMovies) => userMovies.movie)
  userMovies!: UserMovieEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments!: CommentEntity[];
}
