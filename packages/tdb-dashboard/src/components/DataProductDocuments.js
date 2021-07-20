import React, {useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {QueryPaneObj} from "../hooks/queryPaneContext"
//import {DatabaseInfoControl} from "../hooks/DatabaseInfoControl"
import {DocumentControl} from "../hooks/DocumentControl"
import {getPropertiesOfClass, getPropertyRelation, getDocumentClasses} from '../queries/GeneralQueries'
import {Button, Badge, ButtonGroup} from "react-bootstrap"
import {BiPlus} from "react-icons/bi"
import {SearchBox} from "./SearchBox"

export const DataProductDocuments = () => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const {addQueryPane} = QueryPaneObj() 

    /*//const { 
        setCurrentClass,
        currentClass,
        setQuery,
        properties,
        classes} = DatabaseInfoControl(woqlClient, dataProduct) */

    const {
        documentClasses,
        documentCount
    } = DocumentControl(dataProduct)

    // search docs constant
    const [searchDocument, setSearchDocument]=useState(false)


    function handleClassClick (id) {
        /*let q = getPropertiesOfClass(id, dataProduct, woqlClient)
        setCurrentClass(id)
        setQuery(q)*/
    }

    function handlePropertyClick (property) {
        /*let q = getPropertyRelation(property, dataProduct, woqlClient)
        addQueryPane(q)*/
    }

    const GetCountBadge = ({id, documentCount}) => {
        if (!documentCount) return <div/>
        for (var c=0; c<documentCount.length; c++) {
            let item = documentCount[c] 
            for (var key in item) { 
                if (key == id) {
                    let count = item[key]
                    return <Badge title={`${count} ${id} available`}
                        className="ml-3 cursor-auto text-gray" 
                        variant="dark">{count}</Badge>
                }
            }
        }
        return <Badge title={`${0} ${id} available`}
            className="ml-3 cursor-auto text-gray" 
            variant="dark">{0}</Badge>
        
    }

    const DocumentMenu = ({item, handleClassClick}) => {
        return <MenuItem id={item["@id"]} icon={false} className="sub-menu-title">
            <Button className="pro-item-content btn-sm" 
                variant="dark" 
                title={`View documents of type ${item["@id"]}`}
                onClick={(e) => handleClassClick(item["@id"])}>
                
                <span className="text-gray">{item["@id"]}</span>
                <GetCountBadge id={item["@id"]} documentCount={documentCount}/>

            </Button>

            {/*properties && properties.map(property => {
                if(property["Property Domain"] == item["Class ID"])
                    return  <MenuItem>
                        <Button className="pro-item-content btn-sm" variant="light" onClick={(e) => handlePropertyClick(property["Property ID"])}>
                            {property["Property Name"]["@value"]}
                        </Button>
                    </MenuItem>})
            */}
        </MenuItem>
    }


    return <SubMenu title={"Document Types"} className="menu-title">
       <SearchBox placeholder={"Search for a Document Class"} onChange={setSearchDocument}/>
       {documentClasses && documentClasses.map(item => {
            if(!searchDocument) {
                return <DocumentMenu item={item} handleClassClick={handleClassClick}/>
            }
            if(searchDocument && (item["@id"].includes(searchDocument))) {
                return <DocumentMenu item={item} handleClassClick={handleClassClick}/>
            }
        })
        }    
    </SubMenu>
}

export const DocumentExplorerDocuments = () => { 

    const {
        woqlClient, 
        dataProduct, 
        sidebarDocumentListState, 
        setSidebarDocumentListState, 
        setCurrentDocumentClass,
        setCreateNewDocument,
        setCurrentDocument,
        setDocumentMode
    } = WOQLClientObj()

    //const {classes} = DatabaseInfoControl(woqlClient, dataProduct) 
    const {
        documentClasses
    } = DocumentControl(dataProduct)

    // on select of a class
    function handleClassClick (id) {
        setCreateNewDocument(false)
        setCurrentDocument(false)
        setCurrentDocumentClass(id)
    }

    // on create on new document
    function handleCreate (id) {
        setCurrentDocumentClass(false)
        setCurrentDocument(false)
        setCreateNewDocument(id)
    }

    // search docs constant
    const [searchDocument, setSearchDocument]=useState(false)


    const DocumentMenu = ({item, handleCreate}) => {
        return <MenuItem id={item["@id"]} icon={false} className="sub-menu-title">
            <ButtonGroup>
                <Button className="pro-item-content btn-sm" 
                    variant="dark" 
                    title={`View documents of type ${item["@id"]}`}
                    onClick={(e) => handleClassClick(item["@id"])}>
                        
                        <span className="text-gray">{item["@id"]}</span>
                        
                </Button>
                <Button 
                    className="pro-item-content btn-sm" 
                    variant="dark"
                    title={`Add a new ${item["@id"]}`}
                    onClick={(e) => handleCreate(item["@id"])}>
                        <Badge variant="dark">
                            <BiPlus style={{fontSize: "14px"}} color="#fff" onClick={handleCreate}/>
                        </Badge>
                </Button>
            </ButtonGroup>
        </MenuItem>
    }


    return <SubMenu title={"Document Types"}
        className="menu-title"
        defaultOpen={sidebarDocumentListState}
        onOpenChange={(e) => setSidebarDocumentListState(e)}>
        
        <SearchBox placeholder={"Search for a Document Class"} onChange={setSearchDocument}/>

        {documentClasses && documentClasses.map(item => {
            if (item["@type"] == "Class") {
                if(!searchDocument) {
                    return <DocumentMenu handleCreate={handleCreate} item={item}/>
                }
                if(searchDocument && (item["@id"].includes(searchDocument))) {
                    return <DocumentMenu handleCreate={handleCreate} item={item}/>
                }
            }
        })}
    </SubMenu>
}

