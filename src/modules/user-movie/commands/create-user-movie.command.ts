import {
  CommandHandler,
  type ICommand,
  type ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { type CreateUserMovieDto } from '../dtos/create-user-movie.dto';
import { UserMovieEntity } from '../user-movie.entity';
import { type MovieEntity } from './../../movie/movie.entity';
import { GetMovieQuery } from './../../movie/queries/get-movie.query';
import { GetUserQuery } from './../../user/queries/get-user.query';
import { type UserEntity } from './../../user/user.entity';

export class CreateUserMovieCommand implements ICommand {
  constructor(public readonly createUserMovieDto: CreateUserMovieDto) {}
}

@CommandHandler(CreateUserMovieCommand)
export class CreateUserMovieHandler
  implements ICommandHandler<CreateUserMovieCommand, UserMovieEntity>
{
  constructor(
    @InjectRepository(UserMovieEntity)
    private userMovieEntityRepository: Repository<UserMovieEntity>,
    private queryBus: QueryBus,
  ) {}

  async execute(command: CreateUserMovieCommand) {
    const { createUserMovieDto } = command;

    const user = await this.queryBus.execute<GetUserQuery, UserEntity>(
      new GetUserQuery(createUserMovieDto.userId as Uuid),
    );

    const movie = await this.queryBus.execute<GetMovieQuery, MovieEntity>(
      new GetMovieQuery(createUserMovieDto.movieId as Uuid),
    );

    const userMovieEntity =
      this.userMovieEntityRepository.create(createUserMovieDto);

    userMovieEntity.movie = movie;
    userMovieEntity.user = user;
    await this.userMovieEntityRepository.save(userMovieEntity);

    return userMovieEntity;
  }
}
