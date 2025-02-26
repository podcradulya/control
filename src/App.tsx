import { useContext, useEffect, useState } from 'react'
import "./assets/css/global.css"
import React from 'react'
import './App.css'
import './reset.css'
import './assets/fonts/font.css';
import Nav from "./components/Nav/Nav.tsx"
import {observer} from "mobx-react-lite"
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router";
import { ADD_TASK_ROUTER, CALENDAR_ROUTER, CREATE_USER_ROUTER, LOGIN_ROUTER } from "./utils/consts";
import CalendarPage from "./pages/Calendar/CalendarPage.tsx"
import AddTaskPage from "./pages/AddTask/AddTaskPage.tsx"
import SettingsPage from "./pages/Settings/SettingsPage.tsx"
import ReportPage from "./pages/ReportPage/ReportPage.tsx"
import { Outlet } from 'react-router-dom'
import AuthPage from './pages/Auth/AuthPage.tsx'
import { Context } from './main.tsx'


const App: React.FC = () => { 
  const {userStore} = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem("token")){
      userStore.checkAuth()
    }

  }, [])
  return (
    <div className='container__app'>
      {userStore.isAuth ? (
        <Router>
        <Nav></Nav>
        <Routes>
            <Route path="/" element={<AuthPage />} />
            {/* <Route path={LOGIN_ROUTER} element={<AuthPage />} /> */}
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/addtask" element={<AddTaskPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
      </Router>

      ) : (<AuthPage />)}
      

    </div>
  )
}

export default observer(App)
