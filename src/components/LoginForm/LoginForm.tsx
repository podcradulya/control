import React, { useContext } from "react";
import { Context } from "../../main";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTER, CALENDAR_ROUTER } from "../../utils/consts";
import AuthService from "../../service/AuthService";
import {observer} from "mobx-react-lite"
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./LoginForm.css"


const LoginForm: React.FC = () => {
  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  // const location = useLocation(); // используем хук useLocation для получения текущего маршрута
  // const navigate = useNavigate();
  console.log(location);
  
  // получаем маршрут, на который нужно перенаправить пользователя после авторизации
  // const from = location.state?.from?.pathname || '/calendar'; 

  const auth = () => {
    try{
      userStore.login(login, password)
    }
    catch(e){
      setPassword("")
    }
    
    // navigate(from, { replace: true })
  }

  const { userStore } = useContext(Context);



  return (
    <div className="loginForm">
      <Input
        type="text"
        placeholder="введите логин"
        onChange={(e) => setLogin(e.target.value)}
        value={login}
      />
      <Input
        type="text"
        placeholder="введите пароль"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
    <Button text="Вход" onClick = {auth}></Button>
      
    </div>
  );
};
export default observer(LoginForm);
