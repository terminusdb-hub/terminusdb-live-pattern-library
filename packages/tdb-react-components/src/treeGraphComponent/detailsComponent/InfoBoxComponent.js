import React,{useState} from 'react';
import {mainGraphDescriptionText,ELEMENT_DESCRIPTIONS} from '../../constants/details-labels';
import {GraphContextObj} from '../hook/graphObjectContext';
import {CLASS_TYPE_NAME_LABEL} from "../utils/elementsName";
import {BiNetworkChart} from "react-icons/bi"
import {FiArrowRightCircle} from "react-icons/fi"
import {MdCallSplit} from "react-icons/md"

export const InfoBoxComponent =(props)=> {

	const {mainGraphObj} = GraphContextObj();

	const elementsNumber=mainGraphObj ? mainGraphObj.getElementsNumber() : {}

	const propertiesNum=elementsNumber.properties || 0;
	const entitiesNum=elementsNumber.entities || 0;
	const ordinaryClassesNum=elementsNumber.classes || 0;
	const choiceClassesNum=elementsNumber.choiceClasses || 0

	if(props.custom) {
		return <div className="col-12 bg-dark">
				<h5>{props.dbName} - Schema</h5>
				<p>{mainGraphDescriptionText}</p>
				<div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3 mt-3 mb-3">
					<div className="d-flex" title={ELEMENT_DESCRIPTIONS.Document}>
						<h6><BiNetworkChart className="schema-summary-icons"/> <strong className="ml-3">{CLASS_TYPE_NAME_LABEL.DOCUMENT_CLASSES} </strong></h6>
					</div>
					<div className="text-success fw-bold">
						{entitiesNum}
					</div>
				</div>
				<div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3 mt-3 mb-3">
					<div title={ELEMENT_DESCRIPTIONS.Properties} className="d-flex">
						<h6><FiArrowRightCircle className="schema-summary-icons"/> <strong className="ml-3">{(propertiesNum == 1 ? "Property" : "Properties")}</strong></h6>
					</div>
					<div className="text-success fw-bold">
							{propertiesNum}
					</div>
				</div>

				<div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3 mt-3 mb-3">
					<div title={ELEMENT_DESCRIPTIONS.ChoiceClass} className="d-flex">
						<h6><MdCallSplit className="schema-summary-icons"/> <strong className="ml-3">{CLASS_TYPE_NAME_LABEL.CHOICE_CLASSES}</strong></h6>
					</div>
					<div className="text-success fw-bold">
							{choiceClassesNum}
					</div>
				</div>			
		</div>
	}

}
