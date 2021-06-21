
import React, {useState, useEffect} from "react"
import useDimensions from "react-use-dimensions"
import moment from 'moment'
import {useCommitsControl, Timeline} from '@terminusdb/terminusdb-react-components'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {DateRangePicker, isInclusivelyBeforeDay, SingleDatePicker} from "react-dates"
import {Row, Col} from "react-bootstrap"
import {TIME_TRAVEL_DESCRIPTION} from "./constants"


export const TimelineCommits = ({woqlClient, setHead, branch, currentStartTime,currentCommit ,firstCommit, onChange}) =>{
    
    const [report, setReport] = useState(false)

    const [ref, { x, y, width }] = useDimensions()

    const currentDay = currentStartTime ? moment.unix(currentStartTime) : moment()

    const { 
        dataProviderValues,
        loadPreviousPage,
        gotoPosition,
        startTime,
        setStartTime,
        setSelectedValue,
        loadNextPage
    } = useCommitsControl(woqlClient, setReport, branch, currentDay.unix(), currentCommit, firstCommit)


    console.log("currentCommit", currentCommit)

    const [selectedDay, onDateChange] = useState( currentDay)
    const [focused, onFocusChange] = useState(false)

    useEffect(() => {
        if(onChange) onChange(currentItem)
    }, currentItem)

    const startConf={ 
        isTouchEnabled: true,
        //isKeyboardEnabled: true,
        isOpenEnding: true,
        isOpenBeginning: true,
        minEventPadding: 20,
        maxEventPadding: 120,
        linePadding: 100,
        labelWidth: 200,
        fillingMotion:{ stiffness:150, damping: 25},
        slidingMotion:{ stiffness:150, damping: 25}
    }
        
    const styles={
        background: 'white', 
        foreground: '#00C08B',
        outline: '#dfdfdf'
    }
  
    const dataProvider= dataProviderValues.dataProvider;
    const currentItem = dataProvider.length>0  ? dataProvider[dataProviderValues.selectedValue] : {label:'No Value',author:'',message:''}

    if(!currentItem) return null


    return <React.Fragment>
        <h6 className="text-muted mt-3 mb-3">
            {TIME_TRAVEL_DESCRIPTION}
        </h6>
        <Col md={12} className="px-xl-0 mt-5">
            <div className="d-flex align-items-center">
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Commits on</h6>
                    <h4>{currentItem.label}</h4>
                </div>
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Commited by</h6>
                    <h4>{currentItem.author}</h4>
                </div>
                <div class="d-block col-md-8">
                    <h6 class="fw-normal text-muted mb-8">Description</h6>
                    <h4>{currentItem.message}</h4>
                </div>
            </div>
        </Col>
        <div ref={ref}>
            <Timeline
                containerWidth={width}
                containerHeight={100}
                index={dataProviderValues.selectedValue}
                indexClick={(index) => {
                    setSelectedValue(index)
                }}
                loadPreviousPage={loadPreviousPage}
                loadNextPage={loadNextPage}
                {...startConf}
                styles={styles}
                values={dataProvider}
                gotoPosition={gotoPosition}
            />
        </div>
    </React.Fragment>

    /*return (
        <div className="history__nav__content">
          <div className="history__nav__row">

              <SingleDatePicker
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
                   displayFormat='DD-MM-YYYY'//'YYYY-MM-DD'
                   placeholder='dd-mm-yyyy'//"yyyy-mm-dd"
                   isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                />

                <div className="history__nav__display__commit">
                    <span className="history__nav__display__test">
                    {`${currentItem.label} - ${currentItem.author}` }</span>
                    <span className="history__nav__display__test">{`${currentItem.message}` }</span>
                </div>
              <button className="tdb__button__base tdb__button__base--bgreen" {...buttonActive} {...buttonVisible}>
                  {headMessage}
              </button>
          </div>
            <div className="history__nav__slider__content" ref={ref}>
                    <Timeline
                      containerWidth={width}
                      containerHeight={100}
                      index={dataProviderValues.selectedValue}
                      indexClick={(index) => {
                         setSelectedValue(index)
                      }}
                      loadPreviousPage={loadPreviousPage}
                      loadNextPage={loadNextPage}
                      {...startConf}
                      styles={styles}
                      values={dataProvider}
                      gotoPosition={gotoPosition}
                    />
            </div>
        </div>
      ) */

}
