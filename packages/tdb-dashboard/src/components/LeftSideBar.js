import React, {useState, useEffect} from "react"
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarContent} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {AiOutlineUnorderedList, AiOutlineCheck, AiOutlineNodeIndex} from "react-icons/ai"
import {BsFillExclamationTriangleFill, BsBriefcase, BsBook} from "react-icons/bs"
import {BiPlus} from "react-icons/bi"
import {FaPlus, FaInfo} from "react-icons/fa"
import {WOQLClientObj} from '../init-woql-client'
import {DBContextObj} from "../hooks/DBContext"
import {dataProductList} from "../hooks/DataProductList"
import {getCommitTime} from "./utils"
import {Badge, Button} from "react-bootstrap"
import {NewDatabaseModal} from "../components/NewDatabaseModal"
import {useCreateNewDataProductStates} from "../hooks/CreateNewDataProduct"
import {DatabaseInfoControl} from "../hooks/DatabaseInfoControl"
import {QueryPaneObj} from "../hooks/queryPaneContext"
import {getPropertiesOfClass, getPropertyRelation, getDocumentClasses} from '../queries/GeneralQueries'
import {GET_CLASSES_LINK, GET_PROPERTIES_LINK, GET_DOCUMENT_METADATA_LINK} from "./constants"
import {getClassesLib, getPropertiesLib, getDocumentMetadataLib} from "../queries/GeneralQueries"
import {PRODUCT_EXPLORER, DOCUMENT_EXPLORER} from "../routing/constants"

/* returns a list of data products */
const NewDataProduct = () => {
    const {woqlClient} = WOQLClientObj()

    const {
        setNewDataProductInfo,
        loading,
        handleNew,
        setShowNewDataProductModal,
        showNewDataProductModal} = useCreateNewDataProductStates(woqlClient)


    return <React.Fragment>
        <Badge variant="info" size="sm" title="Create New Data Product" onClick={handleNew}>
            <FaPlus className="me-2"/>New
        </Badge>
        <NewDatabaseModal setShowNewDataProductModal={setShowNewDataProductModal} 
                showNewDataProductModal={showNewDataProductModal} 
                setNewDataProductInfo={setNewDataProductInfo} 
                loading={loading}/>
    </React.Fragment>
}


const DataProductItems = (props) => {
    const {dataProduct, woqlClient, setDataProduct} = WOQLClientObj()
    const {list} = dataProductList(woqlClient)

    function handleClick(id) {
        setDataProduct(id) 
    }

    return <SubMenu title="Data Products" 
        icon={<AiOutlineUnorderedList />} 
        defaultOpen={true}
        suffix={<NewDataProduct/>}>
        {list.map(item => 
            <MenuItem id={item.id} onClick={(e) => handleClick(item.id)} icon={false}>
                {item.label}
            </MenuItem>)}
    </SubMenu>
}

/* returns current data product to which your connected and status */
const ConnectedDataProduct = () => {
    const {dataProduct} = WOQLClientObj()
    const {branch, consoleTime} = DBContextObj() 
    const [status, setStatus] = useState("text-success")
    const [currentCommit, setCurrentCommit] = useState("latest")

    useEffect(() => {
        getCommitTime(consoleTime, setStatus, setCurrentCommit)
    }, [consoleTime])

    function title (dataProduct) {
        return <span className="pro-item-content">Connected to <strong className="text-success">{dataProduct}</strong></span>
    }

    return <SubMenu title={title(dataProduct)} icon={<AiOutlineCheck />} >
        {(status == "text-warning") && <MenuItem >
            <span className="pro-item-content font-italic text-warning ml-3" > 
                <BsFillExclamationTriangleFill className="me-2 mr-3"/>
                This is not latest version   
            </span>
            </MenuItem>
        }
        <MenuItem>
            <span className="pro-item-content"> 
                <strong className={`mr-3 ${status}`}> ● </strong>  {`on ${currentCommit} version`} 
            </span>
        </MenuItem>
        <MenuItem>
            <span className="pro-item-content"> <BsBriefcase className="me-2 mr-3"/> {branch} </span>
        </MenuItem>
    </SubMenu>
}

