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
import { CommentService } from './comment.service';
import { type CommentDto } from './dtos/comment.dto';
import { CommentPageOptionsDto } from './dtos/comment-page-options.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a comment' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    const entity = await this.commentService.createComment(createCommentDto);

    return entity.toDto();
  }

  @Get()
  @ApiOperation({ summary: 'List all comments with pagination' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllComment(
    @Query() commentPageOptionsDto: CommentPageOptionsDto,
  ): Promise<PageDto<CommentDto>> {
    return this.commentService.getAllComment(commentPageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific comment by ID' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleComment(@UUIDParam('id') id: Uuid): Promise<CommentDto> {
    const entity = await this.commentService.getSingleComment(id);

    return entity.toDto();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update comment details' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  updateComment(
    @UUIDParam('id') id: Uuid,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<void> {
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteComment(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.commentService.deleteComment(id);
  }
}
