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
  dev?: boolean, // TODO
  port: number;
  binModuleDir: string,
  projectDir: string,
  // apiHandler?: (request: TypeServerRequest) => Promise<TypeShowServerAPIResult>
}


// export type TypeShowServerAPIResult = {
//   success: boolean;
//   code: string;
//   data: any;
//   message: string;
// }