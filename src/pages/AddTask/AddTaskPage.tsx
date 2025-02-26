import { useContext, useEffect, useState } from 'react'
import "../../assets/css/global.css"
import React from 'react'
import './AddTaskPage.css'
import Calendar from '../../components/Calendar/Calendar.tsx'
import { formateDate } from '../../utils/heplers/date/formateDate.ts'
import TodoList from "../../components/TodoList/TodoList.tsx"
import list_todo from "../../todo_list.ts"
import Button from "../../components/Button/Button.tsx"
import TaskForm from "../../components/TaskForm/TaskForm.tsx"
import TaskService from '../../service/taskService.ts'
import { TaskResponse } from '../../models/response/TaskResponse.ts'
import close_icon from "../../assets/images/icons/close.svg"
import { Context } from '../../main.tsx'



const AddTaskPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const closePopup = () => setIsPopupOpen(false);   
  const BtnClick = () => setIsPopupOpen(true);
  
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  
  useEffect(() => {
    try{
     TaskService.fetchTask().then(response => {
      const data = response.data
      setTasks(data)
  })}
    catch(error){
      let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
            }
        console.log(errorMessage);
    }
}, [])


  return ( <>
    <div className='container' 
    style={{fontFamily: 'Nunito'}}>
      <div >
         <h1>Список задач</h1>
          <Button text='Новая задача' onClick = {BtnClick}></Button>
         <TodoList selectedDate={new Date()} events={tasks}></TodoList>
   
    </div>
    </div>
     {isPopupOpen && (
      <div className="popup" style={{ fontFamily: "Nunito" }}>
      <div className="popup_body" onClick={(e) => e.stopPropagation()}>
        <h1 className="popup_header">Создание новой задачи</h1>
        <img
          src={close_icon}
          alt="x"
          onClick={closePopup}
          className="popup_close"
        /><TaskForm />
        </div>
        </div>)}
    </>
  )
}

export default AddTaskPage
