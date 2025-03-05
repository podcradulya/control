import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";import React from 'react'
import Button from '../Button/Button.tsx'
import settings from "../../assets/images/icons/settings_icon.svg"
import add_calendar from "../../assets/images/icons/add_calendar_icon.svg"
import calendar from "../../assets/images/icons/calendar_icon.svg"
import report from "../../assets/images/icons/report_icon.svg"
import static_icon from "../../assets//images/icons/static_icon.svg"
import help_icon from "../../assets//images/icons/help_icon.svg"
import "./Nav.css"


const Nav = () =>{
    const [selectedDirection, setSelectedDirection] = React.useState('hide');

    const onClickArrow = (direction: string) => {
        if (direction === 'show') {
            setSelectedDirection(() => direction = 'hide')
        }
        else if (direction === 'hide') {
            setSelectedDirection(() => direction = 'show')            
          }
    }
    return (
        <div style={{fontFamily: 'Nunito'}}>
                { selectedDirection === "show" && 
                 (<div className="nav--show">
                    <div className="nav__arrow"
                        onClick={()=>onClickArrow(selectedDirection)}>x</div>
                 <div className="nav__body">
                    <NavLink to="./calendar"><Button iconURL={calendar} text='Календарь'/></NavLink>
                    <NavLink to="./addtask"><Button iconURL={add_calendar} text='Новая задача'/></NavLink>
                    <NavLink to="./report"><Button iconURL={report} text='Мастер отчетов'/></NavLink>
                    <Button iconURL={static_icon} text='Статистика'/>
                    <NavLink to="./settings"><Button iconURL={settings} text='Настройки'/></NavLink>
                    <NavLink to="./login"><Button iconURL={help_icon} text='Помощь'/></NavLink>
                    </div>
                    </div>
                )
}
                { selectedDirection === "hide" && 
                 (<div className="nav--hide">
                    <div className="nav__arrow"
                        onClick={()=>onClickArrow(selectedDirection)}>❮</div>
                 <div className="nav__body">
                    <NavLink to="./calendar"><Button iconURL={calendar}/></NavLink>
                    <NavLink to="./addtask"><Button iconURL={add_calendar}/></NavLink>
                    <NavLink to="./report"><Button iconURL={report}/></NavLink>
                    <Button iconURL={static_icon}/>
                    <NavLink to="./settings"><Button iconURL={settings}/></NavLink>
                    <NavLink to="./login"><Button iconURL={help_icon}/></NavLink>
                    </div>
                    </div>)
            }        
        </div>
    )
}

export default Nav