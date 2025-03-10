import { useCallback, useEffect, useRef, useState } from 'react';
import { Block, BlockType, Settings } from '../types.ts';

import styles from './Preview.module.css';

export function Preview() {
  const previewRef = useRef<HTMLDivElement>(null);

  const [allBlocks, setBlocks] = useState<Block[]>([]);
  const [settings, setSettings] = useState<{ [key: string]: Settings }>({});

  const onMessage = useCallback((event: MessageEvent) => {
    setBlocks(event.data.blocks as Block[]);
    setSettings(event.data.settings as { [key: string]: Settings });
  }, []);

  useEffect(() => {
    window.addEventListener('message', onMessage, false);

    return () => window.removeEventListener('message', onMessage, false);
  }, [onMessage]);

  const renderBlocks = useCallback(
    (blocks: Block[]) => {
      const renderComponent = (
        type: BlockType,
        id: string,
        children?: Block[]
      ) => {
        console.log(id, settings[id]);
        switch (type) {
          case BlockType.BUTTON:
            return <button type="button">Button</button>;
          case BlockType.INPUT:
            return <input type="text" placeholder={`${id}..`} />;
          case BlockType.CONTAINER:
            return (
              <div
                data-id={id}
                className={styles.container}
                style={{
                  flexDirection: settings[id].direction,
                  alignItems: settings[id].alignItems,
                  gap: settings[id].gap,
                }}
              >
                {children ? renderBlocks(children) : null}
              </div>
            );
        }
      };

      return blocks.map(({ type, id, children }) => {
        return <div key={id}>{renderComponent(type, id, children)}</div>;
      });
    },
    [settings]
  );

  return (
    <div ref={previewRef} className={styles.preview}>
      {renderBlocks(allBlocks)}
    </div>
  );
}
