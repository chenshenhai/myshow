import iDraw from 'idraw';
import Renderer from './lib/renderer';
import { TypeMyShowOptions, TypeShowData, TypeShowLayout } from './types/index';
import Player from './lib/player';

const _opts = Symbol('_opts');
const _showData = Symbol('_showData');
const _mount = Symbol('_mount');
const _hasInited = Symbol('_hasInited');
const _idraw = Symbol('_idraw');
const _renderer = Symbol('_renderer');
const _player = Symbol('_player');
const _bindEvent = Symbol('_bindEvent');


export class MyShow {
  private [_showData]: TypeShowData;
  private [_opts]: TypeMyShowOptions;
  private [_mount]: HTMLDivElement;
  private [_hasInited]: boolean = false;
  private [_idraw]: iDraw;
  private [_renderer]: Renderer;
  private [_player]: Player;

  constructor(mount: HTMLDivElement, opts: TypeMyShowOptions) {
    this[_opts] = opts;
    this[_mount] = mount;
    this[_showData] = {
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
      onlyRender: true,
    }, {
      // scrollWrapper: {
      //   use: true,
      // }
    });
    this[_renderer] = new Renderer({ idraw: this[_idraw] });
    this[_player] = new Player({ idraw: this[_idraw] })
  }

  setData(data: TypeShowData) {
    this[_showData] = data;
  }

  start() {
    if (this[_hasInited]) {
      return;
    }
    const data = this[_showData];
    const layout = this[_opts].layout;
    this[_bindEvent]();
    this[_renderer].drawPreview(layout, data);
    this[_hasInited] = true;
  }

  async playToSlide(index: number) {
    await this[_player].playToSlide(index, this[_opts].layout, this[_showData]);
  }

  async playToStart() {
    await this[_player].playToStart(this[_opts].layout);
  }


  private [_bindEvent]() {
    if (this[_hasInited] === true) return;
    const idraw = this[_idraw];
    idraw.on('changeData', (data) => {
      // console.log('data ====', data);
    })
  }
};