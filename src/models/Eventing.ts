import { Callback } from '../interfaces';

/** class that handles all events tied to a Model */
export class Eventing {
  events: { [key: string]: Callback[] } = {};

  //both member functions need to have bound 'this'
  //so that it works correctly on model
  //generic event handler
  on = (eventName: string, cb: Callback): void => {
    const handlers = this.events[eventName] || []; //deal with undefined case
    handlers.push(cb);
    this.events[eventName] = handlers;
  };

  /* runs callback functions registered by event handler */
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) return;
    handlers.forEach((cb) => cb());
  };
}