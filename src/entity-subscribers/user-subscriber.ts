import {
  type EntitySubscriberInterface,
  EventSubscriber,
  type InsertEvent,
  type UpdateEvent,
} from 'typeorm';

import { generateHash } from '../common/utils';
import { UserEntity } from '../modules/user/user.entity';
import { ContextProvider } from './../providers/context.provider';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo(): typeof UserEntity {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>): void {
    if (event.entity.password) {
      event.entity.password = generateHash(event.entity.password);
    }

    const user = ContextProvider.getAuthUser();
    event.entity.createdBy = user ? user.id : 'Anonymous';
  }

  beforeUpdate(event: UpdateEvent<UserEntity>): void {
    // FIXME check event.databaseEntity.password
    const entity = event.entity as UserEntity;

    if (entity.password !== event.databaseEntity.password) {
      entity.password = generateHash(entity.password!);
    }
  }
}