const DataProductDocuments = () => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const {addQueryPane} = QueryPaneObj() 

    const { 
        setCurrentClass,
        currentClass,
        setQuery,
        properties,
        classes} = DatabaseInfoControl(woqlClient, dataProduct) 

    function handleClassClick (id) {
        let q = getPropertiesOfClass(id, dataProduct, woqlClient)
        setCurrentClass(id)
        setQuery(q)
    }

    function handlePropertyClick (property) {
        let q = getPropertyRelation(property, dataProduct, woqlClient)
        addQueryPane(q)
    }

    return <SubMenu title={"Document Types"} icon={<AiOutlineNodeIndex />}>
       {classes && classes.map(item => 
            <MenuItem id={item["Class ID"]} icon={false}>
                <Button className="pro-item-content btn-sm" 
                    variant="dark" 
                    title={`View documents of type ${item["Class Name"]["@value"]}`}
                    onClick={(e) => handleClassClick(item["Class ID"])}>
                    
                    <span className="text-gray">{item["Class Name"]["@value"]}</span>
                    <Badge title={`${item["Count"]["@value"]} ${item["Class Name"]["@value"]} available`}
                    className="ml-3 cursor-auto text-gray" 
                    variant="dark">{item["Count"]["@value"]}</Badge>

                </Button>

                {properties && properties.map(property => {
                    if(property["Property Domain"] == item["Class ID"])
                        return  <MenuItem>
                            <Button className="pro-item-content btn-sm" variant="light" onClick={(e) => handlePropertyClick(property["Property ID"])}>
                                {property["Property Name"]["@value"]}
                            </Button>
                        </MenuItem>})
                }
            </MenuItem>)
        }    
    </SubMenu>
}

const SampleQueries = (props) => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const {addQueryPane} = QueryPaneObj()
    

    function handleQuery(query) {
        var q
        if(query == GET_CLASSES_LINK.label) {
            q=getClassesLib(dataProduct, woqlClient)
        }
        else if (query == GET_PROPERTIES_LINK.label){
            q=getPropertiesLib(dataProduct, woqlClient)
        }
        else if (query == GET_DOCUMENT_METADATA_LINK.label){
            q=getDocumentMetadataLib(dataProduct, woqlClient)
        }
        addQueryPane(q)
    }

    return <SubMenu title="Example Queries" icon={<BsBook />}>
        <SubMenu title="Schema Queries">
            <MenuItem title={GET_CLASSES_LINK.title}
                onClick={(e) => handleQuery(GET_CLASSES_LINK.label)}>{GET_CLASSES_LINK.label}</MenuItem>
            <MenuItem title={GET_PROPERTIES_LINK.title}
                onClick={(e) => handleQuery(GET_PROPERTIES_LINK.label)}>{GET_PROPERTIES_LINK.label}</MenuItem>
        </SubMenu>
        <SubMenu title="Document Queries">
            <MenuItem title={GET_DOCUMENT_METADATA_LINK.title}
                onClick={(e) => handleQuery(GET_DOCUMENT_METADATA_LINK.label)}>{GET_DOCUMENT_METADATA_LINK.label}</MenuItem>
        </SubMenu>
        <SubMenu title="Import Queries">
        </SubMenu>
    </SubMenu>
    
}

const DcoumentExplorerDocuments = () => {
    const {woqlClient, dataProduct} = WOQLClientObj()

    const { 
        setCurrentClass,
        currentClass,
        setQuery,
        properties,
        classes} = DatabaseInfoControl(woqlClient, dataProduct) 

    return <SubMenu title={"Document Types"} icon={<AiOutlineNodeIndex />}>
    {classes && classes.map(item => 
         <MenuItem id={item["Class ID"]} icon={false}>
             <Button className="pro-item-content btn-sm" 
                 variant="dark" 
                 title={`View documents of type ${item["Class Name"]["@value"]}`}
                 onClick={(e) => handleClassClick(item["Class ID"])}>
                 
                 <span className="text-gray">{item["Class Name"]["@value"]}</span>
                 <Badge title={`${item["Count"]["@value"]} ${item["Class Name"]["@value"]} available`}
                 className="ml-3 cursor-auto text-gray" 
                 variant="dark">{item["Count"]["@value"]}</Badge>
                 <Badge variant="dark" className="ml-3" title={`Add a new ${item["Class Name"]["@value"]}`}>
                    <BiPlus style={{fontSize: "14px"}} color="#fff"/>
                </Badge>

             </Button>
        </MenuItem>)}
    </SubMenu>
}

export const LeftSideBar = ({route}) => {
    const {dataProduct, woqlClient} = WOQLClientObj()
    const [serverVersion, setServerVersion]=useState(false)

    useEffect(() => {
        woqlClient.info().then((results) => {
            setServerVersion(results["api:info"].terminusdb.version)
        })
    }, [woqlClient])

    return <ProSidebar>
        <SidebarContent>
            <Menu iconShape="square">
                <DataProductItems/>
                {dataProduct && <ConnectedDataProduct/>}
                {dataProduct && route==DOCUMENT_EXPLORER && <DcoumentExplorerDocuments/>}
                {dataProduct && route==PRODUCT_EXPLORER && <DataProductDocuments/>}
                {dataProduct && route==PRODUCT_EXPLORER && <SampleQueries/>}
            </Menu>
        </SidebarContent>
      </ProSidebar>
}
