
import {useState, useEffect} from "react"
import {WOQLClientObj} from "../init-woql-client"


export function useCreateNewDataProductStates () {
    const {woqlClient, setDataProduct} = WOQLClientObj()


    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false)

    const [showNewDataProductModal, setShowNewDataProductModal] = useState(false)
    const [newDataProduct, setNewDataProduct] = useState(false)
    const [newDataProductInfo, setNewDataProductInfo] = useState({})


    useEffect(() => {
        if(newDataProductInfo.id && newDataProductInfo.label) {
            setLoading(true)
            createNewDataProduct(woqlClient, newDataProductInfo, setResult, setLoading, setShowNewDataProductModal, setDataProduct)
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
        handleNew,
        setShowNewDataProductModal,
        showNewDataProductModal
    }
}


export async function createNewDataProduct (woqlClient, meta, onDone, setLoading, setShowNewDataProductModal, setDataProduct) {
    let org = meta.organization || "admin" // get this organization from log in details once intergrated
    setLoading(true)
    await woqlClient.createDatabase(meta.id, meta, org)
        .then((res) => {
            onDone(res)
            setLoading(false)
            setShowNewDataProductModal(false)
            setDataProduct(meta.id)
        })
        .catch((err) => console.log(err))
}