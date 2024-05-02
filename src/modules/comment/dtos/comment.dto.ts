import { AbstractDto } from '../../../common/dto/abstract.dto';
import { type CommentEntity } from '../comment.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICommentDtoOptions {}

export class CommentDto extends AbstractDto {
  constructor(entityName: CommentEntity, _options?: ICommentDtoOptions) {
    super(entityName);
  }
}
