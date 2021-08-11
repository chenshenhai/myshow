import fs from 'fs';
import path from 'path';
import { removeFullDir, makeFullDir } from './file';

const staticCSSList: {
  dev: string,
  prod: string
}[] = [
  {
    dev: 'public/deps/antd.css',
    prod: 'public/deps/antd.min.css',
  }
]

const staticScriptList: {
  dev: string,
  prod: string
}[] = [
  {
    dev: 'public/deps/react.js',
    prod: 'public/deps/react.js',
  },
  {
    dev: 'public/deps/react-dom.js',
    prod: 'public/deps/react-dom.js',
  },
  {
    dev: 'public/deps/antd.js',
    prod: 'public/deps/antd.js',
  },
  {
    dev: 'public/deps/idraw.js',
    prod: 'public/deps/idraw.js',
  },
]

export function createStaticResource(opts: {
  mode: 'dev' | 'prod',
  resourceDir: string,
  targetDir: string,
}) {
  const { mode, resourceDir, targetDir } = opts;
  if (fs.existsSync(targetDir)) {
    removeFullDir(targetDir);
    makeFullDir(targetDir);
  }
  staticCSSList.forEach((css) => {
    const cssPath = css[mode];
    const cssFullPath = path.join(resourceDir, cssPath);
    const cssTargetPath = path.join(targetDir, cssPath);
    makeFullDir(path.dirname(cssTargetPath));
    const text = fs.readFileSync(cssFullPath, { encoding: 'utf8' });
    fs.writeFileSync(cssTargetPath, text);
  });
  staticScriptList.forEach((js) => {
    const jsPath = js[mode];
    const jsFullPath = path.join(resourceDir, jsPath);
    const jsTargetPath = path.join(targetDir, jsPath);
    makeFullDir(path.dirname(jsTargetPath));
    const text = fs.readFileSync(jsFullPath, { encoding: 'utf8' });
    fs.writeFileSync(jsTargetPath, text);
  });
  
  const htmlTargetPath = path.join(targetDir, 'index.html');
  fs.writeFileSync(htmlTargetPath, getIndexHTML(mode));
}


function getIndexHTML(mode: 'dev' | 'prod') {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${staticCSSList.map((c) => {
      return `<link rel="stylesheet" href="./${c[mode]}" />`;
    }).join('\r\n')}
  </head>
  <body>
    <div id="app">Loading...</div>
  </body>
  ${staticScriptList.map((s) => {
    return `<script src="./${s[mode]}"></script>`;
  }).join('\r\n')}
</html>
`;
  return html;
}