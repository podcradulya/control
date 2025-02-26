import {ITask} from "../ITask"

export interface TaskResponse {
    id: number;
    number_tesiz: string;
    status_id: number;
    datetimeon: Date;
    user_author_id: number;
    user_executor_id: number;
    priority_id: number;   
}