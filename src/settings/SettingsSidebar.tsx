import { useAtom } from 'jotai/index';
import { selectedBlockAtom, settingsAtom } from '../atoms.ts';

import styles from './Settings.module.css';
import { BlockType, Settings } from '../types.ts';
import { useForm } from '@tanstack/react-form';
import { CSSProperties, useEffect } from 'react';

export function SettingsSidebar() {
  const [selectedBlock] = useAtom(selectedBlockAtom);
  const [settings, setSettings] = useAtom(settingsAtom);

  const form = useForm({
    defaultValues: selectedBlock
      ? settings[selectedBlock.id]
      : ({} as Settings),
    onSubmit: async ({ value }) => {
      setSettings({ key: selectedBlock!.id, settings: value });
    },
  });

  useEffect(() => {
    return () => {
      form.reset();
      form.mount();
    };
  }, [form, selectedBlock?.id]);

  if (!selectedBlock || Object.keys(settings[selectedBlock.id]).length === 0)
    return null;

  return (
    <div className={styles.overlay}>
      {selectedBlock.type === BlockType.CONTAINER && (
        <>
          <form.Field
            name="direction"
            children={(field) => (
              <label>
                Direction: <br />
                <select
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(
                      e.target.value as CSSProperties['flexDirection']
                    );
                    form.handleSubmit();
                  }}
                >
                  <option value="row">row</option>
                  <option value="column">column</option>
                </select>
              </label>
            )}
          />

          <br />
          <br />

          <form.Field
            name="gap"
            children={(field) => (
              <label>
                Gap: <br />
                <input
                  value={field.state.value}
                  onBlur={() => {
                    form.handleSubmit();
                  }}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </label>
            )}
          />
        </>
      )}
    </div>
  );
}
