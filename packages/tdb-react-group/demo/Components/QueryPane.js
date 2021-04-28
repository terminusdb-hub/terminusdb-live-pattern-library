import React, {useState, useEffect} from "react"
import {WOQLEditorControlled, ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {TDBReactButton, TDBReactResizable, TDBReactTextArea, TDBReactButtonGroup, TDBReactCollapse} from '@terminusdb-live/tdb-react-layout'
import {RUN_QUERY_CONFIG, SAVE_QUERY_CONFIG, ACTIONS_QUERY_BUTTON_GROUP, SAVE_QUERY_NAME_TEXT_AREA, UNCOLLAPSE_BUTTON_GROUP,LANGUAGE_LIST, COMMIT_TEXT_AREA, LANGUAGE_SWITCHER_BUTTON_GROUP, COLLAPSE_BUTTON_GROUP} from './constants.js'
import {WOQLClientObj} from '../init-woql-client'
import {handleRunQuery, handleError, handleSaveQuery} from '../Functions/Actions'
import {Results} from "./Results"
import {Row, Col} from "@themesberg/react-bootstrap"
import {useHook} from "./hook"

export const QueryPane = ({id, name, qpaneQuery, setQp, qp}) => {
    const [woqlQuery, setWOQLQuery]=useState(qpaneQuery)
    const {woqlClient} = WOQLClientObj()
    const [isExpanded, setExpanded] = useState(true)
    const [qpIsExpanded, setQpExpanded] = useState(true)
    const [saveQuery, setSaveQuery] = useState()
    const [saveQueryName, setSaveQueryName] = useState()

    const [editorContent, setEditorContent] = useState(false)

    let dp = useHook(woqlClient, saveQuery)


    console.log("woqlQuery", woqlQuery  )

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

    useEffect(() => {
        if(woqlQuery) {
            let tqp = qp
            for (var i=0; i< tqp.length; i++) {
                if(tqp[i].index == id) {
                    tqp[i].woqlQuery=woqlQuery
                }
            }
            setQp(tqp)
            setEditorContent(woqlQuery.prettyPrint("js"))
        }
        
    }, [woqlQuery])

   
    const handleLanguageSwitcher = (lang)=> {
        setLanguage(lang)
    }

    const handleSaveQueryNameOnChange = (name, setSaveQueryName) => {
        if(setSaveQueryName) setSaveQueryName(name)
    }


    


    return <React.Fragment>

        <div className="query-pane-pallet mb-3 mt-3">

            <Row>
                <Col md={11}>
                    <h1 className="h5 primary">{name}</h1>
                </Col>
                <Col md={1}>
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
                    <Row>
                            <Col md={2}> 
                                <TDBReactButton 
                                    config={RUN_QUERY_CONFIG} 
                                    onClick={(e) => handleRunQuery(woqlQuery, updateQuery, "default Commit msg")}/>
                                
                                <TDBReactButtonGroup config={LANGUAGE_SWITCHER_BUTTON_GROUP}/>
                            </Col>
                            
                            <   Col md={3}> 
                                <TDBReactTextArea config={SAVE_QUERY_NAME_TEXT_AREA} 
                                    onChange={(e) => handleSaveQueryNameOnChange(e, setSaveQueryName)}/>
                            </Col>

                            <Col md={1}> 
                                <TDBReactButton 
                                    config={SAVE_QUERY_CONFIG} 
                                    onClick={(e) => handleSaveQuery(woqlQuery, setSaveQuery, saveQueryName)}/>
                            </Col>
                        
                            <Col md={4}> 
                                <TDBReactTextArea config ={COMMIT_TEXT_AREA}/>
                            </Col>

                            

                            <Col md={2}> 
                            
                                <TDBReactButtonGroup config={ACTIONS_QUERY_BUTTON_GROUP}/>

                                {isExpanded && <TDBReactButton 
                                    config={COLLAPSE_BUTTON_GROUP} 
                                    onClick={() => setExpanded((prevExpanded) => !prevExpanded)}/>}

                                {!isExpanded && <TDBReactButton 
                                    config={UNCOLLAPSE_BUTTON_GROUP} 
                                    onClick={() => setExpanded((prevExpanded) => !prevExpanded)}/>}
                            </Col>
                        
                    </Row>

                    <TDBReactCollapse isExpanded={isExpanded}>
                        
                            <div className="editor-pallet">
                                <WOQLEditorControlled 
                                    languages={LANGUAGE_LIST}
                                    customLanguateSwitcher={true} 
                                    startLanguage={"js"}  
                                    setWOQLQuery={setWOQLQuery} 
                                    initcontent={editorContent}
                                    query={woqlQuery}
                                    editable={true}
                                    setMainError={(e) => handleError(e)}/>
                            </div>
                    
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
     
            </TDBReactCollapse>
            
        </div>
      
    </React.Fragment>

}