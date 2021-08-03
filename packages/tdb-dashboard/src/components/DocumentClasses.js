import React, {useState, useEffect} from "react"
import {DocumentControl} from "../hooks/DocumentControl"
import {BiPlus} from "react-icons/bi"
import {CREATE_NEW_DOCUMENT_BUTTON, SEARCH_DOCUMENTS_PLACEHOLDER} from "./constants"
import {Badge, Button, Card, Form} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
 
export const DocumentClasses = () => { 
    const {setCurrentDocument, currentDocument} = WOQLClientObj()

    const [dataProvider, setDataProvider]=useState(false)
    
    const {
        documentTypeDataProvider,
        documentsOfTypeQuery,
    } = DocumentControl() 

    useEffect(() => {
        setDataProvider(documentTypeDataProvider)
    }, [documentTypeDataProvider])


    function handleSelectedDocument (item) {
        setCurrentDocument(item["Class ID"])
    }

    const DocumentOptions = ({dataProvider}) => {
        if(!dataProvider) return []
        let opts = []
        dataProvider.map(item => {
            opts.push(
                <option value={item["Class ID"]}>{item["Class Name"]["@value"]}</option>
            )
        }) 
        return opts
    }


    const SearchDocuments = ({dataProvider}) => {
        if(!dataProvider) return []
        function handleOnChnage(e) {
            let selected = e.target.value
            setCurrentDocument(selected)
        }

        return <Form className="mr-3">
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" 
                    class="form-control" id="formControlSelect"
                    defaultValue={SEARCH_DOCUMENTS_PLACEHOLDER} 
                    onChange={handleOnChnage}>
                    <DocumentOptions dataProvider={dataProvider}/>
                </Form.Control>
            </Form.Group>
        </Form>
    }
    
    const List =({dataProvider}) => {
        if(!dataProvider) return []
        let list = []
        dataProvider.map(item => {
            list.push(
                <Button variant="dark" size="sm" 
                    className="mr-1 mb-1 m-1" 
                    title={`View documents of type ${item["Class Name"]["@value"]}`}
                    onClick={(e) => handleSelectedDocument(item)}>
                    {item["Class Name"]["@value"]}
                    <Badge variant="primary" 
                        className="ml-3 cursor-auto" 
                        title={`${item["Count"]["@value"]} ${item["Class Name"]["@value"]} available`}>
                            {item["Count"]["@value"]}
                    </Badge>
                    <Badge variant="dark" className="ml-3" title={`Add a new ${item["Class Name"]["@value"]}`}>
                        <BiPlus style={{fontSize: "14px"}} color="#fff"/>
                    </Badge>
                </Button>
            )
        })

        return list
    }


    return <React.Fragment>
        <SearchDocuments dataProvider={dataProvider}/>
        <div  className="flex-column">
            <List dataProvider={dataProvider}/>
        </div>
    </React.Fragment>

}