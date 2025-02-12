import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: './lib/test/setup.ts',
      coverage: {
        all: false,
        enabled: true,
      },
    },
  }),
);
