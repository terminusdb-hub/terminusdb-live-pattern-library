import {useState, useEffect} from "react"
import {WOQLClientObj} from "../init-woql-client"
import {refreshDBList} from "../components/utils"
import {get_dbs_to_show} from "../hooks/DataProductList"

export function useCreateNewDataProductStates () {
    const {
        woqlClient, 
        setDataProduct,
        reconnectToServer
    } = WOQLClientObj()

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(false)

    const [updateList, setUpdateList]=useState(0)

    const [showNewDataProductModal, setShowNewDataProductModal] = useState(false)
    const [newDataProductInfo, setNewDataProductInfo] = useState({})

    const [showDeleteDataProductModal, setShowDeleteDataProductModal] = useState(false)
    const [deleteDataProductInfo, setDeleteDataProductInfo] = useState({})


    useEffect(() => {
        if(woqlClient && newDataProductInfo.id && newDataProductInfo.label) {
            setLoading(true)
            newDataProductInfo.organization = woqlClient.organization()
            createNewDataProduct(woqlClient, newDataProductInfo, setResult, setLoading, setShowNewDataProductModal, setDataProduct, reconnectToServer)
        }
    }, [newDataProductInfo])

    useEffect(() => {
        if(woqlClient && deleteDataProductInfo.name && deleteDataProductInfo.name == woqlClient.db() ) { 
            setLoading(true)
            deleteDataProduct(woqlClient, deleteDataProductInfo, setResult, setLoading, setShowDeleteDataProductModal, setDataProduct,reconnectToServer)
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


export async function createNewDataProduct (woqlClient, meta, onDone, setLoading, setShowNewDataProductModal, setDataProduct, reconnectToServer) {
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
            reconnectToServer()
        })
}
 
export async function deleteDataProduct (woqlClient, meta, onDone, setLoading, setShowDeleteDataProductModal, setDataProduct, reconnectToServer) {
    setLoading(true)
    let id=meta.name
    await woqlClient.deleteDatabase(id, woqlClient.organization(), true)
        .then((res) => {
            onDone(res)
            setLoading(false)
            setShowDeleteDataProductModal(false)
            setDataProduct(false)
            reconnectToServer()
        })
        .catch((err) => console.log(err))
}
