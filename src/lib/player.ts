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

  playToSlide(index: number = 0, layout: TypeShowLayout, showData: TypeShowData) {
    if (this._status !== 'free') {
      return;
    }
    this._status = 'busy';
    const idraw = this._idraw;
    const slot = layout.slots[index];
    const slide = showData.slides[index];
    const scale = layout.contextHeight / slot.w;

    const interval = 16;
    const time = 800;
    const actionCount = Math.ceil(time / interval);
    const scaleUnit = (scale - 1) / actionCount;

    const startTop = 0;
    const startLeft = 0;
    const endTop = slot.y * scale;
    const endLeft = slot.x * scale;
    const actionTopUnit = (endTop - startTop) / actionCount;
    const actionLeftUnit = (endLeft - startLeft) / actionCount;

    const action = createAnimationAction({
      time,
      interval,
      onAction(index) {
        const actionScale = 1 + (scaleUnit * (index + 1));
        idraw.scale(actionScale);

        const actionTop = startTop + (actionTopUnit * (index + 1));
        idraw.scrollTop(actionTop);

        const actionLeft = startLeft + (actionLeftUnit * (index + 1));
        idraw.scrollLeft(actionLeft);
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