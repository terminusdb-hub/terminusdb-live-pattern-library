import React, {useState,useEffect,useContext} from "react";

import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
export const QueryPaneContext = React.createContext()
export const QueryPaneObj = () => useContext(QueryPaneContext)

export const QueryPaneProvider = ({children}) => {

    const [queryPaneList, setQueryPaneList] = useState([{id:uuidv4(),query:null}]);
    const [updateList, setUpdateList] = useState(0);

    const addQueryPane = (query=null) =>{
        queryPaneList.push({id:uuidv4(),query:query})
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

        //entitiesListArr,
        //classesListArr
    )
}	