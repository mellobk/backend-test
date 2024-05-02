import { BooleanFieldOptional, StringField } from '../../../decorators';

export class CreateUserMovieDto {
  @StringField()
  userId!: string;

  @StringField()
  movieId!: string;

  @BooleanFieldOptional()
  disLikes!: boolean;

  @BooleanFieldOptional()
  likes!: boolean;

  @BooleanFieldOptional()
  favorite!: boolean;
}
