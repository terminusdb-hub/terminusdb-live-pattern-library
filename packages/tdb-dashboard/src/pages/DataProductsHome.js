import React, {useEffect, useState} from "react"
import {Row, Col, Card, Button} from "react-bootstrap"
import {useCreateNewDataProductStates} from "../hooks/CreateNewDataProduct"
import {dataProductList} from "../hooks/DataProductList"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {Sidebar} from './Sidebar'
import {DATA_PRODUCTS} from "../routing/constants"
import {BsClockHistory} from "react-icons/bs"
import {AiOutlineDelete, AiOutlineBranches} from "react-icons/ai"
import {NewDatabaseModal} from "../components/NewDatabaseModal"
import {DeleteDatabaseModal} from "../components/DeleteDatabaseModal"
import {DataProductSummary} from "../components/DataProductSummary"
import {ManageProducts} from "../components/ManageProducts"
import {History} from "../components/History"
import {MANAGE_COLLECTIONS, MANAGE_HISTORY} from "./constants"

export const DataProductsHome = (props) => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const [dataProductDetails, setDataProductDetails] = useState(false)

    const [dataProductSettings, setDataProductSettings] = useState(false)
    
    const {list} = dataProductList(woqlClient)

    useEffect (() => {
        list.map(dp => {
            if(dp.id == dataProduct) {
                setDataProductDetails(dp)
            }
        })
    }, [dataProduct])

    const {
        setNewDataProductInfo,
        loading,
        handleNew,
        setShowNewDataProductModal,
        showNewDataProductModal,
        showDeleteDataProductModal,
        setDeleteDataProductInfo,
        setShowDeleteDataProductModal} = useCreateNewDataProductStates(woqlClient)

    return  <Layout sideBarContent={<Sidebar page = {DATA_PRODUCTS} handleNew={handleNew}></Sidebar>}>
        <main className="content mr-3 ml-5 w-95">

            <NewDatabaseModal setShowNewDataProductModal={setShowNewDataProductModal} 
                showNewDataProductModal={showNewDataProductModal} 
                setNewDataProductInfo={setNewDataProductInfo} 
                loading={loading}/>
            
            <DeleteDatabaseModal setShowDeleteDataProductModal={setShowDeleteDataProductModal} 
                showDeleteDataProductModal={showDeleteDataProductModal} 
                setDeleteDataProductInfo={setDeleteDataProductInfo} 
                loading={loading} 
                dataProductDetails={dataProductDetails}/>

            {dataProduct && dataProductDetails && 
                <Row className="mt-5 w-100 justify-content-md-center">
                <Col xs={12} className="mb-4 d-none d-sm-block align-items-center ">
                    <Card>
                        <Card.Header as="h3">
                            Connected to Data Product  - 
                            <strong className="text-success"> {dataProductDetails.label}</strong>
                            <div className="float-right d-flex">
                                <Button variant="light" className="mr-3" onClick={(e) => setDataProductSettings(MANAGE_COLLECTIONS)}>
                                    <AiOutlineBranches className="me-2"/> {MANAGE_COLLECTIONS}
                                </Button>
                                <Button variant="light" className="mr-3" onClick={(e) => setDataProductSettings(MANAGE_HISTORY)}>
                                    <BsClockHistory className="me-2"/> {MANAGE_HISTORY}
                                </Button>
                                <Button variant="danger" title={`Delete Data Product ${dataProduct}`} 
                                        onClick={(e) =>setShowDeleteDataProductModal(true)}>
                                    <AiOutlineDelete className="me-2" /> Delete 
                                </Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <div className="d-flex align-items-center col-md-12">
                                    <h6 class="fw-normal text-muted mb-2">Data Product ID </h6>
                                    <h6 className="ml-3">{dataProductDetails.id}</h6>
                                    {/*<h6>{formatLastCommitTimeStamp(details)}</h6>*/}
                                </div>
                                <div className="d-flex align-items-center col-md-12">
                                    {dataProductDetails.comment}
                                </div>
                                <DataProductSummary dataProductDetails={dataProductDetails}/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            }
            
            {dataProduct && dataProductDetails && (dataProductSettings ==  MANAGE_COLLECTIONS) && <React.Fragment>
                <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
                <ManageProducts setDataProductSettings={setDataProductSettings}/>
            </React.Fragment>}

            {dataProduct && dataProductDetails && (dataProductSettings ==  MANAGE_HISTORY) && <React.Fragment>
                <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
                <History setDataProductSettings={setDataProductSettings}/>
            </React.Fragment>}
            
            {!dataProduct && <div style={{top: "30%", position: "absolute", width: "100%"}}>
                <Col xs={12} className="text-center d-block align-items-center justify-content-center">
                    <img src="../assets/favicon-dark.png" style={{width: "10%"}}/>
                    <h1 className="text-dark mt-5">
                        Use the sidebar to connect to a Data Product
                    </h1>
                </Col>
            </div>}
        </main>
    </Layout>
}