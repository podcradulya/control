import {TaskResponse} from "../models/response/TaskResponse";
import {makeAutoObservable} from "mobx";
import TaskService from "../service/taskService";
import { StatusResponse } from "../models/response/StatusResponse";
import { PriorityResponse } from "../models/response/PriorityResponse";

export default class TaskStore {
    task = {} as TaskResponse;
    status = {} as StatusResponse;
    priority = {} as PriorityResponse;
    page = 1;
    totalCount = 0;
    limit = 3;
    isLoading = false;
    
    constructor() {
        makeAutoObservable(this)
    }

    setStatus(status: StatusResponse) {
        this.status = status
    }

    setPriority(priority: PriorityResponse) {
        this.priority = priority
    }

    setTask(task: TaskResponse) {
        this.task = task
    }

    async login() {
        try {
            const {data} = await TaskService.fetchTask();
            console.log(data)
            // this.setTask(data);
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
                }
    }
}
    // async get totalCount() {
    //     return this.totalCount
    // }
    // async get page() {
    //     return this._page
    // }
    // async get limit() {
    //     return this._limit
    // }

    // setBrands(brands) {
    //     this._brands = brands
    // }
    // setDevices(devices) {
    //     this._devices = devices
    // }

    // setSelectedType(type) {
    //     this.setPage(1)
    //     this._selectedType = type
    // }
    // setSelectedBrand(brand) {
    //     this.setPage(1)
    //     this._selectedBrand = brand
    // }
    // setPage(page) {
    //     this._page = page
    // }
    // setTotalCount(count) {
    //     this._totalCount = count
    // }

    // get types() {
    //     return this._types
    // }
    // get brands() {
    //     return this._brands
    // }
    // get devices() {
    //     return this._devices
    // }
    // get selectedType() {
    //     return this._selectedType
    // }
    // get selectedBrand() {
    //     return this._selectedBrand
    // }
    // get totalCount() {
    //     return this._totalCount
    // }
    // get page() {
    //     return this._page
    // }
    // get limit() {
    //     return this._limit
    // }
}