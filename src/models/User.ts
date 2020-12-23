import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';
import { Collection } from './Collection';
import { IUserProps } from '../interfaces';

const rootURL = 'http://localhost:3000/users';

/** creates a new user */
export class User extends Model<IUserProps> {
  static createUser(attrs: IUserProps): User {
    return new User(
      new Attributes<IUserProps>(attrs),
      new Eventing(),
      new ApiSync<IUserProps>(rootURL)
    )
  }

  /** creates a collection of users */
  static createUserCollection(): Collection<User, IUserProps> {
    return new Collection(
      rootURL,
      (json: IUserProps) => User.createUser(json)
    );
  }

  //helper method, example
  setRandomAge(): void {
    const age = Math.floor(Math.random() * 100);
    this.set({ age });
  }
};
