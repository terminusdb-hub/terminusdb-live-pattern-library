import React,{useEffect, useMemo,useState} from "react"
import {TDBReactButton, TDBReactTextArea, TDBReactButtonGroup, TDBReactCollapse} from '@terminusdb-live/tdb-react-layout'
import {RUN_QUERY_CONFIG, SAVE_QUERY_CONFIG, ACTIONS_QUERY_BUTTON_GROUP, SAVE_QUERY_NAME_TEXT_AREA, UNCOLLAPSE_BUTTON_GROUP,LANGUAGE_LIST, COMMIT_TEXT_AREA, LANGUAGE_SWITCHER_BUTTON_GROUP, COLLAPSE_BUTTON_GROUP} from './constants.js'
import {handleSaveQuery} from '../functions/Actions'
import {Results} from "./Results"
import {Row, Col} from "react-bootstrap"
import {QueryPaneControl} from "../hooks/QueryPageControl"
import {QueryEditor} from "./QueryEditor"

export const QueryPane = ({id, name, queryObj}) => {
    const [viewResult, setViewResult]=useState(0)
    const result = queryObj.resultObj.result
    const showResult = viewResult || result ? true : false
    //maybe we not need an external hook
    const {setExpanded,
        setQpExpanded,
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
                    {queryObj.mainPanelIsOpen && <TDBReactButton 
                        config={COLLAPSE_BUTTON_GROUP} 
                        onClick={() => setQpExpanded((prevExpanded) => !prevExpanded)}/>}

                    {!queryObj.mainPanelIsOpen && <TDBReactButton 
                        config={UNCOLLAPSE_BUTTON_GROUP} 
                        onClick={() => setQpExpanded((prevExpanded) => !prevExpanded)}/>}
                </Col>
            </Row>
            <TDBReactCollapse isExpanded={queryObj.mainPanelIsOpen}>
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
                                {queryObj.editorPanelIsOpen && <TDBReactButton 
                                    config={COLLAPSE_BUTTON_GROUP} 
                                    onClick={() => setExpanded((prevExpanded) => !prevExpanded)}/>}
                                {!queryObj.editorPanelIsOpen && <TDBReactButton 
                                    config={UNCOLLAPSE_BUTTON_GROUP} 
                                    onClick={() => setExpanded((prevExpanded) => !prevExpanded)}/>}
                            </div>                      
                    </div>
                    <TDBReactCollapse isExpanded={queryObj.editorPanelIsOpen}>                        
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
