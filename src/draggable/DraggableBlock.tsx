import { BlockType } from '../types.ts';

import styles from './Draggable.module.css';
import { useDraggable } from '@dnd-kit/core';

type Props = {
  type: BlockType;
  isDragging?: boolean;
};

export function DraggableBlock({ type, isDragging }: Props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: type,
  });

  return (
    <>
      <div
        ref={setNodeRef}
        className={styles.draggable}
        {...listeners}
        {...attributes}
        style={isDragging ? { opacity: 0.7 } : {}}
      >
        {type}
      </div>
    </>
  );
}
