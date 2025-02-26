import $api from "../http/index";
import {AxiosResponse} from 'axios';
// import jwt_decode from "jwt-decode";
import {TaskResponse} from "../models/response/TaskResponse";
import {StatusResponse} from "../models/response/StatusResponse";
import { PriorityResponse } from "../models/response/PriorityResponse";



export default class TaskService {
    static async createTask(task: FormData): Promise<AxiosResponse<TaskResponse>> {
        const {data} = await $api.post('/task', task, {
            headers: {
                'Content-Type': 'application/json',
            }
    })
        return data
    }

    static fetchTask(): Promise<AxiosResponse<TaskResponse[]>>{
        return $api.get<TaskResponse[]>('/task')
    }

    static fetchStatus(): Promise<AxiosResponse<StatusResponse[]>>{
        return $api.get<StatusResponse[]>('/status')
    }
    static fetchPriority(): Promise<AxiosResponse<PriorityResponse[]>>{
        return $api.get<PriorityResponse[]>('/priority')
    }

}
