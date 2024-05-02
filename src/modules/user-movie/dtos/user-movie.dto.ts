import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { type UserMovieEntity } from '../user-movie.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserMovieDtoOptions {}

export class UserMovieDto extends AbstractDto {
  @ApiProperty()
  userId?: string | null;

  @ApiProperty()
  movieId?: string | null;

  @ApiProperty()
  favorite!: boolean;

  @ApiProperty()
  likes?: boolean;

  @ApiProperty()
  disLikes?: boolean;

  constructor(userMovie: UserMovieEntity, _options?: IUserMovieDtoOptions) {
    super(userMovie);
    this.disLikes = userMovie.disLikes || false;
    this.favorite = userMovie.favorite || false;
    this.likes = userMovie.likes || false;
    this.movieId = userMovie.movie.id;
    this.userId = userMovie.user.id;
  }
}
