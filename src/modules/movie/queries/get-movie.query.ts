import { type IQuery, type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* import { MovieNotFoundException } from '../exceptions/movie-not-found.exception'; */
import { MovieEntity } from './../movie.entity';

export class GetMovieQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetMovieQuery)
export class GetMovieHandler implements IQueryHandler<GetMovieQuery> {
  constructor(
    @InjectRepository(MovieEntity)
    private movieEntityRepository: Repository<MovieEntity>,
  ) {}

  async execute(query: GetMovieQuery): Promise<MovieEntity | null> {
    const movieEntity = await this.movieEntityRepository.findOneBy({
      id: query.id,
    });

    return movieEntity || null;
  }
}
