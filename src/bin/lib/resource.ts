import fs from 'fs';
import path from 'path';
import { removeFullDir, makeFullDir } from './file';

const staticCSSList: { dev: string, prod: string }[] = [
  {
    dev: 'public/deps/antd.css',
    prod: 'public/deps/antd.min.css',
  }
]

const staticScriptList: { dev: string, prod: string }[] = [
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
];

const staticPageList:  { dev: string, prod: string }[] = [{
    dev: 'public/page/index.js',
    prod: 'public/page/index.js',
  },
  {
    dev: 'public/page/editor.js',
    prod: 'public/page/editor.js',
  },
  {
    dev: 'public/page/index.css',
    prod: 'public/page/index.css',
  },
  {
    dev: 'public/page/editor.css',
    prod: 'public/page/editor.css',
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
  staticPageList.forEach((page) => {
    const pagePath = page[mode];
    const pageFullPath = path.join(resourceDir, pagePath);
    const pageTargetPath = path.join(targetDir, pagePath);
    makeFullDir(path.dirname(pageTargetPath));
    const text = fs.readFileSync(pageFullPath, { encoding: 'utf8' });
    fs.writeFileSync(pageTargetPath, text);
  });
  
  const indexPageTargetPath = path.join(targetDir, 'index.html');
  fs.writeFileSync(indexPageTargetPath, getIndexHTML(mode));

  const eidtorPageTargetPath = path.join(targetDir, 'editor.html');
  fs.writeFileSync(eidtorPageTargetPath, getEditorHTML(mode));
}


function getIndexHTML(mode: 'dev' | 'prod') {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${staticCSSList.map((c) => {
      return `<link rel="stylesheet" href="./${c[mode]}" />`;
    }).join('\r\n')}
    <link rel="stylesheet" href="./public/page/index.css" />
  </head>
  <body>
    <div id="page">Loading...</div>
  </body>
  ${staticScriptList.map((s) => {
    return `<script src="./${s[mode]}"></script>`;
  }).join('\r\n')}
  <script src="./public/page/index.js"></script>
</html>
`;
  return html;
}

function getEditorHTML(mode: 'dev' | 'prod') {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${staticCSSList.map((c) => {
      return `<link rel="stylesheet" href="./${c[mode]}" />`;
    }).join('\r\n')}
    <link rel="stylesheet" href="./public/page/editor.css" />
  </head>
  <body>
    <div id="app">Loading...</div>
  </body>
  ${staticScriptList.map((s) => {
    return `<script src="./${s[mode]}"></script>`;
  }).join('\r\n')}
  <script src="./public/page/editor.js"></script>
</html>
`;
  return html;
}