import { INestApplication } from '@nestjs/common';

type HeaderType = Record<string, any>;

export interface SupertestClientConnectionDefaults {
  app: INestApplication | string;
  header?: Record<string, any>;
  cookies?: Record<string, string>;
  validateStatus?: (status: number) => boolean;
}

export interface InternalRequestConfig {
  header: Map<string, any>;
}

export class RequesterConnection {
  private _app: INestApplication | string;
  private _header: HeaderType;
  private _cookies: Record<string, string>;

  public interceptors = {
    request: new InterceptorManager<InternalRequestConfig>(),
  };

  constructor(defaults: SupertestClientConnectionDefaults) {
    this._app = defaults.app;
    this._header = defaults.header ?? {};
    this._cookies = defaults.cookies ?? {};
  }

  public get app(): INestApplication | string {
    return this._app;
  }

  public get header(): HeaderType {
    return this._header;
  }

  public get cookies(): Record<string, string> {
    return this._cookies;
  }

  public async getRequestConfig(): Promise<InternalRequestConfig> {
    const header = new Map();
    Object.entries(this._header).forEach(([key, value]) => {
      header.set(key, value);
    });

    const config: InternalRequestConfig = {
      header: header,
    };
    for (const onFulfilled of this.interceptors.request.onFulfilledFunctions) {
      await onFulfilled(config);
    }

    return config;
  }
}

type OnFulfilled<Configs extends object> = (configs: Configs) => void | Promise<void>;

class InterceptorManager<Configs extends object> {
  private _onFulfilledFunctions: OnFulfilled<Configs>[] = [];

  public get onFulfilledFunctions() {
    return this._onFulfilledFunctions;
  }

  public use(onFulfilled: OnFulfilled<Configs>) {
    this._onFulfilledFunctions.push(onFulfilled);
  }
}
