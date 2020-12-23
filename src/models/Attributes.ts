export class Attributes<T> {
  private data: T;
  constructor(data: T) {
    this.data = data;
  }

  //generic constraints: K can be only one of the keys of T
  //limit the return types to the keys' types of our object => 
  //we get correct types without lots of typing: string | number | boolean...

  //need () => to have 'this' correctly working on 'user' (bound function)
  get = <K extends keyof T>(key: K): T[K] => { return this.data[key] };

  set(update: T): void { Object.assign(this.data, update) };

  getAll(): T { return this.data; }
};