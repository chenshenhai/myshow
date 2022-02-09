import iDraw from 'idraw';
import util from '@idraw/util';
import { TypeShowData, TypeShowLayout, TypeShowSlide } from '../../types/index';
import { TypeDataBase, TypeData, TypeElemType } from '@idraw/types';

type Options = {
  idraw: iDraw,
}

class Renderer {
  private _idraw: iDraw;
  private _elemForSlideMap: {
    [uuid: string]: {
      index: number,
      slide: TypeShowSlide
    }
  }

  constructor(opts: Options) {
    this._idraw = opts.idraw;
    this._elemForSlideMap = {}
  }

  clear() {
    const idraw = this._idraw;
    idraw.setData({
      elements: []
    });
  }

  draw() {
    // TODO
  }

  drawPreview(layout: TypeShowLayout, showData: TypeShowData) {
    const idraw = this._idraw;
    const idrawData: TypeData = this._createPreivewIDrawData(layout, showData);
    idraw.setData(idrawData);
    idraw.scale(layout.width / layout.contextWidth)
  }

  getSlideIndexByElementUUID(uuid: string): number | null {
    const item = this._elemForSlideMap[uuid];
    if (item && item.index >= 0) {
      return item.index;
    } else {
      return null;
    }
  }

  private _createPreivewIDrawData(layout: TypeShowLayout, showData: TypeShowData): TypeData {
    const idrawData: TypeData = { elements: [] };
    const elemForSlideMap: {
      [uuid: string]: {
        index: number,
        slide: TypeShowSlide
      }
    } = {}
    layout.background.elements.forEach((elem) => {
      idrawData.elements.push({...elem, ...{ uuid: util.uuid.createUUID()}});
    });

    for (let i = 0; i < layout.slots.length; i ++) {
      if (i >= showData.slides.length) {
        break;
      }
      const uuid = util.uuid.createUUID();
      const slot = layout.slots[i];
      const slide = showData.slides[i];
      const elem = {
        name: slide.name,
        uuid,
        x: slot.x,
        y: slot.y,
        w: 300, // TODO
        h: 100, // TODO
        angle: 0,
        type: 'text' as TypeElemType, 
        desc: {
          text: slide.name,
          color: "#f0f0f0",
          fontSize: 40,
          textAlign: 'center',
        },
      };
      // @ts-ignore
      idrawData.elements.push(elem);
      elemForSlideMap[uuid] = {
        index: i,
        slide,
      }
    }
    this._elemForSlideMap = elemForSlideMap;
    return idrawData;
  }

  private _drawBackground(data: any) {
    const idraw = this._idraw;
    idraw.setData({
      elements: data.background.elements
    });
  }
  
}

export default Renderer;