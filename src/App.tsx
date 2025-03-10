import 'normalize.css';

import styles from './App.module.css';
import { DroppableArea } from './droppable/DroppableArea.tsx';
import { DraggableList } from './draggable/DraggableList.tsx';
import { BlockType } from './types.ts';
import { useEffect, useRef } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { DraggableBlock } from './draggable/DraggableBlock.tsx';
import { useAtom } from 'jotai';
import {
  activeAtom,
  blocksAtom,
  droppedInAtom,
  selectedBlockAtom,
  settingsAtom,
} from './atoms.ts';
import { useOnDragEnd } from './useOnDragEnd.ts';
import { createPortal } from 'react-dom';
import { SettingsSidebar } from './settings/SettingsSidebar.tsx';

function App() {
  const previewRef = useRef<HTMLIFrameElement>(null);

  const [blocks] = useAtom(blocksAtom);
  const [settings] = useAtom(settingsAtom);
  const [active, setActive] = useAtom(activeAtom);
  const [selectedBlock, setSelectedBlock] = useAtom(selectedBlockAtom);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.contentWindow?.postMessage({
        blocks,
        settings,
      });
    }
  }, [blocks, settings]);

  const [droppedIn, setDroppedIn] = useAtom(droppedInAtom);

  const { onDragEnd } = useOnDragEnd();

  return (
    <div className={styles.container}>
      <DndContext
        onDragStart={(event) => {
          setSelectedBlock(undefined);
          setDroppedIn(null);
          setActive(event.active.id as BlockType);
        }}
        onDragEnd={onDragEnd}
      >
        <DraggableList />

        <div className={styles.droppableArea}>
          <DroppableArea />
        </div>

        <DragOverlay
          dropAnimation={droppedIn ? null : { sideEffects: () => {} }}
        >
          {active ? <DraggableBlock type={active} isDragging /> : null}
        </DragOverlay>
      </DndContext>
      <div className={styles.preview}>
        <iframe className={styles.iframe} src="/iframe.html" ref={previewRef} />
      </div>
      {selectedBlock && createPortal(<SettingsSidebar />, document.body)}
    </div>
  );
}

export default App;
