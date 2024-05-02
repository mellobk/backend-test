/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { type MovieEntity } from './../movie.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMovieDtoOptions {}

export class MovieDto extends AbstractDto {
  @ApiProperty({ nullable: true })
  title?: string | null;

  @ApiProperty({ nullable: true })
  year?: string | null;

  @ApiProperty({ nullable: true })
  genres?: string | null;

  @ApiProperty({ nullable: true })
  cover?: string | null;

  @ApiProperty({ nullable: true })
  likes?: number | null;

  @ApiProperty({ nullable: true })
  dis_likes?: number | null;

  constructor(movie: MovieEntity, _options?: IMovieDtoOptions) {
    super(movie);

    this.title = movie.title;
    this.year = movie.year;
    this.genres = movie.genres;
    this.cover = movie.cover;
    this.likes = movie.likes;
    this.dis_likes = movie.disLikes;
  }
}
