import iDraw from 'idraw';
import Renderer from './lib/renderer';
import { TypeMyShowOptions, TypeShowData, TypeShowLayout } from './types/index';


const _opts = Symbol('_opts');
const _data = Symbol('_data');
const _mount = Symbol('_mount');
const _hasInited = Symbol('_hasInited');
const _idraw = Symbol('_idraw');
const _renderer = Symbol('_renderer');
const _bindEvent = Symbol('_bindEvent');


export class MyShow {
  private [_data]: TypeShowData;
  private [_opts]: TypeMyShowOptions;
  private [_mount]: HTMLDivElement;
  private [_hasInited]: boolean = false;
  private [_idraw]: iDraw;
  private [_renderer]: Renderer;

  constructor(mount: HTMLDivElement, opts: TypeMyShowOptions) {
    this[_opts] = opts;
    this[_mount] = mount;
    this[_data] = {
      slides: []
    }
    const layout = this[_opts].layout;
    this[_idraw] = new iDraw(this[_mount], {
      width: layout.width,
      height: layout.height,
      contextWidth: layout.contextWidth,
      contextHeight: layout.contextHeight,
      devicePixelRatio: opts.devicePixelRatio,
      maxRecords: 1,
      // onlyRender: true,
    }, {
      // scrollWrapper: {
      //   use: true,
      // }
    });
    this[_renderer] = new Renderer({ idraw: this[_idraw] })
  }

  setData(data: TypeShowData) {
    this[_data] = data;
  }

  start() {
    if (this[_hasInited]) {
      return;
    }
    const data = this[_data];
    const layout = this[_opts].layout;
    this[_bindEvent]();
    this[_renderer].drawPreview(layout, data);
    this[_hasInited] = true;
  }

  private [_bindEvent]() {
    if (this[_hasInited] === true) return;
    const idraw = this[_idraw];
    idraw.on('changeData', (data) => {
      // console.log('data ====', data);
    })
  }
};