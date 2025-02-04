import { createDate } from "./createDate.ts";
import { createMonth } from "./createMonth.ts";

interface CreateYearParams {
    year?: number;
    locale?: string
    monthNumber?: number
}

export const createYear = (params?: CreateYearParams) => {
    const locale = params?.locale ?? "default"
    
    const montCount = 12
    const today = createDate()

    const year = params?.year ?? today.year
    const monthNumber = params?.monthNumber ?? today.monthNumber

    const month = createMonth({date: new Date(year, monthNumber - 1), locale})

    const getMonthDays = (monthIndex: number) =>
        createMonth({date: new Date(year, monthIndex), locale}).createMonthDays()

    const createYearMonthes = () =>{
        const monthes = []


        for(let i=0; i <= montCount; i++)
            monthes[i] = getMonthDays(i)

        return monthes
        }


        return{
            createYearMonthes, 
            month,
            year
        }
    }
