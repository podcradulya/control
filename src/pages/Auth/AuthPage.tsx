import "../../assets/css/global.css"
import React from 'react'
import './AuthPage.css'
import LoginForm from "../../components/LoginForm/LoginForm"
import { useLocation } from "react-router-dom"
import { LOGIN_ROUTER } from "../../utils/consts"
import AuthService from "../../service/AuthService"

const AuthPage: React.FC = () => {


  return ( <>
        <LoginForm />
    </>
  )
}

export default AuthPage
