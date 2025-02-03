export interface IUser {
  id: number;

  name: string;

  shortBio: string;

  createdAt: Date;
}

export namespace IUser {
  export interface IUnion1 {
    a: number;

    b: number;
  }

  export interface IUnion2 {
    b: number;

    c: number;
  }

  export interface IIntersection1 {
    a: number;

    b: number;
  }

  export interface IIntersection2 {
    b: number;

    c: number;
  }

  export class CreateDto {
    name!: string;
  }

  export class UpdateDto {
    name!: string;

    shortBio!: string;
  }
}

export class UserResponseDto {
  id!: number;

  name!: string;
}
