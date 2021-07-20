import React, {useState, useEffect} from "react"
import {TDBReactButton, TDBReactCollapse} from '@terminusdb-live/tdb-react-layout'
import {UNCOLLAPSE_BUTTON_GROUP, COLLAPSE_BUTTON_GROUP} from './constants.js'
import {Results} from "./Results"
import {Row, Col, Card, Alert, Toast} from "react-bootstrap"
import {QueryPaneControl} from "../hooks/QueryPaneControl"
import {QueryEditor} from "./QueryEditor"
import {WOQLClientObj} from '../init-woql-client'
import {QueryPaneTools} from "./QueryPaneTools"
import {QueryBuilder} from "./QueryBuilder"
import {ResultErrors} from "./Errors"

export const QueryPane = ({id, name, queryObj}) => {
    const [viewResult, setViewResult]=useState(0)
    const result = queryObj.resultObj.result
    const showResult = viewResult || result ? true : false
    const {dataProduct,woqlClient} = WOQLClientObj()

    //using dosen't work if you need to query the commit db 
    //if(woqlClient && dataProduct){
      //  woqlClient.checkout("_commits")
   // }

    //const [queryBuilder, showQueryBuilder] = useState(false)
    const queryBuilder = queryObj.queryBuilderObj.isOpen
    const [size, setSize] = useState(12)
    const [queryError, setQueryError] = useState(false) 

    //maybe we not need an external hook 
    const {
        setExpanded,
        setQpExpanded,
        setSaveQuery,
        setSaveQueryName,
        saveQueryName
    } = QueryPaneControl(queryObj)

    useEffect (() => {
        if(queryObj.queryBuilderObj.isOpen) setSize(10)
        else setSize(12)
    }, [queryObj.queryBuilderObj.isOpen])
    
    const runQuery = () =>{
        //reset the result
        queryObj.resetResultObj()
        setQueryError(false)
        setViewResult(Date.now())
    }


    return <React.Fragment>
        <div className="query-pane-pallet mb-3 mt-3" >
            <Row className="w-100">
                <Col md={12}>
                    {queryError && <ResultErrors error={queryError}/>}
                    {/*queryError && <Alert variant="danger" className="w-100">
                    {queryError.message || queryError.error.message} 
                    </Alert>*/}
                </Col>
                <Col md={10}>
                    <h1 className="h5 ml-3">
                        {name} , Explore the 
                        <strong className="brand-color ml-1 mr-1">{dataProduct} </strong>
                        data product
                    </h1>
                </Col>
                {/*<Col md={2} className="d-flex justify-content-end pr-4">
                    {queryObj.mainPanelIsOpen && <TDBReactButton 
                        config={COLLAPSE_BUTTON_GROUP} 
                        onClick={() => setQpExpanded((prevExpanded) => !prevExpanded)}/>}

                    {!queryObj.mainPanelIsOpen && <TDBReactButton 
                        config={UNCOLLAPSE_BUTTON_GROUP} 
                        onClick={() => setQpExpanded((prevExpanded) => !prevExpanded)}/>}
                </Col>*/}
            </Row> 
            <TDBReactCollapse isExpanded={queryObj.mainPanelIsOpen}>
                <Card>
                    <Card.Header className="d-flex">
                        <QueryPaneTools queryObj={queryObj}
                            setExpanded={setExpanded} 
                            setSaveQuery={setSaveQuery} 
                            setSaveQueryName={setSaveQueryName} 
                            saveQueryName={saveQueryName}
                            runQuery={runQuery}
                            queryBuilder={queryBuilder}/>    
                    </Card.Header>
                    <Card.Body>
                        <TDBReactCollapse isExpanded={queryObj.editorPanelIsOpen}> 
                            <Row className="w-100">
                                <Col md={size}> 
                                    <QueryEditor queryObj={queryObj} id={id} setMainError={setQueryError}/>  
                                </Col>
                                {queryObj.queryBuilderObj.isOpen && <Col md={12 - size}>
                                    <QueryBuilder/>
                                </Col>}   
                            </Row>                       
                        </TDBReactCollapse>
                        <Results
                            setError={setQueryError}
                            freewidth={true}
                            queryObj={queryObj}
                        />                       
                    </Card.Body>
                </Card>               
            </TDBReactCollapse>
        </div>
    </React.Fragment>
}
   