import iDraw from 'idraw';
import Renderer from './lib/renderer';

const _data = Symbol('_data');
const _mount = Symbol('_mount');
const _hasInited = Symbol('_hasInited');
const _idraw = Symbol('_idraw');
const _renderer = Symbol('_renderer');
const _bindEvent = Symbol('_bindEvent');

export class MyShow {
  private [_data]: any;
  private [_mount]: HTMLDivElement;
  private [_hasInited]: boolean = false;
  private [_idraw]: iDraw;
  private [_renderer]: Renderer

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
    });
    this[_renderer] = new Renderer({ idraw: this[_idraw] })
  }

  start() {
    if (this[_hasInited]) {
      return;
    }
    const data = this[_data];
    this[_bindEvent]();
    this[_renderer].draw(data);
    this[_hasInited] = true;
  }

  private [_bindEvent]() {
    if (this[_hasInited] === true) return;
  }
};