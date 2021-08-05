import { TypeData } from '@idraw/types';

export type TypeShowLayer = {
  showType: 'background' | 'slide'
  elements: TypeData['elements'],
}

export type TypeShowSlide = TypeShowLayer & {
  name: string;
  x: number,
  y: number,
}

export type TypeShowData = {
  width: number,
  height: number,
  contextWidth: number,
  contextHeight: number,
  devicePixelRatio: number,
  background: TypeShowLayer,
  slides: TypeShowSlide[]
}