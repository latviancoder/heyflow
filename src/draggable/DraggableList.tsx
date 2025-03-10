import { BlockType } from '../types.ts';
import { DraggableBlock } from './DraggableBlock.tsx';

import styles from './Draggable.module.css';

export function DraggableList() {
  return (
    <div className={styles.draggableBlocks}>
      {Object.keys(BlockType).map((blockType) => (
        <DraggableBlock key={blockType} type={blockType as BlockType} />
      ))}
    </div>
  );
}
