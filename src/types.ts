import { CSSProperties } from 'react';

export enum BlockType {
  INPUT = 'INPUT',
  BUTTON = 'BUTTON',
  CONTAINER = 'CONTAINER',
}

export enum GuideType {
  FOOTER = 'FOOTER',
  BETWEEN_BLOCKS = 'BETWEEN_BLOCKS',
}

export type Block = {
  id: string;
  type: BlockType;
  children?: Block[];
};

export type Settings = {
  direction?: CSSProperties['flexDirection'];
  alignItems?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
};
