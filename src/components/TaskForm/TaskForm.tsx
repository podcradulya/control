import React, { useContext, useEffect } from "react";
import { Context } from "../../main";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTER, CALENDAR_ROUTER } from "../../utils/consts";
import AuthService from "../../service/AuthService";
import { observer } from "mobx-react-lite";
import "./TaskForm.css";
import Input from "../Input/Input";
import Select from '../../components/Select/Select.tsx'
import TaskService from "../../service/taskService.ts";
import { StatusResponse } from "../../models/response/StatusResponse.ts";
import Button from "../Button/Button.tsx";
import { PriorityResponse } from "../../models/response/PriorityResponse.ts";
import UserService from "../../service/UserService.ts";
import { IUser } from "../../models/IUser.ts";

const TaskForm: React.FC = () => {
  const [numberOfTezis, setNumberOfTezis] = React.useState<string>("");
  const [statusID, setStatusID] = React.useState<string[]>([])
  const [datetimeon, setDatetimeon] = React.useState<string>("");
  const [user_authorID, setUser_authorID] = React.useState<IUser[]>([]);
  const [user_executorID, setUser_executorID] =  React.useState<IUser[]>([]);
  const [priorityID, setPriorityID] = React.useState<PriorityResponse[]>([]);
    

  const { store } = useContext(Context);
        useEffect(() => {
          try{
           TaskService.fetchStatus().then(response => {
            const data = response.data
            let datalist: string[] = []
            data.forEach((data, index) =>{
              datalist.push(data.name) 
            })
            console.log("dd", datalist)
            setStatusID(datalist)})
            TaskService.fetchPriority().then(response => {
              const data = response.data
              console.log(data)
              setPriorityID(data)})
            // UserService.fetchUsers().then(response => {
            //     const data = response.data
            //     console.log(data)
            // setUser_executorID(data)})
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
            {/* <div className="sell__date sell">
              <p>Дата</p>
              <Input placeholder="Введите дату..."></Input>
            </div> */}
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
            <Input list="datalist_priority"
            // onChange={(e) => setPriorityID(e.target.value)}
            // value={priorityID} 
            />
            <datalist id="datalist_priority">
              {
               Object.entries(priorityID).map(([key, value]) => (
                  <option key={key}>{value.name}</option>
                ))
            }
            </datalist> 
            {/* <Select
              placeholder="Выберите приоритетность"
              name="priorityID"
              onChange={(e) => setPriorityID(e.target.value)}
              value={priorityID}
              list_option={[
                "Важно",
                "Срочно",
                "Не важно",
              ]}
            ></Select> */}
          </div>
          <div className="sell__number sell">
            <p>Статус</p>
            <input list="datalist_status"
             onChange={(e) => setStatusID(e.target.value)}
              value={statusID} 
              />
            <datalist id="datalist_status">
              {
               Object.entries(statusID).map(([key, value]) => (
                  <option key={key}>{value}</option>
                ))
            }
            </datalist> 
            {/* <Select
            placeholder="Выберите статус"
            name="statusID"
            onChange={(e) => setStatusID(e.target.value)}
            value={statusID}
              list_option={statusID}
            ></Select> */}
          </div>
          <div className="sell__number sell">
            <p>Исполнитель</p>
            <Input list="datalist_user_executorID"/>
            <datalist id="datalist_user_executorID">
              {
               Object.entries(user_executorID).map(([key, value]) => (
                  <option key={key}>{value.firstName} {value.fatherName} {value.lastName}</option>
                ))
            }
            </datalist> 
            {/* <Select
            placeholder="Выберите исполнителя"
            name="user_executorID"
            onChange={(e) => setUser_executorID(e.target.value)}
            value={user_executorID}
              list_option={["Зам Дира1", "Зам Дира2", "Зам Дира3"]}
            ></Select> */}
          </div>
          <Input name="user_authorID" type="hidden"></Input>
          <Input name="dateTimeCreated" type="hidden"></Input>
        <Button text="Создать"></Button>
        </div>
    </>
  );
};
export default observer(TaskForm);
