/* eslint-disable canonical/no-unused-exports */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserMovieHandler } from './commands/create-user-movie.command';
import { GetUserMovieHandler } from './queries/get-user-movie.query';
import { UserMovieController } from './user-movie.controller';
import { UserMovieEntity } from './user-movie.entity';
import { UserMovieService } from './user-movie.service';

export const handlers = [CreateUserMovieHandler, GetUserMovieHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserMovieEntity])],
  providers: [UserMovieService, ...handlers],
  controllers: [UserMovieController],
})
export class UserMovieModule {}
