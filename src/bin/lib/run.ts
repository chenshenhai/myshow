import { ShowServer } from './server';

let server: ShowServer | null = null;

export function startServer(opts: {
  port: number,
  binModuleDir: string,
  projectDir: string,
}) {
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