import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { DndContext } from '@dnd-kit/core';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DndContext>
      <App />
    </DndContext>
  </StrictMode>
);
