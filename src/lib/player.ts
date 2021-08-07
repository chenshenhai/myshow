import iDraw from 'idraw';
import { TypeDataBase, TypeElemType } from '@idraw/types';
import { TypeShowData, TypeShowLayout } from './../types/index';
import { createAnimationAction } from './../util/animate';

type Options = {
  idraw: iDraw,
}

class Player {
  private _opts: Options;
  private _idraw: iDraw;
  private _status: 'busy' | 'free' = 'free';

  constructor(opts: Options) {
    this._opts = opts;
    this._idraw = opts.idraw;
  }

  play(index: number = 0, layout: TypeShowLayout, showData: TypeShowData) {
    if (this._status !== 'free') {
      return;
    }
    this._status = 'busy';
    const idraw = this._idraw;
    const slot = layout.slots[index];
    const slide = showData.slides[index];
    const scale = slot.w / layout.contextHeight;

    const startX = 0;
    const startY = 0;
    const endX = slot.x;
    const endY = slot.y;
    console.log('scale ===', scale);

    const action = createAnimationAction({
      time: 1000,
      interval: 20,
      onAction(index) {
        console.log('action =', index);
      },
      onComplete() {
        console.log('onComplete!');
      }
    });
    action.then(() => {
      console.log('action.then');
    }).catch(() => {
      console.log('action.catch');
    })
  }
}

export default Player;