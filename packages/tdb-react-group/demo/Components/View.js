import React, {useState, useEffect} from "react"
import {WOQLEditorControlled, ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {TDBReactButton, TDBReactResizable, TDBReactTextArea, TDBReactButtonGroup} from '@terminusdb-live/tdb-react-layout'
import {RUN_QUERY_CONFIG, SAVE_QUERY_CONFIG, LANGUAGE_LIST, COMMIT_TEXT_AREA, LANGUAGE_SWITCHER_BUTTON_GROUP} from './constants.js'
import {WOQLClientObj} from '../init-woql-client'
import {handleRunQuery, handleError} from '../Functions/Actions'
import {Results} from "./Results"
import {Row, Col} from '@themesberg/react-bootstrap';

export const View = (props) => {
    const [woqlQuery, setWOQLQuery]=useState(props.query)
    const {woqlClient} = WOQLClientObj()
    const initQuery = props.interactiveQuery || ''
    const initQueryString = props.interactiveQueryString || ''

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

    useEffect(() => {
        handleRunQuery(initQuery, updateQuery, "default Commit msg")
    }, [initQuery])


    

    return <React.Fragment>

        <TDBReactResizable style={{margin: "10px", minWidth: "100%"}}>
            <div className="pallet">
                <Row>
                    <Col md={10}>
                        <TDBReactTextArea config ={COMMIT_TEXT_AREA}/>
                    </Col>
                    <Col md={2}>
                        <TDBReactButton 
                            config={RUN_QUERY_CONFIG} 
                            onClick={(e) => handleRunQuery(woqlQuery, updateQuery, "default Commit msg")}/>
                        <TDBReactButton 
                            config={SAVE_QUERY_CONFIG}/>
                        
                        <TDBReactButtonGroup config={LANGUAGE_SWITCHER_BUTTON_GROUP}/>
                    </Col>
                </Row>
                
                <div className="editor-pallet">
                    <WOQLEditorControlled 
                        languages={LANGUAGE_LIST}
                        customLanguateSwitcher={true} 
                        startLanguage={"js"}  
                        setWOQLQuery={setWOQLQuery} 
                        editable={true}
                        initcontent={initQueryString}
                        setMainError={(e) => handleError(e)}/>
                </div>
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
