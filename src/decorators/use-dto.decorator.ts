/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type AbstractEntity } from '../common/abstract.entity';
import { type AbstractDto } from '../common/dto/abstract.dto';
import { type Constructor } from '../types';

export function UseDto<T extends AbstractDto, E extends AbstractEntity<T>>(
  DtoClass: Constructor<T, [E]>,
): ClassDecorator {
  return function (constructor: Function) {
    constructor.prototype.dtoClass = DtoClass;
  };
}
