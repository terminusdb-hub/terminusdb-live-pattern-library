import React, {useState, useEffect} from "react"

export const DataProductList = (woqlClient) => {

    let [list, setList] = useState(get_dbs_to_show(woqlClient))

    function get_dbs_to_show(){
        let mdbs = []
        let dbs = woqlClient.databases()
        for(var i = 0; i<dbs.length; i++){
            if(dbs[i].id) mdbs.push(dbs[i])
        }
        return mdbs
    }

    return {
        list, 
        setList
    }
}