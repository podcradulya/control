import React from "react"

const Panel = () => {
    const [inputValue, setInputValue] = React.useState('')
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
    }

    return(
    <div>
        <input type="text" value={inputValue} onChange={onChange} placeholder = "Введите текст"/>
        <select name="departament">
            <option value='department_all'>Все отделы</option>
            <option value='department_hr'>Отдел кадров</option>
            <option value='department_practice'>Отдел практики</option>
            <option value='department_methodologists'>Отдел методистов</option>
        </select>

    </div>
)
}
export default Panel