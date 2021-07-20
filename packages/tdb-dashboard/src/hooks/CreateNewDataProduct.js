import {useState, useEffect} from "react"
import {WOQLClientObj} from "../init-woql-client"
import {refreshDBList} from "../components/utils"

export function useCreateNewDataProductStates () {
    const {woqlClient, setDataProduct} = WOQLClientObj()

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false)

    const [updateList, setUpdateList]=useState(0)

    const [showNewDataProductModal, setShowNewDataProductModal] = useState(false)
    const [newDataProductInfo, setNewDataProductInfo] = useState({})

    const [showDeleteDataProductModal, setShowDeleteDataProductModal] = useState(false)
    const [deleteDataProductInfo, setDeleteDataProductInfo] = useState({})


    useEffect(() => {
        if(newDataProductInfo.id && newDataProductInfo.label) {
            setLoading(true)
            createNewDataProduct(woqlClient, newDataProductInfo, setResult, setLoading, setShowNewDataProductModal, setDataProduct)
            setUpdateList(Date.now())
        }
    }, [newDataProductInfo])

    useEffect(() => {
        if(deleteDataProductInfo.name && deleteDataProductInfo.name == woqlClient.db() ) { 
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
            setLoading(false)
            //onDone(res)
        })
        .catch((err) => console.log(err))
        .finally(() => {
            setShowNewDataProductModal(false)
            woqlClient.db(meta.id)
            setDataProduct(meta.id)
            refreshDBList(meta, woqlClient)
        })
}
 
export async function deleteDataProduct (woqlClient, meta, onDone, setLoading, setShowDeleteDataProductModal, setDataProduct) {
    setLoading(true)
    let id=meta.name
    await woqlClient.deleteDatabase(id, woqlClient.organization(), true)
        .then((res) => {
            onDone(res)
            setLoading(false)
            setShowDeleteDataProductModal(false)
            setDataProduct(false)
        })
        .catch((err) => console.log(err))
}