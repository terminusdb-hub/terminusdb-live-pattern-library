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

export const DocumentView = () => {
    const {
        woqlClient,
        dataProduct,
        documentObject,
        setDocumentObject,
        documentObjectReload
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
        setDocumentResults,
        setControlledRefresh,
        controlledRefresh
    } = ControlledGetDocumentQuery(woqlClient, documentObject.type, false, 20)

    useEffect(() => {
        setTableConfig(false)
        setDocumentResults(false)
    }, [documentObject.type, documentObject.update])

    // on change of class clicked on left side bar => reset
    useEffect(() => {
        //setTableConfig(false)
        setControlledRefresh(controlledRefresh+1)
    }, [documentObject.update])

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
            view: FORM_VIEW,
            submit: false,
            currentDocument: row.original["@id"],
            frames: {},
            update: Date.now(),
            loading: <Loading message={`Fetching document ${row.original["@id"]} ...`} type={PROGRESS_BAR_COMPONENT}/>,
            message: false
        })
    }


    useEffect(() => {
        console.log("documentVIEW", documentObject.frames)
    }, [documentObjectReload])
  
    return  <React.Fragment>
        <Row className="mt-4"><h2 className="text-success fw-bold ml-3"> {dataProduct} </h2></Row>
        <Row className="mt-5 w-100">
            <Row>
                {/*documentObject.message && documentObject.message*/}
            </Row>
            {!documentObject.action && (documentResults.length==0) && <NoDocumentsAvailable type={documentObject.type} setDocumentObject={setDocumentObject}/>}
            {!documentObject.action && (!documentResults) && <DocumentSummary setDocumentObject={setDocumentObject}/>}
            { 
            !documentObject.action && (documentResults.length>0) && tableConfig && 
                <main className="content mr-3 ml-5 w-100 ">
                    <Row className="w-100">
                        <Col md={11}> 
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
                        </Col>
                    </Row>
                </main>
            }
            {
                documentObject.update && 
                documentObject.action && 
                documentObject.action!== VIEW_DOCUMENT && 
                documentObject.frames &&  
                <DocumentFrames/>
            }

            {
                documentObject.update && 
                documentObject.action ==  VIEW_DOCUMENT &&  
                documentObject.currentDocument && 
                documentObject.filledFrame &&  
                <DocumentInfo/>
            }

        </Row>
        </React.Fragment>


}