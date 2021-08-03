import iDraw from 'idraw';

const _data = Symbol('_data');
const _mount = Symbol('_mount');
const _hasInited = Symbol('_hasInited');
const _idraw = Symbol('_idraw');

export class MyShow {
  private [_data]: any;
  private [_mount]: HTMLDivElement;
  private [_hasInited]: boolean = false;
  private [_idraw]: iDraw;

  constructor(data: any, mount: HTMLDivElement) {
    this[_data] = data;
    this[_mount] = mount;
    this[_idraw] = new iDraw(mount, {
      width: data.width,
      height: data.height,
      contextWidth: data.width,
      contextHeight: data.height,
      devicePixelRatio: 2,
    })
  }

  start() {
    if (this[_hasInited]) {
      return;
    }
    const idrawData = this[_data].idraw;
    this[_idraw].setData(idrawData);
    console.log('hello world')
    this[_hasInited] = true;
  }
};