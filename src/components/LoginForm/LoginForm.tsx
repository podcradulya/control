import React, { useContext } from "react";
import { Context } from "../../main";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTER, CALENDAR_ROUTER } from "../../utils/consts";
import AuthService from "../../service/AuthService";
import {observer} from "mobx-react-lite"


const LoginForm: React.FC = () => {
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [fatherName, setFathertName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const { store } = useContext(Context);



  return (
    <div>
      <input
        type="text"
        placeholder="введите фамилию"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <input
        type="text"
        placeholder="введите имя"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <input
        type="text"
        placeholder="введите отчество"
        onChange={(e) => setFathertName(e.target.value)}
        value={fatherName}
      />
      <input
        type="text"
        placeholder="введите пароль"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={() => {store.login(firstName, lastName, fatherName, password)}}>Логин</button>
    </div>
  );
};
export default observer(LoginForm);
