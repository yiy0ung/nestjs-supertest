/**
 * @module api.spec.main.v1.array
 */
import { Requester } from '../../../../__internal';

import { IPost, ApiResult, PostType, PostType2 } from '../../../../../structures/index';

/**
 * 동기 함수 테스트
 */
export async function getArrayData(
  connection: Requester.IConnection,
  params: getArrayData.Parameters,
): Promise<getArrayData.Response> {
  return await Requester.request(
    connection,
    getArrayData.METHOD,
    getArrayData.PATH,
    params,
  )
}
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
): Promise<getGenericData1.Response> {
  return await Requester.request(
    connection,
    getGenericData1.METHOD,
    getGenericData1.PATH,
    params,
  )
}
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
): Promise<getGenericData2.Response> {
  return await Requester.request(
    connection,
    getGenericData2.METHOD,
    getGenericData2.PATH,
    params,
  )
}
export namespace getGenericData2 {
  export type Parameters = {}
  export type Response = ApiResult<IPost.ISub.IGeneric<PostType2.Normal>>;

  export const METHOD = 'GET' as const;
  export const PATH: string = '/main/v1/array';
}
