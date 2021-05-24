
import {useState, useEffect} from "react"

export function useCreateNewDataProductStates (woqlClient) {
    const [newDataProduct, setNewDataProduct] = useState(false)
    const [newDataProductInfo, setNewDataProductInfo] = useState({})
    
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false)


    useEffect(() => {
        if(newDataProductInfo.id && newDataProductInfo.label) {
            setLoading(true)
            createNewDataProduct(woqlClient, newDataProductInfo, setResult, setLoading)
        }
    }, [newDataProductInfo])

    useEffect(() => {
        setNewDataProduct(false)
    }, [result])


    function handleNew () {
        setNewDataProduct(true)
    }

    return {
        newDataProduct,
        setNewDataProduct,
        newDataProductInfo,
        setNewDataProductInfo,
        loading,
        setLoading,
        result,
        setResult,
        handleNew
    }
}


export async function createNewDataProduct (woqlClient, meta, onDone, setLoading) {
    let org = meta.organization || "admin" // get this organization from log in details once intergrated
    setLoading(true)
    await woqlClient.createDatabase(meta.id, meta, org)
        .then((res) => {
            onDone(res)
            setLoading(false)
        })
        .catch((err) => console.log(err))
}