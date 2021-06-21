
import {useState, useEffect} from "react"
import {WOQLClientObj} from "../init-woql-client"


export function useCreateNewDataProductStates () {
    const {woqlClient, setDataProduct} = WOQLClientObj()

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false)

    const [showNewDataProductModal, setShowNewDataProductModal] = useState(false)
    const [newDataProductInfo, setNewDataProductInfo] = useState({})

    const [showDeleteDataProductModal, setShowDeleteDataProductModal] = useState(false)
    const [deleteDataProductInfo, setDeleteDataProductInfo] = useState({})


    useEffect(() => {
        if(newDataProductInfo.id && newDataProductInfo.label) {
            setLoading(true)
            createNewDataProduct(woqlClient, newDataProductInfo, setResult, setLoading, setShowNewDataProductModal, setDataProduct)
        }
    }, [newDataProductInfo])

    useEffect(() => {
        if(deleteDataProductInfo.id && deleteDataProductInfo.id == woqlClient.db() ) {
            setLoading(true)
            deleteDataProduct(woqlClient, deleteDataProductInfo, setResult, setLoading, setShowDeleteDataProductModal, setDataProduct)
        }
    }, [deleteDataProductInfo])

    function handleNew () {
        setShowNewDataProductModal(true)
    }

    return {
        newDataProductInfo,
        setNewDataProductInfo,
        loading,
        setLoading,
        result,
        setResult,
        handleNew,
        setShowNewDataProductModal,
        showNewDataProductModal,
        showDeleteDataProductModal,
        setDeleteDataProductInfo,
        setShowDeleteDataProductModal
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

export async function deleteDataProduct (woqlClient, meta, onDone, setLoading, setShowDeleteDataProductModal, setDataProduct) {
    setLoading(true)
    await woqlClient.deleteDatabase(meta.id, woqlClient.organization(), true)
        .then((res) => {
            onDone(res)
            setLoading(false)
            setShowDeleteDataProductModal(false)
            setDataProduct(false)
        })
        .catch((err) => console.log(err))
}