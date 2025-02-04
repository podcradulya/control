import React, { useContext, useEffect } from "react"
import TodoItem from "./TodoItem/TodoItem"
import "./TodoList.css"
import { TaskResponse } from '../../models/response/TaskResponse.ts'
import {Context} from "../../main"
import fetchTask from "../../service/taskService"



interface TodoList {
    selectedDate: Date,
    events: TaskResponse[];
  }


const TodoList: React.FC<TodoList> = ({ selectedDate, events}) =>{      
    // events.forEach((e)=>{
    //   console.log(`${new Date(e.datetimeon).toLocaleDateString("ru-RU", {year: 'numeric'})}.${new Date(e.datetimeon).getMonth() + 1}.${new Date(e.datetimeon).getDate()}` === `${selectedDate.toLocaleDateString("ru-RU", {year: 'numeric'})}.${selectedDate.getMonth()+1}.${selectedDate.getDate()}`)
    // })
    const tasksForDate = events.filter((e) => `${new Date(e.datetimeon).toLocaleDateString("ru-RU", {year: 'numeric'})}.${new Date(e.datetimeon).getMonth() + 1}.${new Date(e.datetimeon).getDate()}` === `${selectedDate.toLocaleDateString("ru-RU", {year: 'numeric'})}.${selectedDate.getMonth()+1}.${selectedDate.getDate()}` );
    
        return(<>
    <div className="tasks__list">{
        tasksForDate.length > 0 ? (
            tasksForDate.map((todo) => (<TodoItem todo={todo}/>))
          ) : (
            <p>Нет задач :)</p>
          )
        }
        </div>
        </>
      )
    }
export default TodoList