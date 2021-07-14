import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {useCommitsControl} from '@terminusdb-live/tdb-react-components'
import moment from 'moment'

export const TimeTravelControl = () => {
    const {woqlClient, branch, ref, consoleTime,setHead} = WOQLClientObj()
   
    const [report, setReport] = useState(false)

    const currentDay = consoleTime ? moment.unix(consoleTime) : moment()
    let firstCommit = null

    const [dataProvider, setDataProvider] = useState([])

    const { 
        dataProviderValues,
        loadPreviousPage,
        gotoPosition,
        startTime,
        setStartTime,
        setSelectedValue,
        loadNextPage
    } = useCommitsControl(woqlClient, setReport, branch, currentDay.unix(), ref, firstCommit)

    useEffect(() => {
        setDataProvider(dataProviderValues.dataProvider)
    }, [dataProviderValues])

    //const dataProvider= dataProviderValues.dataProvider;
    const currentItem = dataProvider.length>0  ? dataProvider[dataProviderValues.selectedValue] : {label:'No Value',author:'',message:''}

    return {currentItem, 
            setHead, 
            dataProvider, 
            setSelectedValue, 
            branch, 
            loadPreviousPage, 
            loadNextPage}
}