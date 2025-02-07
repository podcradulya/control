import App from "./App";
import AddTaskPage from "./pages/AddTask/AddTaskPage";
import AuthPage from "./pages/Auth/AuthPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import Settings from "./pages/Settings/SettingsPage";
import { ADD_TASK_ROUTER, CALENDAR_ROUTER, CREATE_USER_ROUTER, LOGIN_ROUTER } from "./utils/consts";

export const adminRoutes = [
    {
      path: CREATE_USER_ROUTER,
      element: <Settings/>,
    }
  ]
  export const userRoutes = [
    {
      path: "",
      element: <AuthPage/>,
    },
    {
      path: LOGIN_ROUTER,
      element: <AuthPage/>,
    },
      {
        path: ADD_TASK_ROUTER,
        element: <AddTaskPage/>,
      },
      {
        path: CALENDAR_ROUTER,
        element: <CalendarPage/>,
      },
      
    ]