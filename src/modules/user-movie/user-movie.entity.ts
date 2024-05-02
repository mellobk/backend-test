/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { MovieEntity } from './../movie/movie.entity';
import { UserEntity } from './../user/user.entity';
import { type IUserMovieDtoOptions, UserMovieDto } from './dtos/user-movie.dto';

@Entity({ name: 'user-movies' })
@UseDto(UserMovieDto)
export class UserMovieEntity extends AbstractEntity<
  UserMovieDto,
  IUserMovieDtoOptions
> {
  @ManyToOne(() => UserEntity, (user) => user.userMovies)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.userMovies)
  @JoinColumn({ name: 'movie_id' })
  movie!: MovieEntity;

  @Column({ default: false })
  likes!: boolean;

  @Column({ default: false })
  disLikes!: boolean;

  @Column({ default: false })
  favorite!: boolean;
}
