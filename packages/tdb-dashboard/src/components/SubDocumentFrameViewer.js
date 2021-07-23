import React from "react"
import {Card} from "react-bootstrap"
import {isDataType, isClassType, isSetType, isOptionalType, isEnumType, isSubDocumentType} from "./utils"
import {DataTypeFrame} from "./DataTypeFrame"
import {ClassTypeFrame} from "./ClassTypeFrame"
import {ClassSetTypeFrame} from "./ClassSetTypeFrame"
import {OptionalFrames} from "./OptionalFrames"
import {EnumTypeFrame} from "./EnumTypeFrame"
import {SubDocumentTypeFrame} from "./SubDocumentTypeFrame"
import {DocumentControl} from "../hooks/DocumentControl"

export const SubDocumentFrameViewer = ({property, documentFrame, handleChange, handleSelect}) => {

    const {
        documentClasses,
    } = DocumentControl()


    function renderProperties (documentFrame) {
        let frame=documentFrame
        let props = [] 

        for(var item in frame){
            if(frame[item] && isDataType(frame[item])) { // datatype properties like xsd:/ xdd:
                props.push(<DataTypeFrame property={item} type={frame[item]} onChange={handleChange}/>)
            }
            else if (frame[item] && isClassType(frame[item], documentClasses)){ // Other documents
                props.push(<ClassTypeFrame property={item} type={frame[item]} onChange={handleSelect}/>) 
            } 
            else if (frame[item] && isEnumType(frame[item])) { // enums
                props.push(<EnumTypeFrame property={item} type={frame[item]} onChange={handleSelect}/>)
            }
            else if (frame[item] && isSubDocumentType(frame[item])) { // subdocuments
                props.push(<SubDocumentTypeFrame property={item} type={frame[item]} onChange={handleSelect}/>)
            }
            else if(frame[item] && isSetType(frame[item], documentClasses)) { // set documents
                props.push(<ClassSetTypeFrame property={item} object={frame[item]} onChange={handleChange}/>)
            }
            else if (frame[item] && isOptionalType(frame[item])) { // if Optional xsd:/ xdd:
                props.push(<OptionalFrames property={item} object={frame[item]} onChange={handleChange}/>)
            }
          
        }
        return props
    }

    return <Card bg="secondary" className="ml-5 mt-2 mb-2">
        <Card.Header> {property}</Card.Header>
        <Card.Body>
            {renderProperties(documentFrame)}
        </Card.Body>
    </Card>
}