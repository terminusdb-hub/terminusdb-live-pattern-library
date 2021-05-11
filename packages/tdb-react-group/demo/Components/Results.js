import React, {useState} from "react"
import {WOQLTable, WOQLGraph} from '@terminusdb/terminusdb-react-components'
import {ResultController} from "./ResultController"
import {tableViewConfig, graphViewConfig} from "../Functions/ViewConfig"
import {GRAPH_VIEW, TABLE_VIEW} from "./constants"
import {TDBReactCollapse, TDBReactResizable} from '@terminusdb-live/tdb-react-layout'
import {ViewPane} from "./ViewPane"
import {ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {WOQLClientObj} from '../init-woql-client'
export const Results = ({freewidth,query,queryObj})=>{//{result, freewidth, limit, start, orderBy, setLimits, setOrder, query, loading, totalRows,updateQuery}) => {
    
    const {woqlClient} = WOQLClientObj()
    //const [graphConfig, setGraphConfig]=useState(graphViewConfig(result.bindings))
    const [graphConfig, setGraphConfig]=useState(graphViewConfig([]))
    
    const [tableConfig, setTableConfig]=useState(tableViewConfig())
    const [currentView, setCurrentView]=useState(TABLE_VIEW)
    const [isExpanded, setExpanded] = useState(true)

    const {
        updateQuery,
        changeOrder:setOrder,
        changeLimits:setLimits,
        woql,
        result,
        limit,
        start,
        orderBy,
        loading,
        rowCount:totalRows,
    } = ControlledQueryHook(woqlClient, query, queryObj.result, 20) 

 
    return <React.Fragment> 
        <TDBReactResizable style={{margin: "10px", minWidth: "100%"}}>
            <ResultController onClick={setCurrentView} isExpanded={isExpanded} setExpanded={setExpanded}/>          
            <ViewPane result={result.bindings} setGraphConfig={setGraphConfig}/>   
            <TDBReactCollapse isExpanded={isExpanded}>
                {currentView==GRAPH_VIEW && 
                    <WOQLGraph 
                        config={graphConfig.config} 
                        dataProvider={graphConfig} 
                        query={query} 
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
    
}

//export const MemoizedResult = React.memo(Results);

