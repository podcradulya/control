import "../../assets/css/global.css"
import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { adminRoutes, userRoutes } from "../../routes"
import { LOGIN_ROUTER } from "../../utils/consts"




const AppRoutes: React.FC = () => {
    
    const isAuth = true

    return (
        <Routes>
         {isAuth && adminRoutes.map(({ path, element }) =>
            <Route key={path} path={path} element={element}  />
         )}
         {userRoutes.map(({ path, element }) =>
            <Route key={path} path={path} element={element}  />
         )}
         <Route path="*" element={<Navigate to={LOGIN_ROUTER} />}/>
      </Routes>
  )
}

export default AppRoutes
