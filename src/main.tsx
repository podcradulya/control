import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import UserStore from "./store/UserStore.ts";
import TaskStore from "./store/TaskStore.ts";


interface State {
  userStore: UserStore,
  taskStore: TaskStore
}

export const userStore = new UserStore();
export const taskStore = new TaskStore();


export const Context = createContext<State>({
  userStore,
  taskStore
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{
    taskStore,
    userStore,
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
