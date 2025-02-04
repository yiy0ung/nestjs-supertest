import * as supertest from 'supertest';
import { SupertestClientConnectionDefaults, RequesterConnection } from './requester-connection';

export namespace Requester {
  export interface Parameters {
    path?: object;
    query?: object;
    body?: object;
  }

  export interface IConnection extends RequesterConnection {}

  export function create(defaults: SupertestClientConnectionDefaults): IConnection {
    return new RequesterConnection(defaults);
  }

  export async function request(
    connection: IConnection,
    method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    params: Parameters,
  ): Promise<supertest.Response> {
    if (params.path) {
      Object.entries(params.path).map(([field, value]) => {
        path = path.replace(`:${field}`, encodeURIComponent(value));
      });
    }
    if (params.query) {
      Object.keys(params.query).forEach((key) => {
        if (
          params.query![key as keyof typeof params.query] === undefined ||
          params.query![key as keyof typeof params.query] === null
        ) {
          delete params.query![key as keyof typeof params.query];
        }
      });
      path = `${path}?${new URLSearchParams(params.query as any).toString()}`;
    }

    const requestConfig = await connection.getRequestConfig();

    let test = supertest(connection.app.getHttpServer())[method](path);
    requestConfig.header.forEach((value, key) => {
      test = test.set(key, value);
    });
    if (params.body) {
      test = test.send(params.body);
    }
    const resp = await test;

    return resp;
  }
}
