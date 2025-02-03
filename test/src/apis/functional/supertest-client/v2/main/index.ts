/**
 * @module api.spec.v2.main
 */
import { Requester } from '../../../__internal';

import { IUser, UserResponseDto } from '../../../../structures/IMember';

/**
 * alias-type 반환 테스트
 */
export async function getAliasUser(
  connection: Requester.IConnection,
  params: getAliasUser.Parameters,
): Promise<getAliasUser.Response> {
  return await Requester.request(
    connection,
    getAliasUser.METHOD,
    getAliasUser.PATH,
    params,
  )
}
export namespace getAliasUser {
  export type Parameters = {}
  export type Response = { name: string };

  export const METHOD = 'GET' as const;
  export const PATH: string = '/v2/main/alias-users';
}

/**
 * 유니온 타입 응답값 테스트
 */
export async function getUnionUser(
  connection: Requester.IConnection,
  params: getUnionUser.Parameters,
): Promise<getUnionUser.Response> {
  return await Requester.request(
    connection,
    getUnionUser.METHOD,
    getUnionUser.PATH,
    params,
  )
}
export namespace getUnionUser {
  export type Parameters = {}
  export type Response = IUser.IUnion1 | IUser.IUnion2;

  export const METHOD = 'GET' as const;
  export const PATH: string = '/v2/main/union-users';
}

/**
 * 유니온 타입 응답값 테스트
 */
export async function getIntersectionUser(
  connection: Requester.IConnection,
  params: getIntersectionUser.Parameters,
): Promise<getIntersectionUser.Response> {
  return await Requester.request(
    connection,
    getIntersectionUser.METHOD,
    getIntersectionUser.PATH,
    params,
  )
}
export namespace getIntersectionUser {
  export type Parameters = {}
  export type Response = IUser.IIntersection1 | IUser.IIntersection2;

  export const METHOD = 'POST' as const;
  export const PATH: string = '/v2/main/intersection-users';
}

/**
 * 일반적인 POST 메소드 케이스 테스트.
 * 
 * Create Comment.
 * 
 * Lorem Ipsum is simply dummy text of the printing and typesetting industry.
 * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
 */
export async function createUser(
  connection: Requester.IConnection,
  params: createUser.Parameters,
): Promise<createUser.Response> {
  return await Requester.request(
    connection,
    createUser.METHOD,
    createUser.PATH,
    params,
  )
}
export namespace createUser {
  export type Body = IUser.CreateDto;
  export type Parameters = {
    body: Body;
  };
  export type Response = UserResponseDto;

  export const METHOD = 'POST' as const;
  export const PATH: string = '/v2/main/users';
}
