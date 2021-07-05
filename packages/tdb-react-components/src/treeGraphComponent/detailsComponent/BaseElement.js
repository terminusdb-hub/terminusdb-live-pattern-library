import React,{useState,useEffect, Fragment} from 'react';
import {ELEMENT_BASE_CONST}  from '../../constants/details-labels.js';
import {RemoveElementComponent} from './RemoveElementComponent';
import PropTypes from "prop-types";
import {BaseInputElement} from './BaseInputElement';
import {BaseTextareaElement} from './BaseTextareaElement';
import {BaseCheckboxElement} from './BaseCheckboxElement';
import {KeyComponent} from './KeyComponent';

export const BaseElement = (props)=>{	
    const [indexError,setIndexError]=useState(false);
    const nodeJsonData=props.nodeJsonData || {}
    const nodeSchemaData=props.nodeSchemaData || {}
    //const subdocument_disabled = nodeSchemaData.subdocument_disabled === true ? {disabled:true} : {}

    const changeElement=(name,value)=>{
        let val=value;
        if(name === 'id'){ 
            val = value.trim();
            if(val.indexOf(" ")>-1){
                setIndexError("Please remove all the white space");
                return;
            }
            if(val===""){
                setIndexError("Please enter a valid ID");
                return;
            }
            setIndexError(false);
        }
        if(props.updateValue){
            props.updateValue(name,val)
        }
    }

    useEffect(() => {
        setIndexError(false);
    },[nodeJsonData])

    return(
   	    <div className="tdb__panel__box">
            <RemoveElementComponent 
                hasConstraints={props.hasConstraints} 
                elementId={nodeJsonData.name}
                elementType={nodeJsonData.type}
                removeElement={props.removeElement}/>
       	    	{props.isNodeObject && nodeJsonData.type!=='ChoiceClass' && 
                    <Fragment>
                        <BaseCheckboxElement title={'Abstract'} help={"abstract"} name='abstract' defaultValue={nodeSchemaData.abstract} onBlur={changeElement} />
                    </Fragment>
                }
                <BaseInputElement
                    autoFocus={true} 
                    disabled={!nodeJsonData.newElement}
                    title={`${ELEMENT_BASE_CONST.ID_TEXT} *` }
                    placeholder={ELEMENT_BASE_CONST.ID_PLACEHOLDER}
                    name='id'
                    panelName={nodeJsonData.name}
                    help={"class_id"}
                    onBlur={changeElement}
                    defaultValue={nodeSchemaData.id}
                    itemError={indexError}
                    />
                {props.isNodeObject  && nodeJsonData.type!=='ChoiceClass' && 
                    <KeyComponent/>
                }
                {props.children}
	            <BaseTextareaElement
                    placeholder={ELEMENT_BASE_CONST.DESCRIPTION_PLACEHOLDER} 
                    title={ELEMENT_BASE_CONST.DESCRIPTION_TEXT}
                    name='comment'
                    help={"class_comment"}
                    onBlur={changeElement}
                    defaultValue={nodeSchemaData.comment || ''}
            />
    	</div>
    )
}

BaseElement.propTypes = {
    nodeJsonData:PropTypes.object,
    nodeSchemaData:PropTypes.object,
    isNodeObject:PropTypes.bool,
    hasConstraints:PropTypes.bool
}

BaseElement.defaultProps = {
    nodeJsonData: {},
    nodeSchemaData:{},
    isNodeObject:true,
    hasConstraints:false
};