import React, {useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {SearchBox} from "./SearchBox"

/* returns a list of data products */
export const DataProductItems = (props) => {
    const {
        woqlClient, 
        setDataProduct, 
        sidebarDataProductListState, 
        setSidebarDataProductListState,
        dataProduct
    } = WOQLClientObj()

    let list = woqlClient ? woqlClient.databases() : [] 

    // search data products
    const [searchDataProduct, setSearchDataProduct]=useState(false)


    function handleClick(dp) {
        setDataProduct(dp.name) 
    }

    const DataProductMenu = ({handleClick, item}) => {
        return <MenuItem id={item.name} 
            onClick={(e) => handleClick(item)}     
            icon={false} 
            className="sub-menu-title">
            {item.label}
        </MenuItem>
    }

    return <React.Fragment>
            <SubMenu title="Data Products" 
                className="menu-title"
                defaultOpen={sidebarDataProductListState}
                onOpenChange={(e) => setSidebarDataProductListState(e)}
                >
        
        <SearchBox placeholder={"Search for a Data Product"} onChange={setSearchDataProduct}/>
        
        {list.map(item => {
            if(!searchDataProduct) {
                return <DataProductMenu item={item} handleClick={handleClick} key={`key_${item.name}`}/>
            }
            if(searchDataProduct && (item.name.toUpperCase().includes(searchDataProduct.toUpperCase()))) {
                return <DataProductMenu item={item} handleClick={handleClick} key={`key_${item.name}`}/>
            }
        })}
    </SubMenu>
    </React.Fragment>
}