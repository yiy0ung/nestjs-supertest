/**
 * @module api.spec.v3.main.posts
 */
import supertest from 'supertest';
import { Requester } from '../../../../__internal';

import { IPost } from '../../../../../structures/IPost';
import { ApiResult } from '../../../../../structures/index';

/**
 * Query DTO 인터페이스 정의 없이 코드 분석만으로
 * Query-Parameter의 alias type을 정의 테스트
 */
export async function getPostList(
  connection: Requester.IConnection,
  params: getPostList.Parameters,
): Promise<{
  resp: supertest.Response
  data: getPostList.Response
}> {
  const resp = await Requester.request(
    connection,
    getPostList.METHOD,
    getPostList.PATH,
    params,
  )
  return { resp, data: resp.body }}
export namespace getPostList {
  export type Query = IPost.ListQueryDto &
    { option1: string } &
    {
      page: string;
      limit: string;
    };
  export type Parameters = {
    query: Query;
  };
  export type Response = ApiResult<Array<IPost.IData>>;

  export const METHOD = 'get' as const;
  export const PATH: string = '/v3/main/posts';
}

export async function getPost(
  connection: Requester.IConnection,
  params: getPost.Parameters,
): Promise<{
  resp: supertest.Response
  data: getPost.Response
}> {
  const resp = await Requester.request(
    connection,
    getPost.METHOD,
    getPost.PATH,
    params,
  )
  return { resp, data: resp.body }}
export namespace getPost {
  export type PathParams = {
    id: string;
  };
  export type Parameters = {
    path: PathParams;
  };
  export type Response = IPost.IData;

  export const METHOD = 'get' as const;
  export const PATH: string = '/v3/main/posts/:id';
}

/**
 * Alias 타입 유형 추론
 */
export async function getPostLinkedTags(
  connection: Requester.IConnection,
  params: getPostLinkedTags.Parameters,
): Promise<{
  resp: supertest.Response
  data: getPostLinkedTags.Response
}> {
  const resp = await Requester.request(
    connection,
    getPostLinkedTags.METHOD,
    getPostLinkedTags.PATH,
    params,
  )
  return { resp, data: resp.body }}
export namespace getPostLinkedTags {
  export type PathParams = {
    id: string;
  };
  export type Parameters = {
    path: PathParams;
  };
  export type Response = ApiResult<IPost.Tags>;

  export const METHOD = 'get' as const;
  export const PATH: string = '/v3/main/posts/:id/linked-tags';
}
