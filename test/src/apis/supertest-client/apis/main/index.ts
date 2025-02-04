/**
 * @module api.spec.main
 */
import supertest from 'supertest';
import { Requester } from '../../__internal';

export * as users from './users';
export * as v1 from './v1';

export async function getHello(
  connection: Requester.IConnection,
  params: getHello.Parameters,
): Promise<{
  resp: supertest.Response
  data: getHello.Response
}> {
  const resp = await Requester.request(
    connection,
    getHello.METHOD,
    getHello.PATH,
    params,
  )
  return { resp, data: resp.body }}
export namespace getHello {
  export type Parameters = {}
  export type Response = string;

  export const METHOD = 'get' as const;
  export const PATH: string = '/main';
}

export async function getHello2(
  connection: Requester.IConnection,
  params: getHello2.Parameters,
): Promise<{
  resp: supertest.Response
  data: getHello2.Response
}> {
  const resp = await Requester.request(
    connection,
    getHello2.METHOD,
    getHello2.PATH,
    params,
  )
  return { resp, data: resp.body }}
export namespace getHello2 {
  export type Parameters = {}
  export type Response = string;

  export const METHOD = 'get' as const;
  export const PATH: string = '/main';
}

export async function getHello3(
  connection: Requester.IConnection,
  params: getHello3.Parameters,
): Promise<{
  resp: supertest.Response
  data: getHello3.Response
}> {
  const resp = await Requester.request(
    connection,
    getHello3.METHOD,
    getHello3.PATH,
    params,
  )
  return { resp, data: resp.body }}
export namespace getHello3 {
  export type Parameters = {}
  export type Response = string;

  export const METHOD = 'get' as const;
  export const PATH: string = '/main';
}
