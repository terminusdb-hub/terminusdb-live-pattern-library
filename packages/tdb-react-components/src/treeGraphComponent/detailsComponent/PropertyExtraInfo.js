import React ,{Fragment,useState} from 'react';
import {BaseSelectComponent} from './BaseSelectComponent'
import {BaseInputElement} from './BaseInputElement'
import {GraphContextObj} from '../hook/graphObjectContext'; 
import {CARDINALITY_MIN_TITLE,CARDINALITY_MAX_TITLE} from '../../constants/details-labels';

/* Nuking cardinality for now as db dosent support this - later we will implement */
//const dataProvider = ['Null','Optional','List','Set','Cardinality','Cardinality_Between']
const dataProvider = ['Null','Optional','List','Set']

export const PropertyExtraInfo =(props)=>  {
    const {mainGraphObj} =GraphContextObj()
    const extraInfoValue = props.extraInfoValue || {}
    const [currentOption,setOption] = useState(extraInfoValue.option || '') 

    const optionChange=(propName, propValue)=>{
        setOption(propValue)
        mainGraphObj.setPropertyInfo(props.propObj,propName,propValue)
    }
    const changePropertyValue=(propName, propValue)=>{
        mainGraphObj.setPropertyInfo(props.propObj,propName,propValue)
    }

    const cardCheckValue=(propName,propValue)=>{
        /*if(propValue.trim()==='' || parseFloat(propValue)>0){
            if(propName==='min_cardinality')setMinError("")
            if(propName==='max_cardinality')setMaxError("")
            return true
        }
        if(propName==='min_cardinality')setMinError("Please enter a valid number >0")
        if(propName==='max_cardinality')setMaxError("Please enter a valid number >0")
        return false*/
        return true
    }

    return <Fragment>
            <BaseSelectComponent optionChange={optionChange} name="option" dataProvider={dataProvider} defaultValue={currentOption} title={'Extra info'} />             
            {/*currentOption === 'Cardinality_Between' &&
                <Fragment>
                    <BaseInputElement help="card_min" defaultValue={extraInfoValue.min_cardinality || ''} name='min_cardinality' title={CARDINALITY_MIN_TITLE} onBlur={changePropertyValue} checkValue={cardCheckValue}/>
                    <BaseInputElement help="card_max" defaultValue={extraInfoValue.max_cardinality || ''} name='max_cardinality' title={CARDINALITY_MAX_TITLE} onBlur={changePropertyValue} checkValue={cardCheckValue}/>
                </Fragment>
            */}
            {/*currentOption === 'Cardinality' &&
                <Fragment>
                    <BaseInputElement help="card_min" defaultValue={extraInfoValue.cardinality || ''} name='cardinality' title={'Cardinality'} onBlur={changePropertyValue} checkValue={cardCheckValue}/>
                </Fragment>
            */}         					
       </Fragment>
}