import iDraw from 'idraw';
import { TypeShowData } from './../types/index';


type Options = {
  idraw: iDraw,
}

class Renderer {
  private _idraw: iDraw;

  constructor(opts: Options) {
    this._idraw = opts.idraw;
  }

  draw(data: TypeShowData) {
    this._drawBackground(data);
  }
  
  private _drawBackground(data: any) {
    const idraw = this._idraw;
    idraw.setData({
      elements: data.background.elements
    });
  }
  
}

export default Renderer;