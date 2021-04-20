import React, {useState} from "react"
import {WOQLEditorControlled, WOQLTable, ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {RUN_QUERY_CONFIG} from './constants.js'
import {WOQLClientObj} from '../init-woql-client'
import {handleRunQuery, handleError} from '../Functions/Actions'
import {resultViewConfig} from "../Functions/ViewConfig"

export const View = (props) => {
    const [woqlQuery, setWOQLQuery]=useState(props.query)
    const [resultView, setResultView]=useState(resultViewConfig)
    const {woqlClient} = WOQLClientObj()

    console.log("woqlQuery",woqlQuery)

    const {
        updateQuery,
        changeOrder,
        changeLimits,
        woql,
        result,
        limit,
        start,
        orderBy,
        loading,
        rowCount,
    } = ControlledQueryHook(woqlClient, woqlQuery, false, 20)

    return <React.Fragment>
        <TDBReactButton 
            config={RUN_QUERY_CONFIG} 
            onClick={(e) => handleRunQuery(woqlQuery, updateQuery, "default Commit msg")}/>
        <WOQLEditorControlled 
            languages={['js', 'json']} 
            currentLanguage={"js"} 
            setWOQLQuery={setWOQLQuery} 
            editable={true}
            setMainError={(e) => handleError(e)}/>
        {<WOQLTable
            result={result}
            freewidth={true}
            view={resultView.json()}
            limit={limit}
            start={start}
            orderBy={orderBy} 
            setLimits={changeLimits}
            setOrder={changeOrder}
            query={woqlQuery}
            loading={loading}
            totalRows={rowCount}
        />}
    </React.Fragment>
    
}