import * as Koa from 'koa';

export enum TypeServerStatus {
  HAS_INITED = 'hasInited',
  NULL = 'null'
}

export interface TypeShowServer {
  start: () => Promise<void>,
  getServerAppAsync: () => Promise<Koa>
}


export type TypeServerRequest = Koa.Request;

export type TypeServerOpts = {
  dev?: boolean,
  port: number;
  Show?: {
    distDir: string;
    srcDir?: string;
  }
  nextConfig?: any;
  apiHandler?: (request: TypeServerRequest) => Promise<TypeShowServerAPIResult>
}


export type TypeShowServerAPIResult = {
  success: boolean;
  code: string;
  data: any;
  message: string;
}