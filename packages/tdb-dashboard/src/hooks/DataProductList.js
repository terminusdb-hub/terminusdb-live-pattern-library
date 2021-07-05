import React, {useState, useEffect} from "react"
import {WOQLClientObj} from "../init-woql-client"

export function dataProductList (props)  {

    const {woqlClient, dataProduct} = WOQLClientObj()
 
    let [list, setList] = useState([])

    /*useEffect(() => {
        setList(get_dbs_to_show(woqlClient))
    }, [dataProduct])*/

    useEffect(() => {
        let dbs = get_dbs_to_show(woqlClient)
        setList(dbs)
    }, [dataProduct])

    function get_dbs_to_show(){
        if(!woqlClient)return []
        let mdbs = []
        let dbs = woqlClient.databases()
        for(var i = 0; i<dbs.length; i++){
            //if(dbs[i].name) 
            if(dbs[i].id) mdbs.push(dbs[i])
        }
        return mdbs
    }

    return {
        list, 
        setList
    }
}