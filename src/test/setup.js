import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extender matchers de vitest con los de jest-dom
expect.extend(matchers);

// Limpiar el DOM después de cada prueba
afterEach(() => {
    cleanup();
});
