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
    this[_idraw] = new iDraw(this[_mount], {
      width: data.width,
      height: data.height,
      contextWidth: data.width,
      contextHeight: data.height,
      devicePixelRatio: 2,
      onlyRender: true,
    }, {
      // scrollWrapper: {
      //   use: true,
      // }
    })
  }

  start() {
    if (this[_hasInited]) {
      return;
    }
    this.drawBackground();
    console.log('hello world')
    this[_hasInited] = true;
  }

  drawBackground() {
    const data = this[_data];
    const idraw = this[_idraw];
    console.log('data ===', data);
    idraw.setData({
      elements: data.background.elements
    });
  }
};