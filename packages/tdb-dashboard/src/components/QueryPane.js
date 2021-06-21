import React, {useState, useEffect} from "react"
import {TDBReactButton, TDBReactCollapse} from '@terminusdb-live/tdb-react-layout'
import {UNCOLLAPSE_BUTTON_GROUP, COLLAPSE_BUTTON_GROUP} from './constants.js'
import {Results} from "./Results"
import {Row, Col, Card} from "react-bootstrap"
import {QueryPaneControl} from "../hooks/QueryPaneControl"
import {QueryEditor} from "./QueryEditor"
import {WOQLClientObj} from '../init-woql-client'
import {QueryPaneTools} from "./QueryPaneTools"
import {QueryBuilder} from "./QueryBuilder"
import {QueryPaneObj} from "../hooks/queryPaneContext" 

export const QueryPane = ({id, name, queryObj}) => {

    const {QueryBuilderChange} = QueryPaneObj()

    const [viewResult, setViewResult]=useState(0)
    const result = queryObj.resultObj.result
    const showResult = viewResult || result ? true : false
    const {dataProduct} = WOQLClientObj()

    //const [queryBuilder, showQueryBuilder] = useState(false)
    const queryBuilder = queryObj.queryBuilderObj.isOpen
    const [size, setSize] = useState(12)


    //const showQueryBuilder = () => {
        //QueryBuilderChange(queryObj.id,!queryObj.queryBuilderObj.isOpen)
        //if(queryObj.queryBuilderObj){
         //   queryObj.updateQueryBuilderProps('isOpen', !queryObj.queryBuilderObj.isOpen)
        //}
    //} 

    //maybe we not need an external hook
    const {setExpanded,
        setQpExpanded,
        setSaveQuery,
        setSaveQueryName,
        saveQueryName,
        showQueryBuilder,
    } = QueryPaneControl(queryObj)
   

 
    return <React.Fragment>
        <div className="query-pane-pallet mb-3 mt-3 mr-4" >
            <Row>
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
                            showQueryBuilder={showQueryBuilder}
                            setViewResult={setViewResult}
                            queryBuilder={queryBuilder}/>    
                    </Card.Header>
                    <Card.Body>
                        <TDBReactCollapse isExpanded={queryObj.editorPanelIsOpen}> 
                            <Row className="w-100">
                                <Col md={size}>
                                    <QueryEditor queryObj={queryObj} id={id}/>  
                                </Col>
                                {queryObj.queryBuilderIsOpen && <Col md={12 - size}>
                                    <QueryBuilder showQueryBuilder={showQueryBuilder}/>
                                </Col>}   
                            </Row>                       
                        </TDBReactCollapse>
                        {showResult && <Results 
                                freewidth={true}
                                queryObj={queryObj}
                            />
                        }
                    </Card.Body>
                </Card>
                
            </TDBReactCollapse>
        </div>
    </React.Fragment>
}

/*

<TDBReactCollapse isExpanded={queryObj.mainPanelIsOpen}>
                <div className="pallet mb-3 mt-3">
                    <div className="d-flex justify-content-start">
                            <QueryPaneTools queryObj={queryObj}
                                setExpanded={setExpanded} 
                                setSaveQuery={setSaveQuery} 
                                setSaveQueryName={setSaveQueryName} 
                                saveQueryName={saveQueryName}
                                setViewResult={setViewResult}/>      
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

*/            