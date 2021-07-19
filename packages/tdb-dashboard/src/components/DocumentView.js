import React, {useState, useEffect} from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {CREATE_NEW_DOCUMENT_BUTTON, SEARCH_DOCUMENTS_PLACEHOLDER} from "./constants"
import {Card} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {WOQLTable} from '@terminusdb-live/tdb-react-components'
import {ControlledGetDocumentQuery} from '@terminusdb-live/tdb-react-components'
import {getDocumentOfTypeTabConfig} from "./ViewConfig"
import {WOQLClientObj} from '../init-woql-client'
import {SearchBox} from "./SearchBox"
import {getDocumentTools, getDeleteTool, getCopyIDTool} from "./DocumentActions"
import {CreateDocument} from "./CreateDocument"
import {DocumentInfo} from "./DocumentInfo"
import {getColumnsFromResults} from "./utils"

export const DocumentView = () => {

    const {
        woqlClient,
        currentdocumentClass,
        createNewDocument,
        currentDocument,
        setCurrentDocument,
        setCreateNewDocument,
        setCurrentDocumentClass
    } = WOQLClientObj()

    const [tableConfig, setTableConfig] = useState(false)

    const {
        currentDocumentInfo
    } = DocumentControl() 

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
        setRefresh,
        refresh
    } = ControlledGetDocumentQuery(woqlClient, currentdocumentClass, false, 20)

    // on change of class clicked on left side bar => reset
    useEffect(() => {
        setTableConfig(false)
        setRefresh(refresh+1)
    }, [currentdocumentClass])

    // on click document tablw row
    function onRowClick (row) { 
        setCreateNewDocument(false)
        setCurrentDocumentClass(false)
        setCurrentDocument(row.original["@id"])
    }

    useEffect(() => { // set table view config
        if(!documentResults) return 
        let tConf = getDocumentOfTypeTabConfig(documentResults, getDeleteTool, getCopyIDTool, onRowClick)
        setTableConfig(tConf)
    }, [documentResults])

    return  <main className="content mr-3 ml-5 w-100">
        {documentResults && tableConfig && <Card className="mt-4 mr-5" varaint="light"> 
            <Card.Header>
                <h6>Documents of type - <strong className="text-success">{currentdocumentClass}</strong></h6>
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
        </Card>}

        {createNewDocument && <CreateDocument/>}
        {currentDocument && !createNewDocument && <DocumentInfo documentIdInfo={currentDocumentInfo} chosenDocument={currentDocument}/>}
    </main>


}