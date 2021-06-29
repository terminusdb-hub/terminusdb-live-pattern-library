import React from 'react'
import {BasePropertyComponent} from './BasePropertyComponent'; 
import {BaseSelectReactElement} from './BaseSelectReactElement';
import {GraphContextObj} from '../hook/graphObjectContext'; 

export const ObjectProperty =(props)=>{
	const {mainGraphObj} =GraphContextObj()

	let currentNodeJson=props.currentNodeJson || {}

	let extraInfoValue = props.extraInfoValue || {}
	const id=props.id;
	const dataProvider=props.comboDataProvider || [];
	const errorMessage="Please select an element"

	const getSelectedValue=()=>{
		if(extraInfoValue.range){
			const rangeValue = dataProvider.find(element => element.name === extraInfoValue.range);
			if(rangeValue)return {label:rangeValue.label,name:rangeValue.name,value:rangeValue.value}
		}
		return null;
	}
	const defaultValue=getSelectedValue();

	const onChangeValue=(propName,propValue)=>{
		mainGraphObj.setPropertyInfo(currentNodeJson.id,propName,propValue)
	}

	/*
	* very Important the displayAll must be === false for complex property
	* because the complex property of an EntityClass can have
	* herself as range
	*/
	return(<BasePropertyComponent {...props} >
			<BaseSelectReactElement
				itemError={errorMessage}
				title={props.title}
				optionChange={onChangeValue}
				defaultValue={defaultValue}
				placeholder={props.placeholder} 
				resetSelection={false} 
				isClearable={false}
				dataProvider={dataProvider} name="range" />
		   </BasePropertyComponent>			
	)
}