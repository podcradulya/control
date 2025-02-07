import "../../assets/css/global.css"
import './Calendar.css'
import React from "react"
import {useCalendar} from "./useCalendar.ts"
import { checkIsToday } from "../../utils/heplers/date/checkIsToday.ts";
import { checkDateIsEqual } from "../../utils/heplers/date/checkDateIsEqual.ts";


interface Event {
  id: number;
  numberOfTezis: string;
  statusID: string;
  datetimeon: Date;
  user_authorID: string;
  user_executorID: string;
  priorityID: string;   
}[]


interface CalendarProps{
  locale?: string,
  selectedDate: Date,
  firstWeekDay?: number,
  selectDate: (date: Date) => void;
  events: Event[];
  type: "picker" | "standard";   
} 

const Calendar:React.FC<CalendarProps> = ({firstWeekDay = 2, locale = 'default',
   selectDate,
   selectedDate,
   events,
  type
  }) => {
  const {state, functions} = useCalendar({firstWeekDay, locale, selectedDate})


  const eventDates = new Set(events.map((e) =>`${new Date(e.datetimeon).toLocaleDateString("ru-RU", {year: 'numeric'})}.${new Date(e.datetimeon).getMonth()}.${new Date(e.datetimeon).getDate()}` ));

  return <div className='calendar'>
    <div className="calendar_header">
      <div className="arrow_prev"
            onClick={()=> functions.onClickArrow("left")}></div>
      {state.mode === "days" && (
        <div onClick={()=>functions.setMode('monthes')}>
          {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedMonth.year}
        </div>
      )}
      {state.mode === "monthes" && (
          <div onClick={()=>functions.setMode('years')}>
          {state.selectedYear}
        </div>
      )}
      {state.mode === "years" && (
        <div onClick={()=>functions.setMode('days')}>
          {state.selectedYearInterval[0]} - {' '}
          {state.selectedYearInterval[state.selectedYearInterval.length-1]}
        </div>
      )}
      <div className="arrow_next"
                  onClick={()=> functions.onClickArrow("right")}></div>
    </div>

    <div className="calendar__body">
      {state.mode === "days" && (
        <>
        <div className="calendar__week__names">
          {state.weekDaysNames.map((weekDaysName) => (
            <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
          ))}
        </div>

        {type === "picker" && (
          <div className="calendar__days">
          {state.calendarDays.map(day => {
            const isToday = checkIsToday(day.date)
            const isSelectedDay =  checkDateIsEqual(day.date, state.selectedDate.date)
            const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex
            
            const daystring = `${day.year}.${day.monthIndex+1}.${day.dayNumber}`
            const hasEvent = eventDates.has(daystring);
            return (
              <div
                key={`${day.dayNumber}-${day.monthIndex}`}
                aria-hidden
                onClick={() => {
                  functions.setselectedDate(day);
                  selectDate(day.date);
                }}
                className={[
                  'calendar__day',
                  isToday ? 'calendar__today__day' : '',
                  isSelectedDay ? 'calendar__selected__day' : '',
                  isAdditionalDay ? 'calendar__additional__day' : ''
                ].join(' ')}
                style={{
                  width: "30px",
                  height: "30px",
                  padding: "0",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px"
                }}
              >
                {day.dayNumber} 
              </div>
            );
          })}
            </div>
        )}

{type === "standard" && (
          <div className="calendar__days">
          {state.calendarDays.map(day => {
            const isToday = checkIsToday(day.date)
            const isSelectedDay =  checkDateIsEqual(day.date, state.selectedDate.date)
            const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex
            
            const daystring = `${day.year}.${day.monthIndex+1}.${day.dayNumber}`
            const hasEvent = eventDates.has(daystring);
            return (
              <div
                key={`${day.dayNumber}-${day.monthIndex}`}
                aria-hidden
                onClick={() => {
                  functions.setselectedDate(day);
                  selectDate(day.date);
                }}
                className={[
                  'calendar__day',
                  isToday ? 'calendar__today__day' : '',
                  isSelectedDay ? 'calendar__selected__day' : '',
                  isAdditionalDay ? 'calendar__additional__day' : ''
                ].join(' ')}
              >

                <div className="calendar_day_number">
                {day.dayNumber}
                </div>
                {hasEvent && (
                <div className = "calendar_day_hasTask"></div>
              )}
                
              </div>
            );
          })}
            </div>
        )}

        </>
      )}


      {state.mode === "monthes" && (
        <div className='calendar__pick__items__container'>
        {state.monthesNames.map((monthesName) => {
          const isCurrentMonth =
            new Date().getMonth() === monthesName.monthIndex &&
            state.selectedYear === new Date().getFullYear();
          const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

          return (
            <div
              key={monthesName.month}
              aria-hidden
              onClick={() => {
                functions.setSelectedMonthByIndex(monthesName.monthIndex);
                functions.setMode('days');
              }}
              className={[
                'calendar__pick__item',
                isSelectedMonth ? 'calendar__selected__item' : '',
                isCurrentMonth ? 'calendar__today__item' : ''
              ].join(' ')}
            >
              {monthesName.monthShort}
            </div>
          );
        })}
      </div>
      )}

{state.mode === 'years' && (
          <div className='calendar__pick__items__container'>
            <div className='calendar__unchoosable__year'>{state.selectedYearInterval[0] - 1}</div>
            {state.selectedYearInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  key={year}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode('monthes');
                  }}
                  className={[
                    'calendar__pick__item',
                    isCurrentYear ? 'calendar__today__item' : '',
                    isSelectedYear ? 'calendar__selected__item' : ''
                  ].join(' ')}
                >
                  {year}
                </div>
              );
            })}
            <div className='calendar__unchoosable__year'>
              {state.selectedYearInterval[state.selectedYearInterval.length - 1] + 1}
            </div>
          </div>
        )}

    </div>
  </div>
}


export default Calendar
