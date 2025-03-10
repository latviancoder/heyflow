import { useDroppable } from '@dnd-kit/core';
import { GuideType } from '../types.ts';
import classNames from 'classnames';

import styles from './Guide.module.css';
import { useAtom } from 'jotai/index';
import { activeAtom } from '../atoms.ts';

type Props = {
  type: GuideType;
  parentId?: string;
};

export function Guide({ type, parentId }: Props) {
  const [active] = useAtom(activeAtom);

  const { isOver, setNodeRef } = useDroppable({
    data: {
      type,
      parentId,
    },
    id: `${parentId}-${type}`,
  });

  if (!active) return null;

  return (
    <div
      className={classNames({
        [styles.footer]: type === GuideType.FOOTER,
        [styles.between]: type === GuideType.BETWEEN_BLOCKS,
        [styles.hasParent]: !!parentId,
        [styles.isOver]: isOver,
      })}
      ref={setNodeRef}
    ></div>
  );
}
