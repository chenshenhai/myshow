import iDraw from 'idraw';
import util from '@idraw/util';
import { TypeDataBase, TypeElemType } from '@idraw/types';
import { TypeShowData, TypeShowLayout } from '../../types/index';
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

  playAction(opts: {
    startScale: number, endScale: number,
    startTop: number, endTop: number,
    startLeft: number, endLeft: number,
    interval: number,
    time: number,
  }): Promise<void> {
    if (this._status !== 'free') {
      return Promise.resolve();
    }
    this._status = 'busy';
    const idraw = this._idraw;
    const {
      startScale, endScale, startTop, endTop, startLeft, endLeft,
      interval, time,
    } = opts;
    
    const actionCount = Math.ceil(time / interval);
    const scaleUnit = (endScale - startScale) / actionCount;
    const actionTopUnit = (endTop - startTop) / actionCount;
    const actionLeftUnit = (endLeft - startLeft) / actionCount;

    const action = createAnimationAction({
      time,
      interval,
      onAction: (index) => {
        const actionScale = startScale + (scaleUnit * (index + 1));
        idraw.scale(actionScale);

        const actionTop = startTop + (actionTopUnit * (index + 1));
        idraw.scrollTop(actionTop);

        const actionLeft = startLeft + (actionLeftUnit * (index + 1));
        idraw.scrollLeft(actionLeft);
      },
      onComplete: () => {
        this._status = 'free';
      }
    });
    return action;
  }

  playToSlide(index: number = 0, layout: TypeShowLayout, showData: TypeShowData): Promise<void> {
    const slot = layout.slots[index];
    const endScale = layout.contextHeight / slot.w;
    return this.playAction({
      startScale: layout.width / layout.contextWidth,
      endScale: endScale,
      startTop: 0,
      endTop: slot.y * endScale,
      startLeft: 0,
      endLeft: slot.x * endScale,
      interval: 16,
      time: 800,
    })
  }

  playToStart(layout: TypeShowLayout) {
    const { scale, scrollTop, scrollLeft } = this._idraw.getScreenTransform();
    return this.playAction({
      startScale: scale,
      endScale: layout.width / layout.contextWidth,
      startTop: scrollTop,
      endTop: 0,
      startLeft: scrollLeft,
      endLeft: 0,
      interval: 16,
      time: 800,
    })
  }

  playAll(layout: TypeShowLayout, showData: TypeShowData) : Promise<void> {
    if (this._status !== 'free') {
      return Promise.resolve();
    }
    const middlewares = [];
    for (let i = 0; i < showData.slides.length; i ++) {
      middlewares.push(async (ctx: any, next: Function) => {
        await util.time.delay(1000); // TODO
        await this.playToSlide(i, layout, showData);
        await util.time.delay(2000); // TODO
        await this.playToStart(layout);
        await next();
      })
    }
    const task = util.time.compose(middlewares);
    return new Promise((resolve, reject) => {
      task({}).then(() => {
        resolve();
      }).catch((err: any) => {
        reject(err)
      });
    })
  }
}

export default Player;