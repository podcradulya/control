import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";
import axios, { AxiosResponse } from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../utils/consts";
import {jwtDecode} from "jwt-decode"
import { TaskResponse } from "../models/response/TaskResponse";


export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    users =  <IUser[]>[];
    selectedUser = {} as IUser;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setUsers(users: IUser[]) {
        this.users = users
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
  setSelectedUser(users: IUser) {
        this.selectedUser = users
    }

    async login(login: string, password: string) {
        try {
            const {data} = await AuthService.login(login, password);
            console.log(jwtDecode(data.token))
            localStorage.setItem('token', data.token);
            this.setAuth(true);
            this.setUser(data.user);
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
                }
            alert(errorMessage);
        }
    } 

    async create(firstName: string, lastName: string, fatherName: string, password: string) {
        try {
            const response = await AuthService.create(firstName, lastName, fatherName, password);
            console.log(response)
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
                }
            console.log(errorMessage);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
                }
            console.log(errorMessage);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}`)
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
                }
            console.log(errorMessage);
        } finally {
            this.setLoading(false);
        }
    }
}