import { AxiosPromise } from 'axios';

export type Callback = () => void;

/** generic constraint */
export interface HasId {
  id?: number
}

/** generic reusable interfaces */
export interface IModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

export interface ISync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export interface IEvents {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export interface IUserProps {
  id?: number,
  name?: string,
  age?: number
};