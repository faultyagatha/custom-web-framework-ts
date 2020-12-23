import { CollectionView } from './CollectionView';
import { User } from '../models/User';
import { UserShow } from './UserShow';
import { IUserProps } from '../interfaces';

export class UserList extends CollectionView<User, IUserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render();
  }
}