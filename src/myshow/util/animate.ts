import util from '@idraw/util';


export function createAnimationAction(opts: {
  time: number, 
  interval: number,
  onAction: (index: number) => Promise<any>|any,
  onComplete?: () => void;
}): Promise<void> {
  const { time, interval, onAction, onComplete } = opts;
  const middlewares = [];
  const count = Math.ceil(time / interval);
  for (let i = 0; i < count; i ++) {
    middlewares.push(async (ctx: any, next: Function) => {
      await util.time.delay(interval);
      await onAction(i);
      await next();
    })
  }

  const task = util.time.compose(middlewares);
  return new Promise((resolve, reject) => {
    task({}).then(() => {
      if (typeof onComplete === 'function') {
        onComplete();
      }
      resolve();
    }).catch((err: any) => {
      if (typeof onComplete === 'function') {
        onComplete();
      }
      reject(err)
    });
  })
}