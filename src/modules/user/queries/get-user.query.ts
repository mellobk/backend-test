/* eslint-disable canonical/no-unused-exports */
import { type IQuery, type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../user.entity';
import { UserNotFoundException } from './../../../exceptions/user-not-found.exception';

export class GetUserQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async execute(query: GetUserQuery): Promise<UserEntity> {
    const userEntity = await this.userEntityRepository.findOneBy({
      id: query.id,
    });

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }
}
