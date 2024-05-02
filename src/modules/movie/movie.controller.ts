/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { type PageDto } from '../../common/dto/page.dto';
import { Auth, UUIDParam } from '../../decorators';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { type MovieDto } from './dtos/movie.dto';
import { MoviePageOptionsDto } from './dtos/movie-page-options.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { MovieService } from './movie.service';

@Controller('movies')
@ApiTags('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post()
  @ApiOperation({ summary: 'Create a movie' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    const entity = await this.movieService.createMovie(createMovieDto);

    return entity.toDto();
  }

  @Get()
  @ApiOperation({ summary: 'List all movies with pagination' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllMovie(
    @Query() moviePageOptionsDto: MoviePageOptionsDto,
  ): Promise<PageDto<MovieDto>> {
    return this.movieService.getAllMovie(moviePageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific movie by ID' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleMovie(@UUIDParam('id') id: Uuid): Promise<MovieDto> {
    const entity = await this.movieService.getSingleMovie(id);

    return entity.toDto();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update movie details' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  updateMovie(
    @UUIDParam('id') id: Uuid,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<void> {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteMovie(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.movieService.deleteMovie(id);
  }
}
