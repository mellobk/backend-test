import { type IQuery, type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserMovieNotFoundException } from '../exceptions/user-movie-not-found.exception';
import { UserMovieEntity } from '../user-movie.entity';

export class GetUserMovieQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetUserMovieQuery)
export class GetUserMovieHandler implements IQueryHandler<GetUserMovieQuery> {
  constructor(
    @InjectRepository(UserMovieEntity)
    private userMovieEntityRepository: Repository<UserMovieEntity>,
  ) {}

  async execute(query: GetUserMovieQuery): Promise<UserMovieEntity> {
    const userMovieEntity = await this.userMovieEntityRepository.findOneBy({
      id: query.id,
    });

    if (!userMovieEntity) {
      throw new UserMovieNotFoundException();
    }

    return userMovieEntity;
  }
}
