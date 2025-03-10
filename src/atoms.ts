import { atom } from 'jotai';
import { Block, BlockType, Settings } from './types.ts';
import { produce } from 'immer';

export const blocksAtom = atom<Block[]>([]);

export const activeAtom = atom<BlockType | null>();

export const droppedInAtom = atom<BlockType | null>();

export const selectedBlockAtom = atom<Pick<Block, 'type' | 'id'>>();

const internalSettingsAtom = atom<{ [key: string]: Settings }>({});

export const settingsAtom = atom(
  (get) => get(internalSettingsAtom),
  (get, set, payload: { key: string; settings: Settings }) => {
    set(
      internalSettingsAtom,
      produce(get(internalSettingsAtom), (draft) => {
        draft[payload.key] = payload.settings;
      })
    );
  }
);
