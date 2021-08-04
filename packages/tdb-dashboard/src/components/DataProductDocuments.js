import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {QueryPaneObj} from "../hooks/queryPaneContext"
//import {DatabaseInfoControl} from "../hooks/DatabaseInfoControl"
import {getPropertiesOfClass, getPropertyRelation, getDocumentClasses} from '../queries/GeneralQueries'
import {Button, Badge, ButtonGroup} from "react-bootstrap"
import {BiPlus} from "react-icons/bi"
import {SearchBox} from "./SearchBox"
import {getCountOfDocumentClass} from "../queries/GeneralQueries"
import { executeQueryHook } from "../hooks/executeQueryHook"
import {CREATE_DOCUMENT, FORM_VIEW} from "./constants"
import {handleCreate} from "./documents.utils"

export const DataProductDocuments = () => {
    const {
        woqlClient, 
        dataProduct,
        documentClasses
    } = WOQLClientObj()
    const {addQueryPane} = QueryPaneObj() 

    const [query, setQuery]=useState(false)
    var [dataProvider]=executeQueryHook(woqlClient, query)

    /*//const { 
        setCurrentClass,
        currentClass,
        setQuery,
        properties,
        classes} = DatabaseInfoControl(woqlClient, dataProduct) */

 
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

    useEffect(() => { // get count of document classes
        if(!documentClasses) return 
        let q=getCountOfDocumentClass(documentClasses)
        setQuery(q)
    }, [documentClasses])

    // get count of document class to display in badge 
    const GetCountBadge = ({id, dataProvider}) => {
        var val
        for (var doc in dataProvider[0]) { 
            if(doc == id) val = dataProvider[0][doc]["@value"]
        }
        return <Badge title={`${val} ${id} available`}
            className="ml-3 cursor-auto text-gray" 
            variant="dark">{val}</Badge>
    }

    const DocumentMenu = ({item, handleClassClick}) => {
        return <MenuItem id={item["@id"]} icon={false} className="sub-menu-title">
            <Button className="pro-item-content btn-sm" 
                variant="dark" 
                title={`View documents of type ${item["@id"]}`}
                onClick={(e) => handleClassClick(item["@id"])}>
                
                <span className="text-gray">{item["@id"]}</span>
                {dataProvider && <GetCountBadge id={item["@id"]} dataProvider={dataProvider}/>}

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
        dataProduct, 
        sidebarDocumentListState, 
        setSidebarDocumentListState, 
        documentObject, 
        setDocumentObject,
        documentClasses
    } = WOQLClientObj()

    // on select of a class
    function handleClassClick (id) {
        setDocumentObject({
            type: id,
            action: false,
            view: false,
            submit: false,
            currentDocument: false,
            frames: {},
            update:Date.now(),
            message: false,
            loading: false
        })
    }

    // search docs constant
    const [searchDocument, setSearchDocument]=useState(false)

    const DocumentMenu = ({item}) => {
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
                    onClick={(e) => handleCreate(item["@id"], setDocumentObject)}>
                        <Badge variant="dark">
                            <BiPlus style={{fontSize: "14px"}} color="#fff" />
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
                    return <DocumentMenu item={item}/>
                }
                if(searchDocument && (item["@id"].includes(searchDocument))) {
                    return <DocumentMenu  item={item}/>
                }
            }
        })}
    </SubMenu>
}

