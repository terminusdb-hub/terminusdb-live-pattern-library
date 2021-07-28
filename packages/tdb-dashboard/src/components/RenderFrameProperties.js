import React from "react"
import {DataTypeFrame} from "./DataTypeFrame"
import {ClassTypeFrame} from "./ClassTypeFrame"
import {ClassSetTypeFrame} from "./ClassSetTypeFrame"
import {OptionalFrames} from "./OptionalFrames"
import {EnumTypeFrame} from "./EnumTypeFrame"
import {SubDocumentTypeFrame} from "./SubDocumentTypeFrame"
import {isDataType, isClassType, isSetType, isOptionalType, isEnumType, isSubDocumentType} from "./utils"

export const RenderFrameProperties = ({documentObject, documentClasses, handleChange, handleSelect, handleSetSelect, formFields, setFormFields, propertyID}) => {

    function renderProperties (documentObject) {
        let props = [] 
        let frame = documentObject.frames
        for(var item in frame){
            if(frame[item] && isDataType(frame[item])) { // datatype properties like xsd:/ xdd:
                props.push(<DataTypeFrame documentObject={documentObject} property={item} type={frame[item]} onChange={handleChange} propertyID={propertyID}/>)
            }
            else if (frame[item] && isClassType(frame[item], documentClasses)){ // Other documents
                props.push(<ClassTypeFrame documentObject={documentObject}  property={item} type={frame[item]} onChange={handleSelect} propertyID={propertyID}/>) 
            } 
            else if (frame[item] && isEnumType(frame[item])) { // enums
                props.push(<EnumTypeFrame documentObject={documentObject}  property={item} type={frame[item]} onChange={handleSelect} propertyID={propertyID}/>)
            }
            else if (frame[item] && isSubDocumentType(frame[item])) { // subdocuments
                props.push(<SubDocumentTypeFrame documentObject={documentObject}  property={item} type={frame[item]} setFormFields={setFormFields} formFields={formFields} propertyID={propertyID}/>)
            }
            else if(frame[item] && isSetType(frame[item], documentClasses)) { // set documents
                props.push(<ClassSetTypeFrame documentObject={documentObject}  property={item} object={frame[item]} onChange={handleSetSelect} propertyID={propertyID}/>)
            }
            else if (frame[item] && isOptionalType(frame[item])) { // if Optional xsd:/ xdd:
                props.push(<OptionalFrames documentObject={documentObject}  property={item} object={frame[item]} onChange={handleChange} propertyID={propertyID}/>)
            }
            
        }
        return props 
    }

    return  <React.Fragment>
        {renderProperties(documentObject)}
    </React.Fragment>
    
}