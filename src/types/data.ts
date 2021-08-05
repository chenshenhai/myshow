import { TypeData } from '@idraw/types';

export type TypeShowLayer = {
  showType: 'background' | 'slide'
  elements: TypeData['elements'],
}

export type TypeShowData = {
  width: number,
  height: number,
  contextWidth: number,
  contextHeight: number,
  background: TypeShowLayer,
  slides: TypeShowLayer
}