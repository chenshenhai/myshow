import { ShowServer } from './server';

let server: ShowServer | null = null;

export function startServer(opts: { port: number }) {
  const { port = 8080 } = opts
  server = new ShowServer({
    port,
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