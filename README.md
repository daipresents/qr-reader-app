# 大丈夫な QR コード読み取りアプリ

このアプリはブラウザ上で動かしているだけなので、読み取った情報はどこにも送信しておりません。

## インストール

```bash
npm install
```

- ローカルで実行

```bash
npm run dev

> qr-reader-app@0.0.0 dev
> vite


  VITE v6.3.5  ready in 138 ms

  ➜  Local:   http://localhost:5173/qr-reader-app/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

- GitHub Pages にデプロイ https://daipresents.github.io/qr-reader-app/

```bash
npm run deploy
```

## プロンプトメモ

ChatGPT にお願いしたプロンプトメモ。

1. QR コード画像を読み込んで、コードに含まれている文字列を表示するアプリを作ってほしい。 技術スタックとしては、ローカルで簡単に動いてほしいので、Node, Typescript、React でおねがい。
2. 読み取り結果部分に表示される URL をコピーするボタンを右横につけてほしい
3. これだと読み取り結果が白文字でみえにくいので、赤い文字で表示にしてくれますか？
4. Github Pages に公開する方法を教えて下さい。

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
