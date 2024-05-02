// eslint-disable-next-line simple-import-sort/imports
import { MovieEntity } from './movie.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateMovieHandler } from './commands/create-movie.command';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

import { GetMovieHandler } from './queries/get-movie.query';

export const handlers = [CreateMovieHandler, GetMovieHandler];

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [MovieService, ...handlers],
  controllers: [MovieController],
})
export class MovieModule {}
