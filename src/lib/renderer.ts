import iDraw from 'idraw';
import { TypeData, TypeElement } from '@idraw/types';
import { TypeShowData } from './../types/index';

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

  drawPreview(showData: TypeShowData) {
    const idraw = this._idraw;
    const data: TypeData = { elements: [] }
    showData.background.elements.forEach((elem) => {
      data.elements.unshift(elem);
    });
    showData.slides.forEach((slide) => {
      const elem = {
        name: slide.name,
        x: slide.x,
        y: slide.y,
        w: 100,
        h: 100,
        angle: 0,
        type: 'text', 
        desc: {
          text: slide.name,
          color: "#f0f0f0",
          fontSize: 40,
          textAlign: 'center',
        },
      } as TypeElement<'text'>
      data.elements.unshift(elem);
    });
    console.log(data);
    idraw.setData(data);
  }

  private _drawBackground(data: any) {
    const idraw = this._idraw;
    idraw.setData({
      elements: data.background.elements
    });
  }
  
}

export default Renderer;