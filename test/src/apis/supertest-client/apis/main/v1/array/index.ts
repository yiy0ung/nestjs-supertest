/**
 * @module api.spec.main.v1.array
 */
import supertest from 'supertest';
import { Requester } from '../../../../__internal';

import { IPost, ApiResult, PostType, PostType2 } from '../../../../../structures/index';

/**
 * 동기 함수 테스트
 */
export async function getArrayData(
  connection: Requester.IConnection,
  params: getArrayData.Parameters,
): Promise<{
  resp: supertest.Response
  data: getArrayData.Response
}> {
  const resp = await Requester.request(
    connection,
    getArrayData.METHOD,
    getArrayData.PATH,
    params,
  )
  return { resp, data: resp.body }}
export namespace getArrayData {
  export type Parameters = {}
  export type Response = IPost.ISub.IArrayData;

  export const METHOD = 'GET' as const;
  export const PATH: string = '/main/v1/array';
}

/**
 * 제네릭 응답 + Enum
 */
export async function getGenericData1(
  connection: Requester.IConnection,
  params: getGenericData1.Parameters,
): Promise<{
  resp: supertest.Response
  data: getGenericData1.Response
}> {
  const resp = await Requester.request(
    connection,
    getGenericData1.METHOD,
    getGenericData1.PATH,
    params,
  )
  return { resp, data: resp.body }}
export namespace getGenericData1 {
  export type Parameters = {}
  export type Response = ApiResult<IPost.ISub.IGeneric<PostType>>;

  export const METHOD = 'GET' as const;
  export const PATH: string = '/main/v1/array';
}

/**
 * 제네릭 응답 + Enum 필드
 */
export async function getGenericData2(
  connection: Requester.IConnection,
  params: getGenericData2.Parameters,
): Promise<{
  resp: supertest.Response
  data: getGenericData2.Response
}> {
  const resp = await Requester.request(
    connection,
    getGenericData2.METHOD,
    getGenericData2.PATH,
    params,
  )
  return { resp, data: resp.body }}
export namespace getGenericData2 {
  export type Parameters = {}
  export type Response = ApiResult<IPost.ISub.IGeneric<PostType2.Normal>>;

  export const METHOD = 'GET' as const;
  export const PATH: string = '/main/v1/array';
}
