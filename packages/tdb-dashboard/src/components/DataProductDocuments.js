import React from "react"
import {WOQLClientObj} from '../init-woql-client'
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {QueryPaneObj} from "../hooks/queryPaneContext"
import {DatabaseInfoControl} from "../hooks/DatabaseInfoControl"
import {getPropertiesOfClass, getPropertyRelation, getDocumentClasses} from '../queries/GeneralQueries'
import {Button, Badge} from "react-bootstrap"
import {BiPlus} from "react-icons/bi"

export const DataProductDocuments = () => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const {addQueryPane} = QueryPaneObj() 

    const { 
        setCurrentClass,
        currentClass,
        setQuery,
        properties,
        classes} = DatabaseInfoControl(woqlClient, dataProduct) 

    function handleClassClick (id) {
        let q = getPropertiesOfClass(id, dataProduct, woqlClient)
        setCurrentClass(id)
        setQuery(q)
    }

    function handlePropertyClick (property) {
        let q = getPropertyRelation(property, dataProduct, woqlClient)
        addQueryPane(q)
    }

    return <SubMenu title={"Document Types"} className="menu-title">
       {classes && classes.map(item => 
            <MenuItem id={item["Class ID"]} icon={false} className="sub-menu-title">
                <Button className="pro-item-content btn-sm" 
                    variant="dark" 
                    title={`View documents of type ${item["Class Name"]["@value"]}`}
                    onClick={(e) => handleClassClick(item["Class ID"])}>
                    
                    <span className="text-gray">{item["Class Name"]["@value"]}</span>
                    <Badge title={`${item["Count"]["@value"]} ${item["Class Name"]["@value"]} available`}
                    className="ml-3 cursor-auto text-gray" 
                    variant="dark">{item["Count"]["@value"]}</Badge>

                </Button>

                {properties && properties.map(property => {
                    if(property["Property Domain"] == item["Class ID"])
                        return  <MenuItem>
                            <Button className="pro-item-content btn-sm" variant="light" onClick={(e) => handlePropertyClick(property["Property ID"])}>
                                {property["Property Name"]["@value"]}
                            </Button>
                        </MenuItem>})
                }
            </MenuItem>)
        }    
    </SubMenu>
}

export const DocumentExplorerDocuments = () => {
    const {woqlClient, dataProduct, sidebarDocumentListState, setSidebarDocumentListState} = WOQLClientObj()

    const {classes} = DatabaseInfoControl(woqlClient, dataProduct) 

    return <SubMenu title={"Document Types"}
        className="menu-title"
        defaultOpen={sidebarDocumentListState}
        onOpenChange={(e) => setSidebarDocumentListState(e)}>
    {classes && classes.map(item => 
         <MenuItem id={item["Class ID"]} icon={false} className="sub-menu-title">
             <Button className="pro-item-content btn-sm" 
                 variant="dark" 
                 title={`View documents of type ${item["Class Name"]["@value"]}`}
                 onClick={(e) => handleClassClick(item["Class ID"])}>
                 
                 <span className="text-gray">{item["Class Name"]["@value"]}</span>
                 <Badge title={`${item["Count"]["@value"]} ${item["Class Name"]["@value"]} available`}
                 className="ml-3 cursor-auto text-gray" 
                 variant="dark">{item["Count"]["@value"]}</Badge>
                 <Badge variant="dark" className="ml-3" title={`Add a new ${item["Class Name"]["@value"]}`}>
                    <BiPlus style={{fontSize: "14px"}} color="#fff"/>
                </Badge>

             </Button>
        </MenuItem>)}
    </SubMenu>
}