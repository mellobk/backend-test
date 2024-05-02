import {
  CommandHandler,
  type ICommand,
  type ICommandHandler,
} from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { type CreateMovieDto } from '../dtos/create-movie.dto';
import { MovieEntity } from './../movie.entity';

export class CreateMovieCommand implements ICommand {
  constructor(public readonly createMovieDto: CreateMovieDto) {}
}

@CommandHandler(CreateMovieCommand)
export class CreateMovieHandler
  implements ICommandHandler<CreateMovieCommand, MovieEntity>
{
  constructor(
    @InjectRepository(MovieEntity)
    private movieEntityRepository: Repository<MovieEntity>,
  ) {}

  async execute(command: CreateMovieCommand) {
    const { createMovieDto } = command;
    const movieEntity = this.movieEntityRepository.create(createMovieDto);

    await this.movieEntityRepository.save(movieEntity);

    return movieEntity;
  }
}
