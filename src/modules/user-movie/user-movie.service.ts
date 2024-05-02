/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { type PageDto } from '../../common/dto/page.dto';
import { CreateUserMovieCommand } from './commands/create-user-movie.command';
import { CreateUserMovieDto } from './dtos/create-user-movie.dto';
import { type UpdateUserMovieDto } from './dtos/update-user-movie.dto';
import { type UserMovieDto } from './dtos/user-movie.dto';
import { type UserMoviePageOptionsDto } from './dtos/user-movie-page-options.dto';
import { UserMovieNotFoundException } from './exceptions/user-movie-not-found.exception';
import { GetUserMovieQuery } from './queries/get-user-movie.query';
import { UserMovieEntity } from './user-movie.entity';

@Injectable()
export class UserMovieService {
  constructor(
    @InjectRepository(UserMovieEntity)
    private userMovieRepository: Repository<UserMovieEntity>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Transactional()
  createUserMovie(
    createUserMovieDto: CreateUserMovieDto,
  ): Promise<UserMovieEntity> {
    return this.commandBus.execute<CreateUserMovieCommand, UserMovieEntity>(
      new CreateUserMovieCommand(createUserMovieDto),
    );
  }

  async getAllUserMovie(
    userMoviePageOptionsDto: UserMoviePageOptionsDto,
  ): Promise<PageDto<UserMovieDto>> {
    const queryBuilder =
      this.userMovieRepository.createQueryBuilder('userMovie');
    const [items, pageMetaDto] = await queryBuilder.paginate(
      userMoviePageOptionsDto,
    );

    return items.toPageDto(pageMetaDto);
  }

  async getSingleUserMovie(id: Uuid): Promise<UserMovieEntity> {
    return this.queryBus.execute<GetUserMovieQuery, UserMovieEntity>(
      new GetUserMovieQuery(id),
    );
  }

  async updateUserMovie(
    id: Uuid,
    updateUserMovieDto: UpdateUserMovieDto,
  ): Promise<void> {
    const queryBuilder = this.userMovieRepository
      .createQueryBuilder('userMovie')
      .where('userMovie.id = :id', { id });

    const userMovieEntity = await queryBuilder.getOne();

    if (!userMovieEntity) {
      throw new UserMovieNotFoundException();
    }

    this.userMovieRepository.merge(userMovieEntity, updateUserMovieDto);

    await this.userMovieRepository.save(userMovieEntity);
  }

  async createUserMovieUnique(createUserMovieDto: any): Promise<void> {
    const { userId, movieId } = createUserMovieDto;
    const queryBuilder = this.userMovieRepository
      .createQueryBuilder('userMovie')
      .leftJoinAndSelect('userMovie.user', 'user')
      .leftJoinAndSelect('userMovie.movie', 'movie')
      .where('user.id = :userId', { userId })
      .andWhere('movie.id = :movieId', { movieId });

    const userMovieEntity = await queryBuilder.getOne();

    if (userMovieEntity) {
      this.userMovieRepository.merge(userMovieEntity, createUserMovieDto);

      await this.userMovieRepository.save(userMovieEntity);
    } else {
      void this.commandBus.execute<CreateUserMovieCommand, UserMovieEntity>(
        new CreateUserMovieCommand(createUserMovieDto),
      );
    }
  }

  async deleteUserMovie(id: Uuid): Promise<void> {
    const deleteResult = await this.userMovieRepository.softDelete(id);

    if (deleteResult.affected === 0) {
      throw new UserMovieNotFoundException();
    }
  }
}
