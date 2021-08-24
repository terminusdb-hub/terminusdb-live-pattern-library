

import React, {useState} from "react"
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {DateRangePicker, isInclusivelyBeforeDay, SingleDatePicker} from "react-dates"
import {TimeTravelControl} from "../hooks/TimeTravelControl"
import moment from 'moment'

export const DatePicker = () => {

    const {
        currentDay,
        setStartTime
    } = TimeTravelControl() 

    const [selectedDay, onDateChange] = useState(currentDay)
    const [focused,onFocusChange] = useState(false)

    return <SingleDatePicker
        dark
        showDefaultInputIcon
        date={selectedDay}
        onDateChange={(selectedDay)=>{
            onDateChange(selectedDay)
            setStartTime(selectedDay.add(1, 'day').unix())}}
        focused={focused}
        onFocusChange={({focused})=>{
            onFocusChange(focused)
        }}
        numberOfMonths={1}
        displayFormat='DD-MM-YYYY'
        placeholder='dd-mm-yyyy'
        isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
     />
}