import { ErrorMessages } from '../../../constants';
import {
  EmailField,
  IsStrongPassword,
  PhoneFieldOptional,
  StringField,
} from '../../../decorators';

export class UserRegisterDto {
  @IsStrongPassword({
    message: ErrorMessages.STRONG_PASSWORD,
  })
  readonly password!: string;

  @StringField()
  readonly firstName!: string;

  @StringField()
  readonly lastName!: string;

  @EmailField()
  readonly email!: string;

  @PhoneFieldOptional()
  phone?: string;
}
