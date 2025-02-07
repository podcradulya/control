import React from "react"
import "./TodoItem.css"
import { TaskResponse } from '../../../models/response/TaskResponse.ts'

interface EventsProps{
    todo:TaskResponse
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
    
      const [statusTask, setStatusTask] = React.useState();
    return(
    <div className="task__item">
            <div className="task_date">
                <p>{date_task}</p>
                <div className="spliter"></div>
                <p>{time_task}</p>
                </div>
            <div className="spliter_vertical"></div>
            <div>№ {todo.numberOfTezis}</div>
            <div className="task__status">
                    <div className={["status__indicator",
                        todo.statusID === "В работе" ? "status__indicator_in_word" : "",
                        todo.statusID === "Выполнено в срок" ? "status__indicator_success" : "",
                        todo.statusID === "Просрочено" ? "status__indicator_overdue" : "",
                        todo.statusID === "Выполнено с просрочкой" ? "status__indicator_success_with_delay" : "",
                        todo.statusID === "Новая" ? "status__indicator_new" : ""].join(' ')}></div>
                    {todo.statusID}

                
                </div>
            <div>{todo.priorityID}</div>
            <div>{todo.user_executorID}</div>
            <button></button>
        </div>
)}

export default TodoItem