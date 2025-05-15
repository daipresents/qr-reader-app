import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: '[name].[ext]', // CSSや画像などのアセットを dist 直下に出力
        entryFileNames: '[name].js',   // エントリーポイントのJSファイル名
        chunkFileNames: '[name].js',   // チャンクファイルのJSファイル名
      },
    },
  },
});
