/**
 * @module api.spec.main
 */
import { Requester } from '../../__internal';

export * as users from './users';
export * as v1 from './v1';

export async function getHello(
  connection: Requester.IConnection,
  params: getHello.Parameters,
): Promise<getHello.Response> {
  return await Requester.request(
    connection,
    getHello.METHOD,
    getHello.PATH,
    params,
  )
}
export namespace getHello {
  export type Parameters = {}
  export type Response = string;

  export const METHOD = 'GET' as const;
  export const PATH: string = '/main';
}

export async function getHello2(
  connection: Requester.IConnection,
  params: getHello2.Parameters,
): Promise<getHello2.Response> {
  return await Requester.request(
    connection,
    getHello2.METHOD,
    getHello2.PATH,
    params,
  )
}
export namespace getHello2 {
  export type Parameters = {}
  export type Response = string;

  export const METHOD = 'GET' as const;
  export const PATH: string = '/main';
}

export async function getHello3(
  connection: Requester.IConnection,
  params: getHello3.Parameters,
): Promise<getHello3.Response> {
  return await Requester.request(
    connection,
    getHello3.METHOD,
    getHello3.PATH,
    params,
  )
}
export namespace getHello3 {
  export type Parameters = {}
  export type Response = string;

  export const METHOD = 'GET' as const;
  export const PATH: string = '/main';
}
