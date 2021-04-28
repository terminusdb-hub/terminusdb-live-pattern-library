import React, {useState} from "react"
import {WOQLTable, WOQLGraph} from '@terminusdb/terminusdb-react-components'
import {ResultController} from "./ResultController"
import {tableViewConfig, graphViewConfig} from "../Functions/ViewConfig"
import {GRAPH_VIEW, TABLE_VIEW} from "./constants"
import {TDBReactCollapse, TDBReactResizable} from '@terminusdb-live/tdb-react-layout'

export const Results = ({result, limit, start, orderBy, changeOrder, woqlQuery, loading, rowCount,updateQuery}) => {

    const [graphConfig, setGraphConfig]=useState(graphViewConfig(result.bindings))
    const [tableConfig, setTableConfig]=useState(tableViewConfig())
    const [currentView, setCurrentView]=useState(TABLE_VIEW)
    const [isExpanded, setExpanded] = useState(true) 

    return <React.Fragment> 
        <TDBReactResizable style={{margin: "10px", minWidth: "100%"}}>
            <ResultController onClick={setCurrentView} isExpanded={isExpanded} setExpanded={setExpanded}/>

            <TDBReactCollapse isExpanded={isExpanded}>
                {currentView==GRAPH_VIEW && 
                    <WOQLGraph 
                        config={graphConfig.config} 
                        dataProvider={graphConfig} 
                        query={woqlQuery} 
                        updateQuery={updateQuery}
                    />}
                {currentView==TABLE_VIEW && 
                    <WOQLTable
                        result={result}
                        freewidth={true}
                        view={tableConfig.json()}
                        limit={limit}
                        start={start}
                        orderBy={orderBy} 
                        setLimits={orderBy}
                        setOrder={changeOrder}
                        query={woqlQuery}
                        loading={loading}
                        totalRows={rowCount}
                    />}
            </TDBReactCollapse>
        </TDBReactResizable>
    </React.Fragment>
    
}

