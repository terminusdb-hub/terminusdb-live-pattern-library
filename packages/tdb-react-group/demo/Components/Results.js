import React, {useState} from "react"
import {WOQLTable, WOQLGraph} from '@terminusdb/terminusdb-react-components'
import {ViewChooser} from "./ViewChooser"
import {tableViewConfig, graphViewConfig} from "../Functions/ViewConfig"
import {GRAPH_VIEW, TABLE_VIEW} from "./constants"

export const Results = ({result, view, limit, start, orderBy, changeOrder, woqlQuery, loading, rowCount,updateQuery}) => {

    const [graphConfig, setGraphConfig]=useState(graphViewConfig(result.bindings))
    const [tableConfig, setTableConfig]=useState(tableViewConfig())
    const [currentView, setCurrentView]=useState(TABLE_VIEW)


    return <React.Fragment> 
        <ViewChooser onClick={setCurrentView}/>
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
    </React.Fragment>
    
}




/*return <WOQLTable
        result={result}
        freewidth={true}
        view={view}
        limit={limit}
        start={start}
        orderBy={orderBy} 
        setLimits={orderBy}
        setOrder={changeOrder}
        query={woqlQuery}
        loading={loading}
        totalRows={rowCount}
    />*/