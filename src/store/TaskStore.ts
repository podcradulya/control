import {TaskResponse} from "../models/response/TaskResponse";
import {makeAutoObservable} from "mobx";
import TaskService from "../service/taskService";
import { StatusResponse } from "../models/response/StatusResponse";
import { PriorityResponse } from "../models/response/PriorityResponse";

export default class TaskStore {
    task = {} as TaskResponse;
    status = <StatusResponse[]>[];
    priority = <PriorityResponse[]>[];
    selectedStatus = {} as StatusResponse;
    selectedPriority = {} as PriorityResponse;
    page = 1;
    totalCount = 0;
    limit = 3;
    isLoading = false;
    
    constructor() {
        makeAutoObservable(this)
    }

    setStatus(status: StatusResponse[]) {
        this.status = status
    }

    setPriority(priority: PriorityResponse[]) {
        this.priority = priority
    }

    setTask(task: TaskResponse) {
        this.task = task
    }


    setSelectedStatus(status: StatusResponse) {
        this.setPage(1)
        this.selectedStatus = status
    }
    setSelectedPriority(priority: PriorityResponse) {
        this.setPage(1)
        this.selectedPriority = priority
    }
    setPage(page:number) {
        this.page = page
    }
    setTotalCount(count:number) {
        this.totalCount = count
    }
    get getStatus() {
        return this.status
    }
    get getPriority() {
        return this.priority
    }
}