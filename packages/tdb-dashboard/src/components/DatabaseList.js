import React from "react"
import {WOQLClientObj} from '../init-woql-client'
import {dataProductList} from "../hooks/DataProductList"
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {NewDatabaseModal} from "../components/NewDatabaseModal"
import {useCreateNewDataProductStates} from "../hooks/CreateNewDataProduct"
import {Badge} from "react-bootstrap"
import {FaPlus} from "react-icons/fa"

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
        setSidebarDataProductListState
    } = WOQLClientObj()

    const {list} = dataProductList(woqlClient)

    function handleClick(dp) {
        setDataProduct(dp.name ) 
    }

    return <SubMenu title="Data Products" 
        className="menu-title"
        defaultOpen={sidebarDataProductListState}
        onOpenChange={(e) => setSidebarDataProductListState(e)}
        suffix={<NewDataProduct/>}>
        {list.map(item => 
            <MenuItem id={item.name} 
                onClick={(e) => handleClick(item)} 
                key={`key_${item.name}`}
                icon={false} 
                className="sub-menu-title">
                {item.label}
            </MenuItem>)}
    </SubMenu>
}