import iDraw from 'idraw';
import { TypeData, TypeElemDesc } from '@idraw/types';
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
      data.elements.push(elem);
    });
    showData.slides.forEach((slide) => {
      const elem = {
        name: slide.name,
        uuid: '',
        x: slide.x,
        y: slide.y,
        w: 1000,
        h: 1000,
        angle: 0,
        type: 'text' as keyof TypeElemDesc, 
        desc: {
          text: slide.name,
          color: "#080e247a",
          fontSize: 40,
          textAlign: 'center',
        },
      }
      data.elements.push(elem);
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