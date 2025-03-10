import { PropsWithChildren } from 'react';

import styles from './Wrapper.module.css';
import { Guide } from './Guide.tsx';
import { BlockType, GuideType } from '../types.ts';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { selectedBlockAtom } from '../atoms.ts';

export function Wrapper({
  children,
  id,
  hasChildren,
  hasParent,
  type,
}: PropsWithChildren<{
  id: string;
  type: BlockType;
  hasChildren?: boolean;
  hasParent?: boolean;
}>) {
  const [selectedBlock, setSelectedBlock] = useAtom(selectedBlockAtom);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedBlock({ id, type });
      }}
      className={classNames(styles.wrapper, {
        [styles.hasChildren]: hasChildren,
        [styles.hasParent]: hasParent,
        [styles.isSelected]: selectedBlock?.id === id,
      })}
    >
      <Guide type={GuideType.BETWEEN_BLOCKS} parentId={id} />
      <div
        className={classNames(styles.wrapperInner, {
          [styles.hasChildren]: hasChildren,
        })}
      >
        {children}
      </div>
      {type === BlockType.CONTAINER && (
        <Guide type={GuideType.FOOTER} parentId={id} />
      )}
    </div>
  );
}
