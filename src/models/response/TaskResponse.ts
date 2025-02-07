import {ITask} from "../ITask"

export interface TaskResponse {
    id: number;
    numberOfTezis: string;
    statusID: string;
    datetimeon: Date;
    user_authorID: string;
    user_executorID: string;
    priorityID: string;   
}