import $api from "../http/index";
import {AxiosResponse} from 'axios';
// import jwt_decode from "jwt-decode";
import {TaskResponse} from "../models/response/TaskResponse";
import {StatusResponse} from "../models/response/StatusResponse";



export default class TaskService {
    static async createTask(numberTesiz: string, statusID: string, datetimeon: string, user_executorID: string, priorityID: string): Promise<AxiosResponse<TaskResponse>> {
        return $api.post<TaskResponse>('/task', {numberTesiz, statusID, datetimeon, user_executorID, priorityID})
    }

    static fetchTask(): Promise<AxiosResponse<TaskResponse[]>>{
        return $api.get<TaskResponse[]>('/task')
    }

    static fetchStatus(): Promise<AxiosResponse<StatusResponse[]>>{
        return $api.get<StatusResponse[]>('/status')
    }

}
