import axios, { AxiosResponse } from 'axios';

import { Eventing } from './Eventing';

export class Collection<T, K> {
  constructor(
    public rootUrl: string,
    //generic function that turns json data into an instance of T
    public deserialise: (json: K) => T) { }

  models: T[] = [];
  events: Eventing = new Eventing();

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl)
      .then((response: AxiosResponse) => {
        response.data.forEach((element: K) => {
          this.models.push(this.deserialise(element));
        });
        this.trigger('change');
      })
  }
}