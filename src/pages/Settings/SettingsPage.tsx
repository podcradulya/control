import { useState } from 'react'
import "../../assets/css/global.css"
import React from 'react'
import './Settings.css'
import { formateDate } from '../../utils/heplers/date/formateDate.ts'
import TodoList from "../../components/TodoList/TodoList.tsx"
import list_todo from "../../todo_list.ts"
import Button from "../../components/Button/Button.tsx"
import close_icon from "../../assets/images/icons/close.svg"
import Input from '../../components/Input/Input.tsx'
import Select from '../../components/Selects/StatusList/StatusList.tsx'



const Settings: React.FC = () => {

  
  return ( <>
    <div className='container' 
    style={{fontFamily: 'Nunito'}}>
      Settings
    </div>

    </>
  )
}

export default Settings
