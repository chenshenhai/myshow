import path from 'path';
import fs from 'fs';
import { Server } from 'net';
import Koa from 'koa';
import Router from '@koa/router';
import KoaStatic from 'koa-static';
import { TypeShowServer, TypeServerOpts, TypeServerStatus, } from './../types';

export class ShowServer implements TypeShowServer {

  private _opts: TypeServerOpts;
  private _serverApp: Koa;
  private _serverTarget: Server|null = null;
  private _status: TypeServerStatus;

  constructor(opts: TypeServerOpts) {
    this._status = TypeServerStatus.NULL;
    this._opts = opts;
    this._serverApp = new Koa();
  }

  start(): Promise<void> {
    const { port } = this._opts;
    return new Promise((resolve, reject) => {
      this._initAppAsync().then(() => {
        this._serverTarget = this._serverApp.listen(port, () => {
          // const pid: number = process.pid;
          resolve();
        })
      }).catch(reject);
    });
  }

  close() {
    if (this._serverTarget) {
      this._serverTarget.close();
    }
  }

  getServerAppAsync(): Promise<Koa> {
    return new Promise((resolve, reject) => {
      this._initAppAsync().then(() => {
        resolve(this._serverApp)
      }).catch(reject);
    })
  }

  private _initAppAsync(): Promise<void> {
    if (this._status === TypeServerStatus.HAS_INITED) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      this._initServerAsync().then(resolve).catch(reject);
    })
  }

  private _initServerAsync(): Promise<void> {
    if (this._status === TypeServerStatus.HAS_INITED) {
      return Promise.resolve();
    }
    const { projectDir, binModuleDir } = this._opts;
    const server = this._serverApp;
    // const apiHandler = this._opts.apiHandler;
    const distDir = path.join(projectDir, 'dist');

    return new Promise((resolve) => {
      const router = new Router();

      server.use(KoaStatic(path.join(distDir)))

      // router.get('*', async (ctx, next) => {
      //   const htmlPath = path.join(distDir, 'index.html');
      //   const html = fs.readFileSync(htmlPath);
      //   ctx.body = html;
      // })
      
      // router.get('/api/(.*)', async (ctx: Koa.Context, next: Koa.Next) => {
      //   if (typeof apiHandler === 'function') {
      //     ctx.body = await apiHandler(ctx.request);
      //   }
      //   await next();
      // });

      // router.get('/api/(.*)', async (ctx: Koa.Context, next: Koa.Next) => {
      //   if (typeof apiHandler === 'function') {
      //     ctx.body = await apiHandler(ctx.request);
      //   }
      //   await next();
      // });
    
      // server.use(async (ctx: Koa.Context, next: Koa.Next) => {
      //   const pagePath: string = ctx.path;
      //   if (pagePath && pagePath.startsWith('/page/')) {
      //     ctx.res.statusCode = 200;
      //   }
      //   await next()
      // })
    
      server.use(router.routes());

      this._status = TypeServerStatus.HAS_INITED;
      resolve();
    })
  }
}