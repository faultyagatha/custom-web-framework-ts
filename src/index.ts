import { User } from './models/User';
import { Collection } from './models/Collection';
import { UserList } from './views/UserList';
import { IUserProps } from './interfaces';


const rootURL = 'http://localhost:3000/users';

const users = new Collection(rootURL, (json: IUserProps) => {
  return User.createUser(json);
});

users.on('change', () => {
  const root = document.getElementById('root');
  if (root) {
    new UserList(root, users).render();
  }
  console.log('changed');
});

console.log(users);



