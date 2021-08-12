import { TypeData, TypeDataBase } from '@idraw/types';

export type TypeShowContent = {
  elements: TypeData['elements'] | TypeDataBase['elements']
}

export type TypeShowSlot = {
  x: number,
  y: number,
  w: number,
  h: number
}

export type TypeShowLayout = {
  name: string,
  width: number;
  height: number;
  contextWidth: number;
  contextHeight: number;
  background: TypeShowContent,
  slots: TypeShowSlot[]
}

export type TypeShowSlide = {
  name: string,
  content: TypeShowContent,
  inlineLayout?: {
    slots: TypeShowSlot[]
  }
}

export type TypeShowData = {
  slides: TypeShowSlide[]
}