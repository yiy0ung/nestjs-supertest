import { ITag } from './ITag';

export enum PostType {
  Normal = 'NORMAL',
  Notice = 'NOTICE',
}

export enum PostType2 {
  Normal = 'NORMAL',
  Notice = 'NOTICE',
}

export namespace IPost {
  export type IPostTag = ITag.ISummary;

  export interface IData {
    id: string;

    title: string;

    desc: string;
  }

  export namespace ISub {
    export interface IArrayData {
      data: number[];
    }

    export interface IGeneric<T> {
      data: T[];
    }
  }

  export type Tags = {
    [key: string]: string;
  };

  export class ListQueryDto {
    optionA!: number;

    optionB!: number;
  }
}
