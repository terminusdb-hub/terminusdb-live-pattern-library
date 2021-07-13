import React, {useState, useEffect} from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {CREATE_NEW_DOCUMENT_BUTTON, SEARCH_DOCUMENTS_PLACEHOLDER} from "./constants"
import SplitPane from 'react-split-pane'
import {handleWidthChange} from "../pages/utils"
import {Badge, Button, Card, Form} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {WOQLTable} from '@terminusdb-live/tdb-react-components'
import {ControlledQueryHook} from '@terminusdb-live/tdb-react-components'
import {getDocumentOfTypeTabConfig} from "./ViewConfig"
import {WOQLClientObj} from '../init-woql-client'
import {SearchBox} from "./SearchBox"
import {AiOutlinePlus} from "react-icons/ai"

export const DocumentView = () => {
    const {woqlClient} = WOQLClientObj()

    const [width, setWidth] = useState("")
    const [tableConfig, setTableConfig] = useState(false)

    const {
        documentTypeDataProvider,
        setCurrentDocument,
        currentDocument,
        documentsOfTypeQuery
    } = DocumentControl()
    
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
        let tConf = getDocumentOfTypeTabConfig(result)
        setTableConfig(tConf)
    }, [result])

    const DocumentOptions = ({documentTypeDataProvider}) => {
        let opts = []
        documentTypeDataProvider.map(item => {
            opts.push(
                <option value={item["Class ID"]}>{item["Class Name"]["@value"]}</option>
            )
        })
        return opts
    }

    const SearchDocuments = ({documentTypeDataProvider}) => {

        function handleOnChnage(e) {
            let selected = e.target.value
            setCurrentDocument(selected)
        }

        return <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" 
                    class="form-control" id="formControlSelect"
                    defaultValue={SEARCH_DOCUMENTS_PLACEHOLDER} 
                    onChange={handleOnChnage}>
                    <DocumentOptions documentTypeDataProvider={documentTypeDataProvider}/>
                </Form.Control>
            </Form.Group>
        </Form>
    }
    

    export const DocumentClassList = ({documentTypeDataProvider}) => {
        if(!documentTypeDataProvider) return []
        let list = []

        function handleSelectedDocument (item) {
            setCurrentDocument(item["Class ID"])
        }

        documentTypeDataProvider.map(item => {
            list.push(
                <div style={{margin: "1rem 1rem 0rem 5rem"}} className="d-flex">
                    <Button variant="light" size="sm" onClick={(e) => handleSelectedDocument(item)}>
                        {item["Class Name"]["@value"]}
                        <Badge variant="dark" className="ml-3">{item["Count"]["@value"]}</Badge>
                    </Button>
                    <AiOutlinePlus className="mr-3"/>
                </div>
            )
        })
        return <React.Fragment>
            <div style={{margin: "1rem 1rem 0rem 5rem"}}>
                <SearchDocuments documentTypeDataProvider={documentTypeDataProvider}/>
            </div>
            
            {list}
        </React.Fragment>
    }

    return  <main className="content mr-3 ml-5 w-100">
        <TDBReactButton config={CREATE_NEW_DOCUMENT_BUTTON}/>
        <SplitPane split="vertical"
            defaultSize="20%"
            onChange={size => handleWidthChange(size, setWidth)}>

                <DocumentClassList documentTypeDataProvider={documentTypeDataProvider}/>
                {result && currentDocument && <Card className="m-5" varaint="light"> 
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
        </SplitPane>      
    </main>
}


import React, {useState, useEffect} from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {CREATE_NEW_DOCUMENT_BUTTON} from "./constants"
import {DocumentControl} from "../hooks/DocumentControl"
import {CardGroup, Card, Row, Col, DropdownButton, ButtonGroup, Dropdown} from "react-bootstrap"
import {trimText} from "./utils"

export const DocumentView = () => {

    const [dataProvider, setDataProvider]=useState(false)
    
    const {
        documentTypeDataProvider,
        setCurrentDocument,
        currentDocument,
        documentsOfTypeQuery
    } = DocumentControl()

    useEffect(() => {
        setDataProvider(documentTypeDataProvider)
    }, [documentTypeDataProvider])

    const DocumentCard = ({dataProvider}) => {
        if(!dataProvider) return []
        let card = []
        dataProvider.map(item => {
            card.push(
                <Col md={3}>
                    <Card className="m-2 mb-3">
                        <Card.Header className="d-flex w-100">
                            <Col md={9}>
                                <h5 className="text-gray">{item["Class Name"]["@value"]}</h5>  
                            </Col>
                            <Col md={3} className="text-right">
                                <h5 className="text-gray">{item["Count"]["@value"]}</h5> 
                            </Col>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className="document-description-card-text text-muted">
                                {trimText(item["Description"]["@value"])}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                 
            )
        })
        return card
    }


    const DocumentTypeGrid = ({dataProvider}) => {
        return <Row className="w-100">
            <DocumentCard dataProvider={dataProvider}/>
        </Row>
    }

    const DropDownList = ({dataProvider}) => {
        if(!dataProvider) return []
        let arr = []
        dataProvider.map(item => {
            arr.push(
                <Dropdown.Item eventKey={item["Class ID"]}>
                    {item["Class Name"]["@value"]}
                </Dropdown.Item>
            )
        })
        return arr
    }

    return  <main className="content mr-5 ml-5 mt-3 w-100">

        <DropdownButton as={ButtonGroup} 
            title={CREATE_NEW_DOCUMENT_BUTTON.label} 
            variant="info"
            id="bg-nested-dropdown">
            <DropDownList dataProvider={dataProvider}/>
        </DropdownButton>

        {/*<TDBReactButton config={CREATE_NEW_DOCUMENT_BUTTON}/>*/}
        {/*<div className="query-pane-pallet mb-3 mt-3 mr-4" >
            <DocumentTypeGrid dataProvider={dataProvider}/>
        </div>*/}
        
    </main>
}