import React,{useEffect, useMemo,useState} from "react"
import {WOQLEditorControlled, ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {TDBReactButton, TDBReactTextArea, TDBReactButtonGroup, TDBReactCollapse} from '@terminusdb-live/tdb-react-layout'
import {RUN_QUERY_CONFIG, SAVE_QUERY_CONFIG, ACTIONS_QUERY_BUTTON_GROUP, SAVE_QUERY_NAME_TEXT_AREA, UNCOLLAPSE_BUTTON_GROUP,LANGUAGE_LIST, COMMIT_TEXT_AREA, LANGUAGE_SWITCHER_BUTTON_GROUP, COLLAPSE_BUTTON_GROUP} from './constants.js'
import {handleError, handleSaveQuery} from '../Functions/Actions'
import {Results} from "./Results"
import {Row, Col} from "@themesberg/react-bootstrap"
import {QueryPaneControl} from "../Hooks/QueryPageControl"
import {QueryEditor} from "./QueryEditor"

export const QueryPane = ({id, name, queryObj}) => {
    const [viewResult, setViewResult]=useState(0)
    const [needUpdate, setNeedUpdate]=useState(0)
    const result = queryObj.resultObj.result
    const showResult = viewResult || result ? true : false
    //maybe we not need an external hook
    const {setExpanded,
        isExpanded,
        setQpExpanded,
        qpIsExpanded,
        setSaveQuery,
        setSaveQueryName,
        saveQueryName,
        } = QueryPaneControl(queryObj)
   
    // "default Commit msg"
    const handleRunQuery = () => {
        if(queryObj.editorObj.query){
            setViewResult(Date.now())
            //if(updateQuery) updateQuery(woqlQuery, commitMessage)
        }
    }

    const handleSaveQueryNameOnChange = (name, setSaveQueryName) => {
        if(setSaveQueryName) setSaveQueryName(name)
    }


    return <React.Fragment>
        <div className="query-pane-pallet mb-3 mt-3 mr-4" >
            <Row>
                <Col md={10}>
                    <h1 className="h5 ml-3">{name}</h1>
                </Col>
                <Col md={2} className="d-flex justify-content-end pr-4">
                    {qpIsExpanded && <TDBReactButton 
                        config={COLLAPSE_BUTTON_GROUP} 
                        onClick={() => setQpExpanded((prevExpanded) => !prevExpanded)}/>}

                    {!qpIsExpanded && <TDBReactButton 
                        config={UNCOLLAPSE_BUTTON_GROUP} 
                        onClick={() => setQpExpanded((prevExpanded) => !prevExpanded)}/>}
                </Col>
            </Row>
            <TDBReactCollapse isExpanded={qpIsExpanded}>
                <div className="pallet mb-3 mt-3">
                    <div className="d-flex justify-content-start">
                            <div> 
                                <TDBReactButton 
                                    config={RUN_QUERY_CONFIG} 
                                    onClick={(e) => handleRunQuery()}/>
                                
                                <TDBReactButtonGroup config={LANGUAGE_SWITCHER_BUTTON_GROUP}/>
                            </div>                           
                            <Col md={3}> 
                                <TDBReactTextArea config={SAVE_QUERY_NAME_TEXT_AREA} 
                                    onChange={(e) => handleSaveQueryNameOnChange(e, setSaveQueryName)}/>
                            </Col>
                            <div> 
                                <TDBReactButton 
                                    config={SAVE_QUERY_CONFIG} 
                                    onClick={(e) => handleSaveQuery(woqlQuery, setSaveQuery, saveQueryName)}/>
                            </div>
                            <Col md={4}> 
                                <TDBReactTextArea config ={COMMIT_TEXT_AREA}/>
                            </Col>
                            <div> 
                                <TDBReactButtonGroup config={ACTIONS_QUERY_BUTTON_GROUP}/>
                                {isExpanded && <TDBReactButton 
                                    config={COLLAPSE_BUTTON_GROUP} 
                                    onClick={() => setExpanded((prevExpanded) => !prevExpanded)}/>}
                                {!isExpanded && <TDBReactButton 
                                    config={UNCOLLAPSE_BUTTON_GROUP} 
                                    onClick={() => setExpanded((prevExpanded) => !prevExpanded)}/>}
                            </div>                      
                    </div>
                    <TDBReactCollapse isExpanded={isExpanded}>                        
                        <QueryEditor queryObj={queryObj} id={id}/>                
                    </TDBReactCollapse>
                </div>  
                                
                  {showResult && <Results 
                        freewidth={true}
                        queryObj={queryObj}
                    />
                  }
                  
            </TDBReactCollapse>
        </div>
    </React.Fragment>

}

/*
<WOQLEditorControlled 
                                languages={LANGUAGE_LIST}
                                customLanguateSwitcher={true} 
                                startLanguage={"js"}  
                                setWOQLQuery={handleWOQLQueryChange} 
                                initcontent={editorContent}
                                query={woqlQuery}
                                editable={true}
                                setMainError={(e) => handleError(e)}/>*/

/*
{result && <div className="pallet mb-3">
                    <Results //result={result}
                        freewidth={true}
                        query={woqlQuery}
                        />
                </div>}

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
                    />*/