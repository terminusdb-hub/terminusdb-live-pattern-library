import React, {useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {dataProductList} from "../hooks/DataProductList"
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {NewDatabaseModal} from "../components/NewDatabaseModal"
import {useCreateNewDataProductStates} from "../hooks/CreateNewDataProduct"
import {Badge} from "react-bootstrap"
import {FaPlus} from "react-icons/fa"
import {SearchBox} from "./SearchBox"

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

export const DataProductItems = (props) => {
    const {
        woqlClient, 
        setDataProduct, 
        sidebarDataProductListState, 
        setSidebarDataProductListState,
        dataProduct
    } = WOQLClientObj()

    let {list} = dataProductList(woqlClient, dataProduct)

    // search data products
    const [searchDataProduct, setSearchDataProduct]=useState(false)


    function handleClick(dp) {
        setDataProduct(dp.name) 
    }

    const DataProductMenu = ({handleClick, item}) => {
        return <MenuItem id={item.name} 
            onClick={(e) => handleClick(item)} 
            key={`key_${item.name}`}
            icon={false} 
            className="sub-menu-title">
            {item.label}
        </MenuItem>
    }

    return <SubMenu title="Data Products" 
        className="menu-title"
        defaultOpen={sidebarDataProductListState}
        onOpenChange={(e) => setSidebarDataProductListState(e)}
        suffix={<NewDataProduct/>}>
        
        <SearchBox placeholder={"Search for a Data Product"} onChange={setSearchDataProduct}/>
        
        {list.map(item => {
            if(!searchDataProduct) {
                return <DataProductMenu item={item} handleClick={handleClick}/>
            }
            if(searchDataProduct && (item.name.includes(searchDataProduct))) {
                return <DataProductMenu item={item} handleClick={handleClick}/>
            }
        })}
    </SubMenu>
}