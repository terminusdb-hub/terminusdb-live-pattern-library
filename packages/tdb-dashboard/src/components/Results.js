import React, {useState,useMemo} from "react"
import {WOQLTable, WOQLGraph} from '@terminusdb-live/tdb-react-components'
import {ResultController} from "./ResultController" 
import {tableViewConfig, graphViewConfig} from "../functions/ViewConfig"
import {GRAPH_VIEW, TABLE_VIEW, JSON_VIEW, EDITOR_WRITE_OPTIONS, PROGRESS_BAR_COMPONENT} from "./constants"
import {TDBReactCollapse, TDBReactResizable} from '@terminusdb-live/tdb-react-layout'
import {ViewPane} from "./ViewPane"
import {ControlledQueryHook} from '@terminusdb-live/tdb-react-components'
import {WOQLClientObj} from '../init-woql-client'
import ReactJson from 'react-json-view'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {Loading} from "./Loading"


export const Results = ({freewidth, queryObj, setError, runQuery})=>{
    const {woqlClient} = WOQLClientObj()
    const queryResult = queryObj.resultObj
    const {
        updateQuery,
        changeOrder:setOrder,
        changeLimits,//:setLimits,
        woql,
        result,
        limit,
        start,
        orderBy,
        loading,
        totalRows,//(woqlClient, query, results, queryLimit, queryStart, order)
    } = ControlledQueryHook(woqlClient, queryObj.editorObj.query, 
                            queryResult.result, queryResult.limit, queryResult.start,
                            queryResult.orderBy,queryResult.totalRows,runQuery) 

    
    const bindings = (result && result.bindings) ? result.bindings : []
    //const [graphConfig, setGraphConf]=useState(queryResult.graph || graphViewConfig(bindings))
    const [graphConfig, setGraphConf]=useState(graphViewConfig(bindings))
    
    const [tableConfig, setTableConfig]=useState(tableViewConfig())
    const [currentView, setCurrentView]=useState(queryResult.currentView)
    const [isExpanded, setPanelExpanded] = useState(queryObj.resultPanelIsOpen)

    const [queryRunTime, setQueryRunTime] = useState(false)

    let options = EDITOR_WRITE_OPTIONS

    const setGraphConfig=(config)=>{
        setGraphConf(config)
        queryObj.updateResultProps('graph',config)

    }

    const setExpanded = ()=>{
        const newStatus=!isExpanded
        // setPanelExpanded(newStatus)
        queryObj.resultPanelIsOpen = newStatus

    }

    const setView = (viewType) =>{
        setCurrentView(viewType)
        queryObj.updateResultProps('currentView',viewType)
    }

    const setLimits=(limit, start)=>{
        if(limit)queryObj.updateResultProps('limit',limit)
        if(start)queryObj.updateResultProps('start',start)
        changeLimits(limit, start)
    }

    const saveGraph = () =>{

    }

    function queryTimeDisplay(currentReport){
        let qtime = (currentReport.duration ? currentReport.duration / 1000 : false)
        return (qtime ? qtime + " seconds" : false)
    }


    useMemo(()=>{
        if(result && result.error){
            setError(result)
        }
        if(result) {
            let qtime = queryTimeDisplay(result)
            setQueryRunTime(qtime)
            if(currentView == GRAPH_VIEW) {
                setGraphConf(graphViewConfig(result.bindings))
            }
        }
    },[result, totalRows, currentView])
    
    if(!result) return ""

     

    return( 
    <div className="pallet mb-3 mt-4">
        {loading && <Loading message={`Executing Query`} type={PROGRESS_BAR_COMPONENT}/>}
       
        {!loading && bindings.length>0 && 
        <React.Fragment>
        <TDBReactResizable style={{margin: "10px", minWidth: "100%"}}>
            <ResultController onClick={setView} 
                             isExpanded={queryObj.resultPanelIsOpen} 
                             setExpanded={setExpanded}
                             currentView={currentView}
                             queryRunTime={queryRunTime}/>                                      
            {/*<ViewPane queryObj={queryObj} setGraphConfig={setGraphConfig}/> */}  
            <TDBReactCollapse isExpanded={queryObj.resultPanelIsOpen}>
                {currentView==GRAPH_VIEW && 
                    <WOQLGraph 
                        config={graphConfig.config} 
                        dataProvider={graphConfig} 
                        query={queryObj.editorObj.query} 
                        updateQuery={updateQuery}
                    />}
                {currentView==TABLE_VIEW && 
                    <WOQLTable
                        result={result}
                        freewidth={freewidth}
                        view={(tableConfig ? tableConfig.json() : {})}
                        limit={limit}
                        start={start}
                        orderBy={orderBy} 
                        setLimits={setLimits}
                        setOrder={setOrder}
                        query={woql}
                        loading={loading}
                        totalRows={totalRows}
                    />}
                {currentView==JSON_VIEW &&
                    <CodeMirror
                        value={JSON.stringify(result.bindings, null, 2)}
                        readOnly= {true}
                        options={options}
                    />
                }
            </TDBReactCollapse>
        </TDBReactResizable>
        </React.Fragment>
        }   
    </div>)
}
