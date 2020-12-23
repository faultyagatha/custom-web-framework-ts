import { View } from './View';
import { User } from '../models/User';
import { IUserProps } from '../interfaces';

export class UserForm extends View<User, IUserProps> {

  /** map keys to the handlers */
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-model": this.onSaveClick,
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
    console.log('clicked');
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
    console.log('clicked');
  }

  onSaveClick = (): void => {
    this.model.save();
  }

  template(): string {
    return `
    <div>
    <input placeholder="${this.model.get("name")}"/>
    <button class="set-name">Set Name</button>
    <button class="set-age">Set Random Age</button>
    <button class="save-model">Save User</button>
    </div>
    `;
  }
}