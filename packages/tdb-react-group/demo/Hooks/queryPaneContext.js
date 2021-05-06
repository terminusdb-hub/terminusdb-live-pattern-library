import React, {useState,useContext} from "react";
import { v4 as uuidv4 } from 'uuid';

export const QueryPaneContext = React.createContext()
export const QueryPaneObj = () => useContext(QueryPaneContext)

export const QueryPaneProvider = ({children}) => {

    const [queryPaneList, setQueryPaneList] = useState([{ id:uuidv4(), query:null, index: 1}]);
    const [updateList, setUpdateList] = useState(0);

    const addQueryPane = (query=null) =>{
        let lastIndex = queryPaneList[queryPaneList.length-1].index
        queryPaneList.push({id: uuidv4(), query: query, index: lastIndex+1})
        setQueryPaneList(queryPaneList)
        setUpdateList(Date.now())
    }

    return (
		<QueryPaneContext.Provider
            value={{
                queryPaneList,
                addQueryPane
	    	}}>
	     {children}
        </QueryPaneContext.Provider>
    )
}	