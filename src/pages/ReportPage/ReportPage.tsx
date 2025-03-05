import { useState } from 'react'
import "../../assets/css/global.css"
import React from 'react'
import './ReportPage.css'
import { formateDate } from '../../utils/heplers/date/formateDate.ts'
import TodoList from "../../components/TodoList/TodoList.tsx"
import list_todo from "../../todo_list.ts"
import Button from "../../components/Button/Button.tsx"
import close_icon from "../../assets/images/icons/close.svg"
import Input from '../../components/Input/Input.tsx'
import Select from '../../components/Selects/StatusList/StatusList.tsx'
import * as d3 from 'd3';


const ReportPage: React.FC = () => {

  const handleDownload = async () => {
    const response = await fetch('http://localhost:3300/api/report', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'task_report.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
    } else {
        console.error('Failed to download report');
    }
};

return (
    <Button text ={"Скачать отчет"} onClick={handleDownload}/>
);
}

export default ReportPage
