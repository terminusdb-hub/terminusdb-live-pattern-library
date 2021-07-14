import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom" 
import {Row, Col, Card, Button} from "react-bootstrap"
import {useCreateNewDataProductStates} from "../hooks/CreateNewDataProduct"
//import {dataProductList} from "../hooks/DataProductList"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {DATA_PRODUCTS} from "../routing/constants"
import {AiOutlineDelete} from "react-icons/ai"
import {NewDatabaseModal} from "../components/NewDatabaseModal"
import {DeleteDatabaseModal} from "../components/DeleteDatabaseModal"
import {DataProductSummary} from "../components/DataProductSummary"
import {ManageProducts} from "../components/ManageProducts"
import {PRODUCT_SUMMARY_NAV, PRODUCT_COLLECTIONS_NAV} from "../components/constants"
import {NoDataProductSelected} from "../components/NoDataProductSelected"
import {BsBriefcase} from "react-icons/bs"
import {FaNodeJs,FaPython} from "react-icons/fa"
import {MANAGE_COLLECTIONS} from "../components/constants"
import {LeftSideBar} from "../components/LeftSideBar"


export const DataProductsHome = (props) => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const [dataProductDetails, setDataProductDetails] = useState(false)

    const list = woqlClient.databases() //dataProductList(woqlClient)

    const [dataProductSettings, setDataProductSettings] = useState(false)

    useEffect (() => {
        list.map(dp => {
            if(dp.name == dataProduct) {
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

    return  <Layout sideBarContent={<LeftSideBar route={DATA_PRODUCTS}/>}>
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

            {dataProduct && dataProductDetails && <React.Fragment>

                <Row className="mt-5 w-100 justify-content-md-center">

                <Col xs={12} className="mb-4 d-none d-sm-block align-items-center ">
                    <Card>
                        <Card.Header as="h3">
                            <strong className="text-success"> {dataProductDetails.label}</strong>
                            <div className="float-right d-flex">
                                <Button variant="light" className="mr-3" onClick={(e) => setDataProductSettings(MANAGE_COLLECTIONS)}>
                                    <BsBriefcase className="me-2"/> {MANAGE_COLLECTIONS}
                                </Button>
                                <Button variant="danger" title={`Delete Data Product ${dataProduct}`} 
                                        onClick={(e) =>setShowDeleteDataProductModal(true)}>
                                    <AiOutlineDelete className="me-2" /> Delete 
                                </Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex align-items-center col-md-12">
                                <h6 className="fw-normal text-muted mb-2">Data Product ID </h6>
                                <h6 className="ml-3">{dataProductDetails.name}</h6>
                            </div>
                            {dataProductDetails.comment && <div className="d-flex align-items-center col-md-12">
                                {dataProductDetails.comment}
                            </div>}
                            <DataProductSummary dataProductDetails={dataProductDetails}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {dataProduct && dataProductDetails && (dataProductSettings ==  MANAGE_COLLECTIONS) && <React.Fragment>
                    <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
                    <ManageProducts setDataProductSettings={setDataProductSettings}/>
                </React.Fragment>}
            </React.Fragment>
        
            }
            
            {!dataProduct && <NoDataProductSelected>
                <Row>
                <Col></Col>
                <Col>
                <Card >
                    <Card.Body className="d-flex align-items-center flex-column">
                    <Link to="/files/start_js.zip" target="_blank" download>
                        CONNECT WITH YOUR CLOUD BY NODEJS 
                    </Link>
                    <FaNodeJs size="5em" className="mt-2"/>
                    </Card.Body>
                </Card>
                </Col> 
                <Col >
                <Card >
                    <Card.Body className="d-flex align-items-center flex-column">         
                    <Link to="/files/start_py.zip" target="_blank" download>
                        CONNECT WITH YOUR CLOUD BY PYTHON 
                    </Link> 
                    <FaPython  size="5em" className="mt-2"/>
                    </Card.Body>
                </Card>
                </Col>
                <Col></Col>
                </Row> 
            </NoDataProductSelected>    
            }
        </main>
    </Layout>
}