import { AxiosResponse } from 'axios';
import { HasId, IModelAttributes, ISync, IEvents } from '../interfaces';

/** generic class */
/** @property: <attributes> store Model properties */
/** @property: <events> notify about changes in Model */
/** @property: <sync> save and retrieve the data to and from server */
export class Model<T extends HasId> {
  constructor(
    private attributes: IModelAttributes<T>,
    private events: IEvents,
    private sync: ISync<T>
  ) { }

  //on = this.events.on;
  get on() {
    return this.events.on;
  }

  //trigger = this.events.trigger;
  get trigger() {
    return this.events.trigger;
  }

  //get = this.attributes.get;
  get get() {
    return this.attributes.get;
  }

  set(update: T) {
    this.attributes.set(update);
    //trigger event to let a model instance know about updates
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') throw new Error('Cannot fetch without an id');
    this.sync.fetch(id)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      })
      .catch((err) => console.log(`something went wrong, see ${err}`));
  }

  //get all the props from attributes
  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch((): void => this.trigger('error'));
  }
}