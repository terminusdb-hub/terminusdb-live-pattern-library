import React, {useState} from "react"
import {DBContextObj} from "../hooks/DBContext"
import {WOQLClientObj} from '../init-woql-client'
import {useCommitsControl} from '@terminusdb/terminusdb-react-components'
import moment from 'moment'

export const TimeTravelControl = () => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const {setHead, branch, ref, branches, DBInfo, consoleTime} = DBContextObj()

    const [report, setReport] = useState(false)

    const currentDay = consoleTime ? moment.unix(consoleTime) : moment()
    let firstCommit = null

    const { 
        dataProviderValues,
        loadPreviousPage,
        gotoPosition,
        startTime,
        setStartTime,
        setSelectedValue,
        loadNextPage
    } = useCommitsControl(woqlClient, setReport, branch, currentDay.unix(), ref, firstCommit)

    //console.log("dataProviderValues ****", dataProviderValues)


    const dataProvider= dataProviderValues.dataProvider;
    const currentItem = dataProvider.length>0  ? dataProvider[dataProviderValues.selectedValue] : {label:'No Value',author:'',message:''}

    return {currentItem, dataProvider, setSelectedValue, setHead, branch}
}