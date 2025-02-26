import React, { useEffect } from "react"
import "./TodoItem.css"
import { TaskResponse } from '../../../models/response/TaskResponse.ts'
import TaskService from "../../../service/taskService.ts"
import UserService from "../../../service/UserService.ts"
import { taskStore, userStore } from "../../../main.tsx"
import { PriorityResponse } from "../../../models/response/PriorityResponse.ts"
import { StatusResponse } from "../../../models/response/StatusResponse.ts"
import { IUser } from "../../../models/IUser.ts"

interface EventsProps{
    todo: TaskResponse
}[]



const TodoItem: React.FC<EventsProps> = ({todo}) => {
    const date_task = new Date(todo.datetimeon).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    const time_task = new Date(todo.datetimeon).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, 
      });
      function getPriorityById(id: number, items: PriorityResponse[]) {
        const item = items.find(item => item.id === id);
        return item ? item.name : undefined; 
    }
      function getStatusById(id: number, items: StatusResponse[]) {
        const item = items.find(item => item.id === id);
        return item ? item.name : undefined; 
    }
      function getUserById(id: number, items: IUser[]) {
        const item = items.find(item => item.id === id);
        return item ? item.father_name : undefined; 
    }
    
       useEffect(() => {
                try{
                 TaskService.fetchStatus().then(response => taskStore.setStatus(response.data))
                 TaskService.fetchPriority().then(response => taskStore.setPriority(response.data))
                 UserService.fetchUsers().then(response => userStore.setUsers(response.data))                 
                }catch(error){
                  let errorMessage = "Failed to do something exceptional";
                  if (error instanceof Error) {
                      errorMessage = error.message;
                      }
                  console.log(errorMessage);
                }
      
              },[])
            
              const priority = getPriorityById(todo.priority_id, taskStore.priority)
              const status = getStatusById(todo.status_id, taskStore.status)
              const author = getUserById(todo.user_author_id, userStore.users)
              const executor = getUserById(todo.user_executor_id, userStore.users)
              

    return(
    <div className="task__item">
            <div className="task_date">
                <p>{date_task}</p>
                <div className="spliter"></div>
                <p>{time_task}</p>
                </div>
            <div className="spliter_vertical"></div>
            <div>№ {todo.number_tesiz}</div>
            <div className="task__status">
                    <div className={["status__indicator",
                        status === "В работе" ? "status__indicator_in_word" : "",
                        status === "Выполнено в срок" ? "status__indicator_success" : "",
                        status === "Просрочено" ? "status__indicator_overdue" : "",
                        status === "Выполнено с просрочкой" ? "status__indicator_success_with_delay" : "",
                        status === "Новая" ? "status__indicator_new" : ""].join(' ')}></div>
                     {`${status}`}
                </div>
            <div>{priority}</div>
            <div>{executor}</div>
            <button></button>
        </div>
)}

export default TodoItem