import React, {useState} from "react"
import {WOQLEditorControlled, ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {TDBReactButton, TDBReactResizable, TDBReactDropDownButtons} from '@terminusdb-live/tdb-react-layout'
import {RUN_QUERY_CONFIG, SAVE_QUERY_CONFIG, LANGUAGE_LIST} from './constants.js'
import {WOQLClientObj} from '../init-woql-client'
import {handleRunQuery, handleError} from '../Functions/Actions'
import {Results} from "./Results"

export const View = (props) => {
    const [woqlQuery, setWOQLQuery]=useState(props.query)
    const {woqlClient} = WOQLClientObj()
    const initQuery = props.interactiveQuery || ''

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

   
    const handleLanguageSwitcher = (lang)=> {
        setLanguage(lang)
    }
    

    /* 
    limit(1).triple("v:Domain", "scm:stargazers_count", "v:Range")
    */

    /*
limit(1).quad( "scm:stargazers_count", "label", "v:Domain Label", "schema/main").
triple("v:Domain", "scm:stargazers_count", "v:MAKE")


    */

    return <React.Fragment>

        <TDBReactResizable style={{margin: "10px", minWidth: "100%"}}>
            <div className="pallet">
                <TDBReactButton 
                    config={RUN_QUERY_CONFIG} 
                    onClick={(e) => handleRunQuery(woqlQuery, updateQuery, "default Commit msg")}/>
                <TDBReactButton 
                    config={SAVE_QUERY_CONFIG}/>
                <TDBReactDropDownButtons
                    config={LANGUAGE_LIST}
                    onChange={handleLanguageSwitcher}
                    variant="dark"/>
                <WOQLEditorControlled 
                    languages={LANGUAGE_LIST}
                    customLanguateSwitcher={true} 
                    currentLanguage={"js"}  
                    setWOQLQuery={setWOQLQuery} 
                    editable={true}
                    setMainError={(e) => handleError(e)}/>
            </div>
        </TDBReactResizable>

        <TDBReactResizable style={{margin: "10px", minWidth: "100%"}}>
            {result && <div className="pallet">
                <Results result={result}
                    freewidth={true}
                    limit={limit}
                    start={start}
                    orderBy={orderBy} 
                    setLimits={changeLimits}
                    setOrder={changeOrder}
                    query={woqlQuery}
                    loading={loading}
                    totalRows={rowCount}
                    updateQuery={updateQuery}
                />
            </div>}
        </TDBReactResizable>
        
    </React.Fragment>
    
}
