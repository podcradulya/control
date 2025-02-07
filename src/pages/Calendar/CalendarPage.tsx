import "../../assets/css/global.css"
import React, { useEffect, useState } from 'react'
import './CalendarPage.css'
import Calendar from '../../components/Calendar/Calendar.tsx'
import { formateDate } from '../../utils/heplers/date/formateDate.ts'
import TodoList from "../../components/TodoList/TodoList.tsx"
import list_todo from "../../todo_list.ts"
import axios from 'axios';
import { TaskResponse } from "../../models/response/TaskResponse.ts"
import TaskService from "../../service/taskService.ts"



const CalendarPage: React.FC = () => {
  const [selectedDate, selectDate] = React.useState(new Date())
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
    
      const [tasks, setTasks] = useState<TaskResponse[]>([])
      
      useEffect(() => {
        try{
         TaskService.fetchTask().then(response => {
          const data = response.data
          console.log(data)
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
  return(
    <div className='container__calendar' 
    style={{fontFamily: 'Nunito'}}>
      <div className="container__col1">
          {/* <Panel/> */}
        <div>{formateDate(selectedDate, "DD MM YYYY")}</div>
        <TodoList selectedDate={selectedDate} events={tasks}/>
      </div>
      <div className="container__col2">
        <Calendar selectedDate={selectedDate} selectDate={selectDate} events={tasks} type="standard"/>
      </div>
   
    </div>
  ) 
}

export default CalendarPage
