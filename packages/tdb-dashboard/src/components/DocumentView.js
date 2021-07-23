import React, {useState, useEffect} from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {CREATE_DOCUMENT, CREATE_NEW_DOCUMENT_BUTTON, SEARCH_DOCUMENTS_PLACEHOLDER, EDIT_DOCUMENT, VIEW_DOCUMENT} from "./constants"
import {Card, Row} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {WOQLTable} from '@terminusdb-live/tdb-react-components'
import {ControlledGetDocumentQuery} from '@terminusdb-live/tdb-react-components'
import {getDocumentOfTypeTabConfig} from "./ViewConfig"
import {WOQLClientObj} from '../init-woql-client'
import {SearchBox} from "./SearchBox"
import {getDocumentTools, getDeleteTool, getCopyIDTool} from "./DocumentActions"
import {DocumentFrames} from "./DocumentFrames"
import {DocumentInfo} from "./DocumentInfo"
import {getColumnsFromResults} from "./utils"
import {DocumentSummary} from "./DocumentSummary"
import {FrameViewer} from './FrameViewer'

export const DocumentView = () => {
    const {
        woqlClient,
        dataProduct,
        documentObject,
        setDocumentObject
    } = WOQLClientObj()

    const [tableConfig, setTableConfig] = useState(false)

    const {
        updateQuery,
        changeOrder,
        changeLimits,
        controlledDocument,
        result,
        limit,
        start,
        orderBy,
        loading,
        rowCount,
        documentResults,
        setControlledRefresh,
        controlledRefresh
    } = ControlledGetDocumentQuery(woqlClient, documentObject.type, false, 20)


    // on change of class clicked on left side bar => reset
    useEffect(() => {
        setTableConfig(false)
        setControlledRefresh(controlledRefresh+1)
    }, [documentObject.type])

    useEffect(() => { // set table view config
        if(!documentResults) return 
        let tConf = getDocumentOfTypeTabConfig(documentResults, getDeleteTool, getCopyIDTool, onRowClick)
        setTableConfig(tConf)
    }, [documentResults])

    // on click document tablw row
    function onRowClick (row) { 
        setDocumentObject({
            type: row.original["@type"],
            action: VIEW_DOCUMENT,
            view: false,
            submit: false,
            currentDocument: row.original["@id"],
            frames: {}
        })
    }


    return  <React.Fragment>
        <Row className="mt-4"><h2 className="text-success fw-bold ml-3"> {dataProduct} </h2></Row>
        <Row className="mt-5 w-100 justify-content-md-center">

            {
            !documentObject.action && documentResults && tableConfig && 
                <Card className="content mr-3 ml-5 w-100" varaint="light"> 
                    <Card.Header>
                        <h6>Documents of type - <strong className="text-success">{documentObject.type}</strong></h6>
                    </Card.Header>
                    <Card.Body>
                        <WOQLTable
                            result={documentResults}
                            freewidth={true}
                            view={(tableConfig ? tableConfig.json() : {})}
                            limit={limit}
                            start={start}
                            orderBy={orderBy}  
                            setLimits={changeLimits}
                            setOrder={changeOrder}
                            resultColumns={getColumnsFromResults(documentResults)}
                            query={false}
                            loading={loading}
                            totalRows={rowCount}
                        />
                    </Card.Body>
                </Card>
            }
            {documentObject.action && documentObject.action!== VIEW_DOCUMENT && <DocumentFrames/>}

            {documentObject.action ==  VIEW_DOCUMENT &&  documentObject.currentDocument && documentObject.frames &&  <DocumentInfo/>}

        </Row>
        </React.Fragment>


}