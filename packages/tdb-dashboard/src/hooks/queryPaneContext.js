import React, {useState,useContext} from "react";
import { v4 as uuidv4 } from 'uuid';
import {PanelQueryObj} from "./PanelQueryObj"
export const QueryPaneContext = React.createContext()
export const QueryPaneObj = () => useContext(QueryPaneContext)

export const QueryPaneProvider = ({children}) => {
    const startQueryPane = new Map()
    const obj = new PanelQueryObj(uuidv4())
    startQueryPane.set(obj.id, obj)

    const [queryPaneList, setQueryPaneList] = useState(startQueryPane);
    const [updateList, setUpdateList] = useState(0);

    const addQueryPane = (query=null) =>{
        const obj = new PanelQueryObj(uuidv4())
        obj.updateEditorProps('query',query)
        if(query){
            obj.updateEditorProps('text',query.prettyPrint("js"))
        }
        queryPaneList.set(obj.id, obj )
        setUpdateList(Date.now())
    }

    const getPanelObject = (queryPaneId) => {
        return queryPaneList.get(queryPaneId)
    }

    const WOQLQueryChange =(queryPaneId, query,text,language)=>{
        const queryObj= queryPaneList.get(queryPaneId)
        if(queryObj){
            queryObj.updateEditorProps("query",query)
            queryObj.updateEditorProps("text",text)
            queryObj.updateEditorProps("language",language)
        } 
    } 

    return (
		<QueryPaneContext.Provider
            value={{
                WOQLQueryChange,
                queryPaneList,
                addQueryPane,
                getPanelObject
	    	}}>
	     {children}
        </QueryPaneContext.Provider>
    )
}	