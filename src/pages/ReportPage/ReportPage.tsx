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

  const data = [
    { name: 'Jan', value: 40 },
    { name: 'Feb', value: 35 },
    { name: 'Mar', value: 4 },
    { name: 'Apr', value: 28 },
    { name: 'May', value: 15 },
  ];

  const getX = d3.scaleBand()
  .domain(['Jan', 'Feb', 'Mar', 'Apr', 'May'])
  .range([0, 600]);

  const getY = d3.scaleLinear()
  .domain([0, 40])
  .range([300, 0]);
  
  const getYAxis = ref => {
    const yAxis = d3.axisLeft(getY);
    d3.select(ref).call(yAxis);
  };
  
  const getXAxis = ref => {
    const xAxis = d3.axisBottom(getX);
    d3.select(ref).call(xAxis);
  };

  return (
   
    <svg width={600} height={300}>
       <svg>
    <g ref={getYAxis} />
    <g
      ref={getXAxis}
      transform={`translate(0,${getY(0)})`} // нужно сдвинуть ось в самый низ svg
    />
      {data.map((item, index) => {
        return (
          <g key={index}>
            <circle
          key={index}
          cx={getX(item.name) + getX.bandwidth() / 2}
          cy={getY(item.value)}
          r={4}
          fill="#7cb5ec"
        />
            <text
              fill="#666"
              x={getX(item.name) + getX.bandwidth() / 2}
              y={getY(item.value) - 10}
              textAnchor="middle"
            >
              {item.value}
            </text>
          </g>
        );


      })}
    </svg>
    </svg>
  );
}

export default ReportPage
