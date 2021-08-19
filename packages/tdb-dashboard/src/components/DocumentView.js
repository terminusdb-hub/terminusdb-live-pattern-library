import React, {useState, useEffect} from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {FORM_VIEW, VIEW_DOCUMENT, PROGRESS_BAR_COMPONENT} from "./constants"
import {Card, Row, Col} from "react-bootstrap"
import {WOQLTable} from '@terminusdb-live/tdb-react-components'
import {ControlledGetDocumentQuery} from '@terminusdb-live/tdb-react-components'
import {getDocumentOfTypeTabConfig} from "./ViewConfig"
import {WOQLClientObj} from '../init-woql-client'
import {SearchBox} from "./SearchBox"
import {getDocumentTools, getDeleteTool, getCopyIDTool} from "./DocumentActions"
import {DocumentFrames} from "./DocumentFrames"
import {DocumentInfo} from "./DocumentInfo"
import {getColumnsFromResults} from "./utils"
import {FrameViewer} from './FrameViewer'
import {NoDocumentsAvailable} from "./NoDocumentsAvailable"
import {Loading} from "./Loading"
import {DocumentSummary} from "./DocumentSummary"
import {DocumentControlObj} from '../hooks/DocumentControlContext'


export const DocumentView = () => {

    const {
        woqlClient,
        dataProduct,
        route
    } = WOQLClientObj()

    const {
        documentObject,
        setDocumentObject,
        setDocumentObjectWithFrames,
        documentObjectWithFrames
    } = DocumentControlObj()

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
        setDocumentResults,
        setControlledRefresh,
        controlledRefresh
    } = ControlledGetDocumentQuery(woqlClient, documentObject.type, false, 20)

    useEffect(() => {
        setTableConfig(false)
        setDocumentResults(false)
        setControlledRefresh(controlledRefresh+1)
    }, [documentObject.type])

    useEffect(() => {
        if(documentObjectWithFrames.update) {
            setTableConfig(false)
            setDocumentResults(false)
            setControlledRefresh(controlledRefresh+1)
        }
    }, [documentObjectWithFrames.update])

 
    useEffect(() =>{ // reset everything on change of page/ dataproduct
        let resetDocument = {
            type: false, // document class type
            action: false,  // create/ view/ edit
            view: FORM_VIEW,    // view in form or json
            submit: false,  // click on submit button to edit or create
            currentDocument: false, // current document id to view document details 
            frames: {}, // schema frames of document class
            filledFrame: {}, // filled frames of document id
            message: false, // success or error message related to action on a document 
            loading: false,  // loading bar
            update:false // to refresh updated info 
        }
        setDocumentObjectWithFrames(resetDocument)
        setDocumentObject(resetDocument)
    }, [route.loading, dataProduct])


    useEffect(() => { // set table view config
        if(!documentResults) return 
        let tConf = getDocumentOfTypeTabConfig(documentResults, getDeleteTool, getCopyIDTool, onRowClick)
        setTableConfig(tConf)
    }, [documentResults]) 

    // on click document tablw row
    function onRowClick (row) { 
        setDocumentObject({
            action: VIEW_DOCUMENT,
            type: row.original["@type"], 
            view: documentObject.view,
            submit: false,
            currentDocument: row.original["@id"],
            frames: {},
            filledFrame: {},
            loading: <Loading message={`Fetching document ${row.original["@id"]} ...`} type={PROGRESS_BAR_COMPONENT}/>,
            message: false,
            update:false
        })
    }

    console.log("documentObjectWithFrames in view", documentObjectWithFrames)


    return <React.Fragment>
        <Row className="mt-4"><h2 className="text-success fw-bold ml-3"> {dataProduct} </h2></Row>
        <Row className="mt-5 w-100">

        {!documentObjectWithFrames.action && (!documentResults) && <DocumentSummary/>}
          

        { 
            !documentObjectWithFrames.action && (documentResults.length>0) && tableConfig && 
                <main className="content mr-3 ml-5 w-100 ">
                    <Row className="w-100 mb-5">
                        <Col md={11}> 
                            <Card className="content mr-3 ml-5 w-100" varaint="light"> 
                                <Card.Header>
                                    <h6>Documents of type - <strong className="text-success">{documentObjectWithFrames.type}</strong></h6>
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
                        </Col>
                    </Row>
                </main>
            }

            {/* View document info on click of a row */}
            {
                documentObjectWithFrames.action ==  VIEW_DOCUMENT && 
                documentObjectWithFrames.filledFrame && 
                <DocumentInfo/>}

            {/* create or edit a document */}
            {
                documentObjectWithFrames.action &&
                documentObjectWithFrames.action !==  VIEW_DOCUMENT && 
                documentObject.update &&
                documentObjectWithFrames.frames && 
                <DocumentFrames/>}
        
        </Row>
    </React.Fragment>


}