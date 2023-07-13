/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
//记得在env.d.ts配置包的
declare module 'monaco-editor';
declare module 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
declare module 'monaco-editor/esm/vs/basic-languages/sql/sql.js';
declare module 'monaco-editor/esm/vs/basic-languages/yaml/yaml.js';
declare module 'monaco-editor/esm/vs/language/json/json.worker?worker'
declare module 'monaco-editor/esm/vs/language/css/css.worker?worker'
declare module 'monaco-editor/esm/vs/language/html/html.worker?worker'
declare module 'monaco-editor/esm/vs/editor/editor.worker?worker'
declare module 'monaco-editor/esm/vs/basic-languages/javascript/javascript.js'

