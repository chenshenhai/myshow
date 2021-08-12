import iDraw from 'idraw';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import Renderer from './lib/renderer';
import { TypeMyShowOptions, TypeShowData, TypeShowLayout } from '../types/index';
import Player from './lib/player';
import { TempData } from './lib/temp';
import { _opts, _showData, _mount, _hasInited, _idraw, _renderer,
  _player, _bindEvent, _tempData,} from './names';


export default class MyShow {
  private [_showData]: TypeShowData;
  private [_opts]: TypeMyShowOptions;
  private [_mount]: HTMLDivElement;
  private [_hasInited]: boolean = false;
  private [_idraw]: iDraw;
  private [_renderer]: Renderer;
  private [_player]: Player;
  private [_tempData]: TempData;

  constructor(mount: HTMLDivElement, opts: TypeMyShowOptions) {
    this[_opts] = opts;
    this[_tempData] = new TempData();
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

  async play() {
    await this[_player].playAll(this[_opts].layout, this[_showData]);
  }

  private [_bindEvent]() {
    if (this[_hasInited] === true) return;
    const idraw = this[_idraw];
    idraw.on('screenClickElement', async (data: { uuid: string | null, index: number | null, element: TypeElement<keyof TypeElemDesc> }) => {
      if (data.uuid) {
        const index = this[_renderer].getSlideIndexByElementUUID(data.uuid);
        if (index !== null) {
          const activeIndex = this[_tempData].get('activeSlideIndex');
          if (activeIndex === null) {
            this.playToSlide(index);
            this[_tempData].set('activeSlideIndex', index);
          } else if (activeIndex === index) {
            this.playToStart();
            this[_tempData].set('activeSlideIndex', null);
          }
        }
      }
    })
  }
};