import iDraw from 'idraw';
import { TypeShowData, TypeShowLayout } from './../types/index';
import { TypeDataBase, TypeElemType } from '@idraw/types';

type Options = {
  idraw: iDraw,
}

class Renderer {
  private _idraw: iDraw;

  constructor(opts: Options) {
    this._idraw = opts.idraw;
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
    const idrawData: TypeDataBase = { elements: [] };
    layout.background.elements.forEach((elem) => {
      idrawData.elements.push(elem);
    });

    for (let i = 0; i < layout.slots.length; i ++) {
      if (i >= showData.slides.length) {
        break;
      }
      const slot = layout.slots[i];
      const slide = showData.slides[i];
      const elem = {
        name: slide.name,
        x: slot.x,
        y: slot.y,
        w: 300,
        h: 100,
        angle: 0,
        type: 'text' as TypeElemType, 
        desc: {
          text: slide.name,
          color: "#f0f0f0",
          fontSize: 40,
          textAlign: 'center',
        },
      };
      idrawData.elements.push(elem);
    }
    idraw.setData(idrawData);
    idraw.scale(layout.width / layout.contextWidth)
  }

  private _drawBackground(data: any) {
    const idraw = this._idraw;
    idraw.setData({
      elements: data.background.elements
    });
  }
  
}

export default Renderer;