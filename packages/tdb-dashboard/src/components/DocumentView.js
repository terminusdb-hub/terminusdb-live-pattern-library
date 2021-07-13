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
import {getDocumentTools} from "./DocumentActions"
import {CreateDocument} from "./CreateDocument"

export const DocumentView = () => {
    const {
        woqlClient, 
        setCurrentDocument, 
        currentDocument,
        createDocument
    } = WOQLClientObj()

    const [tableConfig, setTableConfig] = useState(false)

    const {
        documentTypeDataProvider,
        documentsOfTypeQuery
    } = DocumentControl() 

    const {
        updateQuery,
        changeOrder,
        changeLimits,
        chosenDocument,
        result,
        limit,
        start,
        orderBy,
        loading,
        rowCount,
        documentResults
    } = ControlledGetDocumentQuery(woqlClient, currentDocument, false, 20)
 
    useEffect(() => {
        //if(!documentResults) return
        let tConf = getDocumentOfTypeTabConfig(documentResults, getDocumentTools)
        setTableConfig(tConf)
    }, [documentResults])

    console.log("documentResults", documentResults)

    return  <main className="content mr-3 ml-5 w-100">
        {/*<TDBReactButton config={CREATE_NEW_DOCUMENT_BUTTON}/>*/}


        {documentResults && currentDocument && !createDocument && <Card className="mt-4 mr-5" varaint="light"> 
            <Card.Header>
                <h6>Documents of type - <strong className="text-success">{currentDocument}</strong></h6>
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
                    query={documentsOfTypeQuery}
                    loading={loading}
                    totalRows={rowCount}
                />
            </Card.Body>
        </Card>}

        {createDocument && <CreateDocument/>}
    </main>
}