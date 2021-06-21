import React, {useState, useEffect} from "react"
import {DBContextObj} from "../hooks/DBContext"
import {WOQLClientObj} from '../init-woql-client'
import {useCommitsControl} from '@terminusdb-live/tdb-react-components'
import moment from 'moment'

export const TimeTravelControl = () => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const {setHead, branch, ref, branches, DBInfo, consoleTime} = DBContextObj()

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

    return {currentItem, dataProvider, setSelectedValue, setHead, branch, loadPreviousPage, loadNextPage}
}