
import React, {useState} from "react"
import {DatabaseCard, NewDatabaseCard} from "../components/DatabaseCard"
import {Container, Row} from "react-bootstrap"
import {TDBReactButton,MainLayout} from '@terminusdb-live/tdb-react-layout'
import {NEW_DATA_PRODUCT_BUTTON, DATA_PRODUCT_LABEL} from "./constants"
import {useCreateNewDataProductStates} from "../hooks/CreateNewDataProduct"
import {dataProductList} from "../hooks/DataProductList"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {Sidebar} from './Sidebar'
import {ConsoleHistory} from "../routing/Router"
import {PRODUCT_MODELS} from "../routing/constants"
import {SideBar} from "./Sidebar"

export const DataProductsHome = (props) => {
    const {woqlClient,setDataProduct} = WOQLClientObj()
    if(woqlClient)woqlClient.setSystemDb()

    const {list} = dataProductList(woqlClient)

    const {newDataProduct,
        setNewDataProduct,
        setNewDataProductInfo,
        loading,
        handleNew} = useCreateNewDataProductStates(woqlClient)

    const setSelectDP = (event) =>{
        setDataProduct(event.currentTarget.id)
        ConsoleHistory.push(PRODUCT_MODELS)
    }

    return  <Layout sideBarContent={<Sidebar></Sidebar>}>
        <Container>
        <Row>
            <div className="col-md-3 d-grid pb-3">
                <TDBReactButton config={NEW_DATA_PRODUCT_BUTTON} onClick={handleNew}/>
            </div>
        </Row> 
        <Row>
            {newDataProduct && <div className="col-md-4 d-grid pb-3">
                    <NewDatabaseCard onCancel={setNewDataProduct} 
                        setNewDataProductInfo={setNewDataProductInfo} 
                        loadiSideBarng={loading}/>
                </div>
            }
        </Row>
        <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
        <h4 className="mt-5 mb-5">{DATA_PRODUCT_LABEL}</h4>
        <Row className="equal">
            {list.map(item => <div key={`key_${item.id}`} className="col-md-4 d-grid pb-3">
                    <DatabaseCard title={item.label} 
                        description={item.comment} 
                        onClick={setSelectDP}
                        key={`key_${item.id}`}
                        id={item.id}/>
                </div>
            )}
        </Row>
    </Container>
    </Layout>
}