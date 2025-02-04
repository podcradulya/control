import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Store from "./store/store";


interface State {
  store: Store,
  taskStore: Store
}

export const store = new Store();
export const taskStore = new Store();


export const Context = createContext<State>({
  store,
  taskStore
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{
    store,
    taskStore
}}>
 <React.StrictMode>
    <App/>
  </React.StrictMode>
  </Context.Provider>,
 
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
