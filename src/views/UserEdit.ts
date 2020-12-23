import { View } from './View';
import { User } from '../models/User';
import { UserForm } from './UserForm';
import { UserShow } from './UserShow';
import { IUserProps } from '../interfaces';

export class UserEdit extends View<User, IUserProps> {

  regionsMap(): { [key: string]: string } {
    return {
      userShow: '.user-show',
      userForm: '.user-form'
    }
  }

  onRender(): void {
    //do the element nesting
    const userShow = new UserShow(this.regions.userShow, this.model);
    userShow.render();

    const userForm = new UserForm(this.regions.userForm, this.model);
    userForm.render();
  }

  /** template for rendering user details */
  template(): string {
    return `
    <div>
    <div class="user-show"></div>
    <div class="user-form"></div>
    </div>
    `
  }
}