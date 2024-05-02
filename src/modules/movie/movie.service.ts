import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { type PageDto } from '../../common/dto/page.dto';
import { CreateMovieCommand } from './commands/create-movie.command';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { type MovieDto } from './dtos/movie.dto';
import { type MoviePageOptionsDto } from './dtos/movie-page-options.dto';
import { type UpdateMovieDto } from './dtos/update-movie.dto';
import { MovieNotFoundException } from './exceptions/movie-not-found.exception';
import { MovieEntity } from './movie.entity';
import { GetMovieQuery } from './queries/get-movie.query';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Transactional()
  createMovie(createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    return this.commandBus.execute<CreateMovieCommand, MovieEntity>(
      new CreateMovieCommand(createMovieDto),
    );
  }

  async getAllMovie(
    moviePageOptionsDto: MoviePageOptionsDto,
  ): Promise<PageDto<MovieDto>> {
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');
    const [items, pageMetaDto] =
      await queryBuilder.paginate(moviePageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getSingleMovie(id: Uuid): Promise<MovieEntity> {
    return this.queryBus.execute<GetMovieQuery, MovieEntity>(
      new GetMovieQuery(id),
    );
  }

  async updateMovie(id: Uuid, updateMovieDto: UpdateMovieDto): Promise<void> {
    const queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.id = :id', { id });

    const movieEntity = await queryBuilder.getOne();

    if (!movieEntity) {
      throw new MovieNotFoundException();
    }

    this.movieRepository.merge(movieEntity, updateMovieDto);

    await this.movieRepository.save(movieEntity);
  }

  async deleteMovie(id: Uuid): Promise<void> {
    const deleteResult = await this.movieRepository.softDelete(id);

    if (deleteResult.affected === 0) {
      throw new MovieNotFoundException();
    }
  }
}
