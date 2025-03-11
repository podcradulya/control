import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTER, CALENDAR_ROUTER } from "../../utils/consts";
import AuthService from "../../service/AuthService";
import { observer } from "mobx-react-lite";
import "./TaskForm.css";
import Input from "../Input/Input";
import TaskService from "../../service/taskService.ts";
import { StatusResponse } from "../../models/response/StatusResponse.ts";
import Button from "../Button/Button.tsx";
import { PriorityResponse } from "../../models/response/PriorityResponse.ts";
import UserService from "../../service/UserService.ts";
import { IUser } from "../../models/IUser.ts";
import StatusList from "../../components/Selects/StatusList/StatusList.tsx"
import PriorityList from "../Selects/PriorityList/PriorityList.tsx";
import UsersList from "../Selects/UsersList/UsersList.tsx";

const TaskForm: React.FC = () => {
  const { taskStore } = useContext(Context);
  const { userStore } = useContext(Context);

  const [numberOfTezis, setNumberOfTezis] = React.useState<string>("");
  const [datetimeon, setDatetimeon] = React.useState<string>("");
  const [user_authorID, setUser_authorID] = React.useState<IUser[]>([]);
  const [user_executorID, setUser_executorID] =  React.useState<IUser[]>([]);
  const [priorityID, setPriorityID] = React.useState<string[]>([])
    
  const addTask = () => {
        const formData = new FormData()
        formData.append('number_tesiz', numberOfTezis)
        formData.append('datetimeon', `${datetimeon}`)
        formData.append('status_id', `${taskStore.selectedStatus.id}`)
        formData.append('priority_id', `${taskStore.selectedPriority.id}`)
        formData.append('user_executor_id', `${userStore.selectedUser.id}`)
        formData.append('user_author_id', `${userStore.user.id}`)
        console.log(formData);
        
        TaskService.createTask(formData).then(data => setNumberOfTezis(""))
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

  return (
    <>
    <div className="popup_content">
          <div className="sell__number sell">
            <p>Номер в Тезисе</p>
            <Input
              placeholder="Введите номер..."
              name="numberTesiz"
              onChange={(e) => setNumberOfTezis(e.target.value)}
              value={numberOfTezis}
            ></Input>
          </div>
          <div className="sell_dateon sell">
            <p className="sell_dateon__header">Срок исполнения</p>

            <div className="sell__time sell">
              <p>Дата</p>
              <input
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
                onChange={(e) => setDatetimeon(e.target.value)}
                value={datetimeon}/>
            </div>
          </div>
          <div className="sell__number sell">
            <p>Приоритетность</p>
            <PriorityList></PriorityList>
          </div>
          <div className="sell__number sell">
            <p>Статус</p>
            <StatusList></StatusList>

          </div>
          <div className="sell__number sell">
            <p>Исполнитель</p>
            <UsersList></UsersList>
          </div>
          <Input name="user_authorID" type="hidden"></Input>
          <Input name="dateTimeCreated" type="hidden"></Input>
          <Button text="Создать" onClick = {addTask}></Button>
        </div>
    </>
  );
};
export default observer(TaskForm);
