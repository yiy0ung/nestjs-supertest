/**
 * @module api.spec.main.users
 */
import supertest from 'supertest';
import { Requester } from '../../../__internal';

import { UserResponseDto, IUser } from '../../../../structures/IMember';

/**
 * Example
 */
export async function getUser(
  connection: Requester.IConnection,
  params: getUser.Parameters,
): Promise<{
  resp: supertest.Response
  data: getUser.Response
}> {
  const resp = await Requester.request(
    connection,
    getUser.METHOD,
    getUser.PATH,
    params,
  )
  return { resp, data: resp.body }}
export namespace getUser {
  export type PathParams = {
    userId: number;
  };
  export type Parameters = {
    path: PathParams;
  };
  export type Response = UserResponseDto;

  export const METHOD = 'get' as const;
  export const PATH: string = '/main/users/:userId';
}

/**
 * 주석이 조금 다른 PUT 메소드 케이스 테스트.
 * Update Comment.
 * Lorem Ipsum is simply dummy text of the printing and typesetting industry.
 * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
 */
export async function updateUser(
  connection: Requester.IConnection,
  params: updateUser.Parameters,
): Promise<{
  resp: supertest.Response
  data: updateUser.Response
}> {
  const resp = await Requester.request(
    connection,
    updateUser.METHOD,
    updateUser.PATH,
    params,
  )
  return { resp, data: resp.body }}
export namespace updateUser {
  export type PathParams = {
    userId: string;
  };
  export type Query = IUser.UpdateDto;
  export type Body = { email: string; eeId: number };
  export type Parameters = {
    path: PathParams;
    query: Query;
    body: Body;
  };
  export type Response = UserResponseDto;

  export const METHOD = 'put' as const;
  export const PATH: string = '/main/users/:userId';
}
