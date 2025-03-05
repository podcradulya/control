import React, { useEffect, useState } from "react"
import "./TodoItem.css"
import { TaskResponse } from '../../../models/response/TaskResponse.ts'
import TaskService from "../../../service/taskService.ts"
import UserService from "../../../service/UserService.ts"
import { taskStore, userStore } from "../../../main.tsx"
import { PriorityResponse } from "../../../models/response/PriorityResponse.ts"
import { StatusResponse } from "../../../models/response/StatusResponse.ts"
import { IUser } from "../../../models/IUser.ts"
import Button from "../../Button/Button.tsx"

interface EventsProps{
    todo: TaskResponse
}[]



const TodoItem: React.FC<EventsProps> = ({todo}) => {
  const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleEdit = async (task: TaskResponse) => {
    const number_tesiz = prompt('Введите новое название задачи:', task.number_tesiz);
    // const description = prompt('Введите новое описание задачи:', task.description);
    // if (title !== null && description !== null) {
    //     await fetch(`/api/tasks/${task.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ title, description, completed: task.completed }),
    //     });
    //     fetchTasks(); // Обновляем список задач
    // }
};

// Обработка удаления задачи
const handleDelete = async (taskId: number) => {  
    await fetch(`http://localhost:3300/api/task/${taskId}`, {
        method: 'DELETE',
    });
    TaskService.fetchTask()
};

  const openMenu = (task: TaskResponse) => {
    setSelectedTask(task);
    setShowMenu(true);
  };
  
  const closeMenu = () => {
    setShowMenu(false);
    setSelectedTask(null);
  };

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
    
    <div className="task__container">
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
            <Button text="▼" onClick={() => openMenu(todo)}/>
            
        </div>
        {showMenu && selectedTask && (
                <div className="task__menu">
                    <h3>Выберите действие для задачи: {selectedTask.number_tesiz}</h3>
                    <Button text="Редактировать" onClick={() => handleEdit(selectedTask)}/>
                    <Button text="Удалить" onClick={() => handleDelete(selectedTask.id)}/>
                    <Button text="Закрыть" onClick={closeMenu}/>
                </div>
            )}
        </div>
)}

export default TodoItem