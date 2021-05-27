import React, {useState, useEffect} from "react"

export function dataProductList (woqlClient)  {

    

    let [list, setList] = useState(get_dbs_to_show(woqlClient))

    /*useEffect(() => {
        setList(get_dbs_to_show(woqlClient))
    }, [dataProduct])*/

    function get_dbs_to_show(){
        if(!woqlClient)return []
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