
import React, {useState, useEffect} from "react"
import {ListGroup} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {getCountOfDocumentClass, getTotalNumberOfDocuments} from "../queries/GeneralQueries"
import {executeQueryHook} from "../hooks/executeQueryHook"
import {WOQLClientObj} from '../init-woql-client'

export const DocumentSummary = () => {

    const {documentClasses} = DocumentControl()
    const {woqlClient} = WOQLClientObj()


    // set constants for query to get count of document class instances 
    const [query, setQuery] = useState(false)
    var [dataProvider]=executeQueryHook(woqlClient, query)

    // get total count of all documents 
    const [totalDocumentsQuery, setTotalDocumentsQuery]=useState(false)
    var [dataProviderCount]=executeQueryHook(woqlClient, totalDocumentsQuery)


    useEffect(() => {
        if(!documentClasses) return 
        let q=getCountOfDocumentClass(documentClasses)
        setQuery(q)
        let totalQ=getTotalNumberOfDocuments(documentClasses)
        setTotalDocumentsQuery(totalQ)
    }, [documentClasses])

    

    const DocumentStats = ({dataProvider}) => {
        let arr=[]
        for (var key in dataProvider[0]) { 
            let val = dataProvider[0][key]["@value"]
            arr.push(
                <ListGroup.Item className="d-flex">
                    <h6 className="text-muted fw-bold col-md-11">{key}</h6>
                    <h6 className="float-right">{val}</h6>
                </ListGroup.Item>
            )
        }
        return arr
    }

    const TotalDocuments = ({dataProviderCount}) => {
        var count =0
        for (var key in dataProviderCount[0]) { 
            if(key == "Count") {
                count = dataProviderCount[0][key]["@value"]
            }
        }

        return <span className="d-flex "> 
            <h6 className="text-muted fw-bold mr-2 mb-2">Total Documents</h6>
            <h6 className="float-right">{count}</h6>
        </span>
    }

    return <React.Fragment>
            <ListGroup className="col-md-12">
                {dataProviderCount && <TotalDocuments dataProviderCount={dataProviderCount}/>}
                {dataProvider && <DocumentStats dataProvider={dataProvider}/>}
            </ListGroup>
        </React.Fragment>
}