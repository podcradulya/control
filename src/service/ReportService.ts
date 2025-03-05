import $api from "../http/index";
import {AxiosResponse} from 'axios';
import {ReportResponse} from "../models/response/ReportResponse";


export default class ReportService {
    // static async createResponse(report_data: FormData): Promise<AxiosResponse<ReportResponse>> {
    //     const {data} = await $api.post('/report', report_data, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    // })
    //     return data
    // }
    static createReport(): Promise<AxiosResponse<TaskResponse[]>>{
        return $api.get<TaskResponse[]>('/task')
    }
}
