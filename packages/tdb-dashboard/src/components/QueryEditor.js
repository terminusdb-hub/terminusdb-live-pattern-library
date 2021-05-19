import React from "react"
import {WOQLEditorControlled, ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {LANGUAGE_LIST} from './constants.js'
import {QueryPaneObj} from '../hooks/queryPaneContext'

export const QueryEditor = ({queryObj}) => { 
    //every time it change we set the query
    //string and type
    const {WOQLQueryChange} = QueryPaneObj()

    //save the change in the context obj
    const handleWOQLQueryChange =(query,text,language)=>{
        WOQLQueryChange(queryObj.id,query,text,language) 
    }
    //to be review
    const handleError = (err) => {
        console.log("error", err)
    }
    
    //language switcher what it have to do
    const handleLanguageSwitcher = (lang)=> {
        //setLanguage(lang)
    }

    //we don't use query prop in the query editor 
    return(
        <div className="editor-pallet">
            <WOQLEditorControlled 
                languages={LANGUAGE_LIST}
                customLanguageSwitcher={true} 
                startLanguage={queryObj.editorObj.language || "js"}  
                setWOQLQuery={handleWOQLQueryChange} 
                initcontent={queryObj.editorObj.text}
                query={queryObj.editorObj.query}
                editable={true}
                setMainError={(e) => handleError(e)}/>
        </div> 
    )
}