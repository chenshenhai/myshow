import path from 'path';
import { ShowServer } from './server';
import { createStaticResource } from './resource';

let server: ShowServer | null = null;


export function runDev(opts: { port: number, binModuleDir: string, projectDir: string}) {
  const { binModuleDir, projectDir } = opts;
  const targetDir = path.join(projectDir, 'dist');
  const resourceDir = path.join(binModuleDir, 'dist');
  createStaticResource({ mode: 'dev', targetDir, resourceDir })
  return startServer(opts);
}

export function startServer(opts: { port: number, binModuleDir: string, projectDir: string }) {
  const { port = 8080, binModuleDir, projectDir } = opts
  server = new ShowServer({
    port,
    binModuleDir,
    projectDir
  });
  server.start().then(() => {
    console.log(`Starting at http://127.0.0.1:${port}`);
  }).catch(console.log);
}

export function closeServer() {
  if (server) {
    server.close();
  }
}