import React, {useState,useMemo} from "react"
import {WOQLTable, WOQLGraph} from '@terminusdb/terminusdb-react-components'
import {ResultController} from "./ResultController"
import {tableViewConfig, graphViewConfig} from "./ViewConfig"
import {GRAPH_VIEW, TABLE_VIEW} from "./constants"
import {TDBReactCollapse, TDBReactResizable} from '@terminusdb-live/tdb-react-layout'
import {ViewPane} from "./ViewPane"
import {ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {WOQLClientObj} from '../init-woql-client'

export const Results = ({freewidth,queryObj})=>{
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
        rowCount:totalRows,//(woqlClient, query, results, queryLimit, queryStart, order)
    } = ControlledQueryHook(woqlClient, queryObj.editorObj.query, 
                            queryResult.result, queryResult.limit, queryResult.start,
                            queryResult.orderBy,queryResult.totalRows) 

    
    const bindings = (result && result.bindings) ? result.bindings : []
    const [graphConfig, setGraphConf]=useState(queryResult.graph || graphViewConfig(bindings))
    
    const [tableConfig, setTableConfig]=useState(tableViewConfig())
    const [currentView, setCurrentView]=useState(queryResult.currentView)
    const [isExpanded, setPanelExpanded] = useState(queryObj.resultPanelIsOpen)
    
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


    useMemo(()=>{
        queryObj.updateResultProps("result",result)
        queryObj.updateResultProps("totalRows",totalRows)
    },[result,totalRows])
    
    if(!result) return ""

    return(
    <div className="pallet mb-3">
    <React.Fragment> 
        <TDBReactResizable style={{margin: "10px", minWidth: "100%"}}>
            <ResultController onClick={setView} 
                             isExpanded={queryObj.resultPanelIsOpen} 
                             setExpanded={setExpanded}
                             currentView={currentView}/>                                      
            {/*<ViewPane queryObj={queryObj} setGraphConfig={setGraphConfig}/>*/}   
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
            </TDBReactCollapse>
        </TDBReactResizable>
    </React.Fragment>
    </div>)
}