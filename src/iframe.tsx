import 'normalize.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Preview } from './preview/Preview.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preview />
  </StrictMode>
);
