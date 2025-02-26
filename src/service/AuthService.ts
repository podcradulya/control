import $api from "../http/index";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/login', {login, password, role: "ADMIN"})
    }

    static async create(firstName: string, lastName: string, fatherName: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/create', {firstName, lastName, fatherName, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

}