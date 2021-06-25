import React, {useState, useEffect} from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {CREATE_NEW_DOCUMENT_BUTTON, SEARCH_DOCUMENTS_PLACEHOLDER} from "./constants"
import {Badge, Button, Card, Form} from "react-bootstrap"
import {DocumentConrtol} from "../hooks/DocumentControl"
import {WOQLTable} from '@terminusdb-live/tdb-react-components'
import {ControlledQueryHook} from '@terminusdb-live/tdb-react-components'
import {getDocumentOfTypeTabConfig} from "./ViewConfig"
import {WOQLClientObj} from '../init-woql-client'
import {SearchBox} from "./SearchBox"
import {getDocumentTools} from "./DocumentActions"

export const DocumentView = () => {
    const {woqlClient, setCurrentDocument, currentDocument} = WOQLClientObj()

    const [tableConfig, setTableConfig] = useState(false)

    const {
        documentTypeDataProvider,
        documentsOfTypeQuery
    } = DocumentConrtol()

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
    } = ControlledQueryHook(woqlClient, documentsOfTypeQuery, false, 20)
 
    useEffect(() => {
        let tConf = getDocumentOfTypeTabConfig(result, getDocumentTools)
        setTableConfig(tConf)
    }, [result])

    return  <main className="content mr-3 ml-5 w-100">
        <TDBReactButton config={CREATE_NEW_DOCUMENT_BUTTON}/>

        {result && currentDocument && <Card className="mt-4 mr-5" varaint="light"> 
            <Card.Header>
                <h6>Documents of type - <strong className="text-success">{currentDocument}</strong></h6>
            </Card.Header>
            <Card.Body>
                <WOQLTable
                    result={result}
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
    </main>
}