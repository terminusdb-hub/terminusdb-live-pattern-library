import React, {useState} from "react"
import {TDBReactButton, TDBReactTextArea, TDBReactButtonGroup, TDBReactCollapse} from '@terminusdb-live/tdb-react-layout'
import {RUN_QUERY_CONFIG, COPY_QUERY_CONFIG, QUERY_BUILDER_CONFIG, SAVE_QUERY_CONFIG, ACTIONS_QUERY_BUTTON_GROUP, SAVE_QUERY_NAME_TEXT_AREA, UNCOLLAPSE_BUTTON_GROUP, COMMIT_TEXT_AREA, LANGUAGE_SWITCHER_BUTTON_GROUP, COLLAPSE_BUTTON_GROUP} from './constants.js'
import {Col, Row, Button, Modal } from "react-bootstrap"
import {BiChevronUp, BiChevronDown} from "react-icons/bi"
import {BsClipboard, BsUpload, BsDownload} from "react-icons/bs"
import {copyToClipboard} from "./utils"
import {QueryPaneObj} from '../hooks/queryPaneContext'
import {makeWOQLFromString, makeWOQLIntoString} from "@terminusdb-live/tdb-react-components"
import {JSONLD, JS} from "./constants"

export const QueryPaneTools = ({queryObj, setExpanded, setViewResult}) => {

    const [commitModal, setCommitModal] = useState(false)

    const {WOQLQueryChange, QueryBuilderChange} = QueryPaneObj()


    // "default Commit msg"
    const handleRunQuery = () => {
        if(queryObj.editorObj.query){
            let woql = queryObj.editorObj.query
            if(woql.containsUpdate()) {
                setCommitModal(true)
            }
            else handleRun()
            //if(updateQuery) updateQuery(woqlQuery, commitMessage)
        }
    }

    const handleRun = () => {
        if(queryObj.editorObj.query){
            setViewResult(Date.now())
        }
    }

    /*const handleSaveQuery = (saveQuery, setSaveQuery, saveQueryName) => { // commenting out saved query functions 
        if(saveQuery){
            let q = storeQueries(saveQuery, saveQueryName)
            if(setSaveQuery) setSaveQuery(q)
        }
    }

    const handleSaveQueryNameOnChange = (name, setSaveQueryName) => {
        if(setSaveQueryName) setSaveQueryName(name)
    }*/

    const handleLanguageChange = (lang) => {
        if(lang == JS){ //js
            let woql = makeWOQLFromString(queryObj.editorObj.text, JSONLD)
            let js = makeWOQLIntoString(woql, JS)
            WOQLQueryChange(queryObj.id, queryObj.editorObj.query, js, JS)
        }
        else { //json-ld
            let woql = makeWOQLFromString(queryObj.editorObj.text, JS)
            let json = makeWOQLIntoString(woql, JSONLD)
            WOQLQueryChange(queryObj.id, queryObj.editorObj.query, json, JSONLD) 
        }
    }


    const PopCommitModal = ({commitModal, setCommitModal}) => {

        function handleClick () {
            handleRun()
            setCommitModal(false)
        } 

        return <Modal centered size="sm" show={commitModal} onHide={(e) => setCommitModal(false)}>
        <Modal.Header>
            <Modal.Title className="h6">This query contain's an Update</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={(e) => setCommitModal(false)} />
        </Modal.Header>
        <Modal.Body className="p-5">
            <h6>Enter an optional reason for update here</h6>
            <TDBReactTextArea config ={COMMIT_TEXT_AREA}/>
        </Modal.Body>
        <Modal.Footer>
            <TDBReactButton 
                config={RUN_QUERY_CONFIG} 
                onClick={(e) => handleClick()}/>
        </Modal.Footer>
    </Modal>
    }

    return <React.Fragment> 
        <Row className="w-100"> 

            <Col md={11}>
                <TDBReactButton 
                    config={QUERY_BUILDER_CONFIG}  
                    onClick={(e) => QueryBuilderChange(queryObj.id, !queryObj.queryBuilderObj.isOpen)}/>

                <TDBReactButtonGroup config={LANGUAGE_SWITCHER_BUTTON_GROUP} onClick={handleLanguageChange}/>

                <TDBReactButton 
                    config={COPY_QUERY_CONFIG} 
                    onClick={(e) => copyToClipboard(queryObj.editorObj.text)}/>
            </Col> 

            <Col md={1}>
                <TDBReactButton 
                    config={RUN_QUERY_CONFIG} 
                    onClick={handleRunQuery}/>

                <PopCommitModal commitModal={commitModal} setCommitModal={setCommitModal}/>
                {queryObj.editorPanelIsOpen && <Button className="btn-light" title="Hide Editor">
                    <BiChevronUp onClick={(e) => setExpanded(false)}/>
                    </Button>}
                {!queryObj.editorPanelIsOpen && <Button className="btn-light" title="Show Editor">
                    <BiChevronDown onClick={(e) => setExpanded(true)}/>
                </Button>}

            </Col>

        </Row>     


    </React.Fragment>

    
}
