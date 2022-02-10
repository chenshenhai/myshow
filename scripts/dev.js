const path = require('path');
const { createServer, defineConfig } = require('vite');
const open = require('open');
const reactRefresh = require('@vitejs/plugin-react-refresh');
const { lessOptions } = require('./config');

dev();

async function dev() {
  const viteConfig = getViteConfig();
  const server = await createServer(viteConfig)
  await server.listen()
  server.printUrls();
  const { port, host = '127.0.0.1' } = server.config?.server || {}
  const targetPage = `http://${host}:${port}/index.html`;
  console.log(
    `Open: ` + targetPage
  );
  await open(targetPage);
}

function getViteConfig() {
  const viteConfig = defineConfig({
    configFile: false,
    root: resolve(),
    publicDir: resolve('examples'),
    // publicDir: resolve(),
    server: {
      port: 8080,
      host: '127.0.0.1',
    },
    plugins: [reactRefresh()],
    css: {
      preprocessorOptions: {
        less: lessOptions
      }
    },
    esbuild: {
      include: [
        /\.ts$/,
        /\.tsx$/,
        /\.js$/,
        /\.jsx$/,
      ],
      exclude: [
        /\.html$/
      ]
    },
  });
  return viteConfig;
}

function resolve(...args) {
  return path.join(__dirname, '..', ...args);
}