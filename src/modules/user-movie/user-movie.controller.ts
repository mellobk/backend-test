/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import { CreateUserMovieDto } from './dtos/create-user-movie.dto';
import { UpdateUserMovieDto } from './dtos/update-user-movie.dto';
import { type UserMovieDto } from './dtos/user-movie.dto';
import { UserMoviePageOptionsDto } from './dtos/user-movie-page-options.dto';
import { UserMovieService } from './user-movie.service';

@Controller('user-movies')
@ApiTags('user-movies')
export class UserMovieController {
  constructor(private userMovieService: UserMovieService) {}

  @Post()
  @ApiOperation({ summary: 'Create a usermovie' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createUserMovie(@Body() createUserMovieDto: CreateUserMovieDto) {
    const entity =
      await this.userMovieService.createUserMovie(createUserMovieDto);

    return entity.toDto();
  }

  @Post('create-user-movie')
  @ApiOperation({
    summary: 'Create a user movies to maintain likes dislikes favorite',
  })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createUserMovieUnique(@Body() createUserMovieDto: CreateUserMovieDto) {
    return this.userMovieService.createUserMovieUnique(createUserMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all user-movies with pagination' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllUserMovie(
    @Query() userMoviePageOptionsDto: UserMoviePageOptionsDto,
  ): Promise<PageDto<UserMovieDto>> {
    return this.userMovieService.getAllUserMovie(userMoviePageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific usermovie by ID' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleUserMovie(@UUIDParam('id') id: Uuid): Promise<UserMovieDto> {
    const entity = await this.userMovieService.getSingleUserMovie(id);

    return entity.toDto();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update usermovie details' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  updateUserMovie(
    @UUIDParam('id') id: Uuid,
    @Body() updateUserMovieDto: UpdateUserMovieDto,
  ): Promise<void> {
    return this.userMovieService.updateUserMovie(id, updateUserMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a usermovie' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteUserMovie(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.userMovieService.deleteUserMovie(id);
  }
}
