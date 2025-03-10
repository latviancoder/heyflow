import styles from './DroppableArea.module.css';
import { Block, GuideType } from '../types.ts';
import { Guide } from './Guide.tsx';
import { Wrapper } from './Wrapper.tsx';
import { useAtom } from 'jotai/index';
import { blocksAtom } from '../atoms.ts';

export function DroppableArea() {
  const [blocks] = useAtom(blocksAtom);

  const renderBlocks = (blocks: Block[], hasParent = false) => {
    return blocks.map(({ id, type, children }) => (
      <Wrapper
        key={id}
        id={id}
        type={type}
        hasChildren={!!children}
        hasParent={hasParent}
      >
        {type} {id}
        {children ? renderBlocks(children, true) : null}
      </Wrapper>
    ));
  };

  return (
    <div className={styles.droppableArea}>
      {renderBlocks(blocks)}
      <Guide type={GuideType.FOOTER} />
    </div>
  );
}
