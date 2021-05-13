import React from "react"
import {WOQLEditorControlled, ControlledQueryHook} from '@terminusdb/terminusdb-react-components'
import {LANGUAGE_LIST} from './constants.js'

export const QueryEditor = ({queryObj}) => { 
    //every time it change we set the query
    //string and type
    const handleWOQLQueryChange =(query,text,language)=>{
        queryObj.updateQueryProps("query",query)
        queryObj.updateQueryProps("text",text)
        queryObj.updateQueryProps("language",language)

        //text,language) 
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
}/*editorContent*/