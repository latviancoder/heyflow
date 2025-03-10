import { useCallback } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { v4 } from 'uuid';
import { Block, BlockType, GuideType } from './types.ts';
import { produce } from 'immer';
import { useAtom } from 'jotai/index';
import {
  activeAtom,
  blocksAtom,
  droppedInAtom,
  selectedBlockAtom,
  settingsAtom,
} from './atoms.ts';

export function useOnDragEnd() {
  const [, setDroppedIn] = useAtom(droppedInAtom);
  const [, setBlocks] = useAtom(blocksAtom);
  const [, setActive] = useAtom(activeAtom);
  const [, setSettings] = useAtom(settingsAtom);
  const [, setSelectedBlock] = useAtom(selectedBlockAtom);

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      if (!e.over) {
        setActive(undefined);
        return;
      }

      const uuid = v4();

      const guideType = e.over.data.current?.type as GuideType;
      const blockType = e.active.id as BlockType;
      const parentId = e.over.data.current?.parentId as string;

      function recursiveSpliceBetweenBlocks(blocks: Block[]) {
        const result = produce(blocks, (draft) => {
          const index = draft.findIndex(({ id }) => id === parentId);

          if (index !== -1) {
            draft.splice(index, 0, {
              id: uuid,
              type: blockType,
            });
          } else {
            draft.forEach((subBlock) => {
              if ('children' in subBlock) {
                subBlock.children = recursiveSpliceBetweenBlocks(
                  subBlock.children!
                );
              }
            });
          }
        });

        return result;
      }

      function recursiveAppend(blocks: Block[]) {
        const result = produce(blocks, (draft) => {
          const index = draft.findIndex(({ id }) => id === parentId);

          if (!parentId) {
            draft.push({
              id: uuid,
              type: blockType,
            });
          } else if (index !== -1) {
            draft[index].children = draft[index].children || [];
            draft[index].children.push({
              id: uuid,
              type: blockType,
            });
          } else {
            draft.forEach((subBlock) => {
              if ('children' in subBlock) {
                subBlock.children = recursiveAppend(subBlock.children!);
              }
            });
          }
        });

        return result;
      }

      if (guideType === GuideType.FOOTER) {
        setBlocks((prevBlocks) => recursiveAppend(prevBlocks));
      }

      if (guideType === GuideType.BETWEEN_BLOCKS) {
        setBlocks((prevBlocks) => recursiveSpliceBetweenBlocks(prevBlocks));
      }

      setDroppedIn(blockType);

      setActive(undefined);

      setSettings({
        settings:
          blockType === BlockType.CONTAINER
            ? {
                gap: '',
                direction: 'row',
                alignItems: 'flex-start',
              }
            : {},
        key: uuid,
      });

      setSelectedBlock({
        id: uuid,
        type: blockType,
      });
    },
    [setActive, setBlocks, setDroppedIn, setSelectedBlock, setSettings]
  );

  return { onDragEnd };
}
