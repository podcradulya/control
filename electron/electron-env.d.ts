/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  electron: {
    fetchData: (url: string) => Promise<any>;
    fetchDataReq: (url: string, options: FetchOptions) => Promise<any>;
  };
  ipcRenderer: {
    on: (...args: Parameters<typeof import("electron").ipcRenderer.on>) => void;
    off: (...args: Parameters<typeof import("electron").ipcRenderer.off>) => void;
    send: (...args: Parameters<typeof import("electron").ipcRenderer.send>) => void;
    invoke: (...args: Parameters<typeof import("electron").ipcRenderer.invoke>) => Promise<any>;
  };
}
