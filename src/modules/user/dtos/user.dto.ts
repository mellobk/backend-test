/* eslint-disable @typescript-eslint/no-empty-interface */
import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleType } from '../../../constants';
import { BooleanFieldOptional } from '../../../decorators';
import { type UserEntity } from '../user.entity';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface UserDtoOptions {}

export class UserDto extends AbstractDto {
  @ApiProperty({ nullable: true })
  firstName?: string | null;

  @ApiProperty({ nullable: true })
  lastName?: string | null;

  @ApiProperty({ nullable: true })
  username!: string;

  @ApiProperty()
  role?: RoleType;

  @ApiProperty({ nullable: true })
  email?: string | null;

  @ApiProperty({ nullable: true })
  avatar?: string | null;

  @ApiProperty({ nullable: true })
  phone?: string | null;

  @BooleanFieldOptional()
  isActive?: boolean;

  constructor(user: UserEntity, _options?: UserDtoOptions) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.email = user.email;
    this.avatar = user.avatar;
    this.phone = user.phone;
  }
}
