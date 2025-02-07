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

const TaskForm: React.FC = () => {
  const [numberOfTezis, setNumberOfTezis] = React.useState<string>("");
  const [statusID, setStatusID] = React.useState<StatusResponse[]>([])
  const [datetimeon, setDatetimeon] = React.useState<string>("");
  const [user_authorID, setUser_authorID] = React.useState<string>("");
  const [user_executorID, setUser_executorID] = React.useState<string>("");
  const [priorityID, setPriorityID] = React.useState<PriorityResponse[]>([]);
    

  const { store } = useContext(Context);

    // async function getStatus() {
    //       try{
    //         const response = await TaskService.fetchStatus()
    //         const data = response.data
    //         console.log(data)
    //         setStatusID(data)
    //       }catch(error){
    //         let errorMessage = "Failed to do something exceptional";
    //           if (error instanceof Error) {
    //               errorMessage = error.message;
    //               }
    //           console.log(errorMessage);
    //       }
    //     }
        useEffect(() => {
          try{
           TaskService.fetchStatus().then(response => {
            const data = response.data
            console.log(data)
            setStatusID(data)})
            TaskService.fetchPriority().then(response => {
              const datap = response.data
              console.log(datap)
              setPriorityID(datap)})
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
            <div className="sell__date sell">
              <p>Дата</p>
              <Input placeholder="Введите дату..."></Input>
            </div>
            <div className="sell__time sell">
              <p>Время</p>
              <input
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
              />
            </div>
          </div>
          <div className="sell__number sell">
            <p>Приоритетность</p>
            <input  className="select" list="datalist"/>
            <datalist id="datalist">
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
            <input  className="select" list="datalist"/>
            <datalist id="datalist">
              {
               Object.entries(statusID).map(([key, value]) => (
                  <option key={key}>{value.name}</option>
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
            <Select
            placeholder="Выберите исполнителя"
            name="user_executorID"
            onChange={(e) => setUser_executorID(e.target.value)}
            value={user_executorID}
              list_option={["Зам Дира1", "Зам Дира2", "Зам Дира3"]}
            ></Select>
          </div>
          <Input name="user_authorID" type="hidden"></Input>
          <Input name="dateTimeCreated" type="hidden"></Input>
        <Button text="Создать"></Button>
    </>
  );
};
export default observer(TaskForm);
