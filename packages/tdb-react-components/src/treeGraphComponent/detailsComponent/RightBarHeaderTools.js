import React, {useState, useEffect} from 'react';
import {AiOutlineSave} from "react-icons/ai"
import {BiUndo} from "react-icons/bi"
import {TOOLBAR_LABELS} from '../../constants/details-labels';
import {GraphContextObj} from '../hook/graphObjectContext';

export const RightBarHeaderTools =(props)=>{
    
    const {resetTreeModel} = GraphContextObj();
    const [commitMessage,setCommitMessage]=useState('');
	
    const handleCommitMessage=(evt)=>{
		const value=evt.currentTarget.value
		setCommitMessage(value)
	}


	const handleSave=()=>{
		props.saveData(commitMessage)
		setCommitMessage('')
	}

    const handleReset=()=>{
        //we have to add an alert
        resetTreeModel()
    }

	return (<div className="flex-grow-1 d-flex align-item-center pt-2 pb-2 bg-dark pl-3" style={{marginTop:'1px',marginBottom:'2px'}}>
            <div className="mr-3 flex-grow-1">
                <input placeholder={TOOLBAR_LABELS.CommitLabel} type="text" className="form-control" onBlur={handleCommitMessage}/>
            </div>
            <div role="group" className="btn-group">
                <button title={TOOLBAR_LABELS.SaveButtonTooltip} type="button" className="btn btn-outline-light btn-lg border-0"
                    onClick={handleSave}>
                    <AiOutlineSave size="1.6em"/>
                </button>
                <button title={TOOLBAR_LABELS.ViewModeTooltip} type="button" className="btn btn-outline-light btn-lg border-0" onClick={handleReset}>
                    <BiUndo size="1.6em"/>
                </button>
            </div>
        </div>)
}