import React, {useState, useEffect} from "react"
import {WOQLEditorControlled, ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {TDBReactButton, TDBReactResizable, TDBReactTextArea, TDBReactButtonGroup, TDBReactCollapse} from '@terminusdb-live/tdb-react-layout'
import {RUN_QUERY_CONFIG, SAVE_QUERY_CONFIG, UNCOLLAPSE_BUTTON_GROUP,LANGUAGE_LIST, COMMIT_TEXT_AREA, LANGUAGE_SWITCHER_BUTTON_GROUP, COLLAPSE_BUTTON_GROUP} from './constants.js'
import {WOQLClientObj} from '../init-woql-client'
import {handleRunQuery, handleError} from '../Functions/Actions'
import {Results} from "./Results"


export const QueryPane = ({query, interactiveQuery, interactiveQueryString}) => {
    const [woqlQuery, setWOQLQuery]=useState(query)
    const {woqlClient} = WOQLClientObj()
    const [isExpanded, setExpanded] = useState(true)

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
    } = ControlledQueryHook(woqlClient, query, false, 20)

    

    console.log("woqlQuery", woqlQuery)

   
    const handleLanguageSwitcher = (lang)=> {
        setLanguage(lang)
    }

    /*useEffect(() => {
        if(!initQuery) return
        handleRunQuery(initQuery, updateQuery, "default Commit msg")
    }, [initQuery])  */

    //initcontent={initQueryString}

    return <React.Fragment>

        
        <div className="pallet mb-3 mt-3">
            <TDBReactTextArea config ={COMMIT_TEXT_AREA}/>

            <TDBReactButton 
                config={RUN_QUERY_CONFIG} 
                onClick={(e) => handleRunQuery(woqlQuery, updateQuery, "default Commit msg")}/>
            
            <TDBReactButton 
                config={SAVE_QUERY_CONFIG} 
                onClick={handleLanguageSwitcher}/>

            {isExpanded && <TDBReactButton 
                config={COLLAPSE_BUTTON_GROUP} 
                onClick={() => setExpanded((prevExpanded) => !prevExpanded)}/>}
            
            {!isExpanded && <TDBReactButton 
                config={UNCOLLAPSE_BUTTON_GROUP} 
                onClick={() => setExpanded((prevExpanded) => !prevExpanded)}/>}
            
            <TDBReactButtonGroup config={LANGUAGE_SWITCHER_BUTTON_GROUP}/>

            <TDBReactCollapse isExpanded={isExpanded}>
                <TDBReactResizable style={{margin: "10px", minWidth: "100%"}}>
                    <div className="editor-pallet">
                        <WOQLEditorControlled 
                            languages={LANGUAGE_LIST}
                            customLanguateSwitcher={true} 
                            startLanguage={"js"}  
                            setWOQLQuery={setWOQLQuery} 
                            query={woqlQuery}
                            editable={true}
                            setMainError={(e) => handleError(e)}/>
                    </div>
                </TDBReactResizable>
            </TDBReactCollapse>
        </div>
        

        
        {result && <div className="pallet mb-3">
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
        
        
    </React.Fragment>

}