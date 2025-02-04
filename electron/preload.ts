import { ipcRenderer, contextBridge } from 'electron'

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}
// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("electron", {
  // fetchData: (url: string) => ipcRenderer.invoke("fetch-data", url),
  fetchDataReq: async (url: string, options: FetchOptions) => ipcRenderer.invoke("fetch-data", { url, options }),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})
