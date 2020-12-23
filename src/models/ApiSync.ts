import axios, { AxiosPromise } from 'axios';

import { HasId } from '../interfaces/';

/** generic class able to GET / POST data based on id */
export class ApiSync<T extends HasId> {
  rootURL: string;

  constructor(rootURL: string) {
    this.rootURL = rootURL;
  }

  fetch(id: number): AxiosPromise {
    console.log(`${this.rootURL}/${id}`);
    return axios.get(`${this.rootURL}/${id}`);
  };

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) return axios.put(`${this.rootURL}/${id}`, data);
    else return axios.post(this.rootURL, data);
  };
};