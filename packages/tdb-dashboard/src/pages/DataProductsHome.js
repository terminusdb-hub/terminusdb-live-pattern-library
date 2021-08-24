import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom" 
import {Row, Col, Card, Button} from "react-bootstrap"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {DATA_PRODUCTS} from "../routing/constants"
import {AiOutlineDelete} from "react-icons/ai"
import {DeleteDatabaseModal} from "../components/DeleteDatabaseModal"
import {DataProductSummary} from "../components/DataProductSummary"
import {DataProductActivityGraph, DataProductActivityBoard} from "../components/DataProductActivityStatus"
import {ManageProducts} from "../components/ManageProducts"
import {NoDataProductSelected} from "../components/NoDataProductSelected"
import {BsBriefcase, BsDashSquare} from "react-icons/bs"
import {MANAGE_COLLECTIONS} from "../components/constants"
import {LeftSideBar} from "../components/LeftSideBar"
import moment from 'moment'
import {printtsDate, printtsTime} from "../components/utils"
import {BiTimer } from "react-icons/bi"
import {FaNodeJs,FaPython} from "react-icons/fa"
import {AboutDataProduct} from "../components/AboutDataProduct"
import {NoDataProductsCreated} from "../components/NoDataProductsCreated"
import {DATA_PRODUCT_HEALTHY} from "./constants"
  
export const DataProductsHome = (props) => {
    const {woqlClient, dataProduct,setHead, branch, ref, branches, DBInfo} = WOQLClientObj()
    const [dataProductDetails, setDataProductDetails] = useState(false)
    const [dataProductSettings, setDataProductSettings] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [currentDay, setCurrentDay] = useState(moment())
    
    const [dataProvider, setDataProvider] = useState(false)
    
    let list = woqlClient ? woqlClient.databases() : []

    useEffect (() => {
        if(!woqlClient) return
        const newList = woqlClient.databases()
        newList.map(dp => {
            if(dp.name == dataProduct) {
                setDataProductDetails(dp)
            }
        })
        setCurrentDay(moment())
        //if(setReloadQuery) setReloadQuery(Date.now())
    }, [dataProduct]) 
      

    /*const {
        setNewDataProductInfo,
        loading,
        handleNew,
        setShowNewDataProductModal,
        showNewDataProductModal,
        showDeleteDataProductModal,
        setDeleteDataProductInfo,
        setShowDeleteDataProductModal} = useCreateNewDataProductStates(woqlClient) */

    
    return  <Layout sideBarContent={<LeftSideBar route={DATA_PRODUCTS}/>}>
        <main className="content mr-3 ml-5">
            <DeleteDatabaseModal showModal={showDeleteModal} 
                setShowModal={setShowDeleteModal}  
                dataProductDetails={dataProductDetails}/>


            {dataProduct && dataProductDetails && <React.Fragment>
                <Row className="mt-4"><h2 className="text-success fw-bold ml-3"> {dataProductDetails.label} </h2></Row>
                <Row className="mt-5 w-100 justify-content-md-center">
                    
                    <Col xs={8} className="d-block">
                        
                        {/*<DataProductSummary/>*/}

                        <Col md={12}>
                            <DataProductActivityGraph/>
                        </Col>

                        <Col md={12}  className="mb-5">
                            <DataProductActivityBoard/>
                        </Col>

                        <Col md={12}  className="mb-5">
                            <div className="card mb-5">
                                <div className="card-body">
                                    <div className="row align-items-center gx-0">
                                        <div className="col">
                                            <h6 className="text-uppercase text-muted mb-2 fw-bold">
                                                Manage Collections
                                            </h6>
                                        
                                            <div className="card-body w-100">
                                                <Row className="w-100 d-flex">
                                                    <Col md={10}>
                                                        <p className="mt-2 text-muted"> Each Data Product can have one or more collections, with the default collection called main. Collections saves each version of Data Product as a snapshot of the data exactly as it was at the moment you committed it.</p>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Button variant="light" 
                                                            className="m-3 btn btn-sm float-right text-right text-dark" 
                                                            onClick={(e) => setDataProductSettings(MANAGE_COLLECTIONS)}>
                                                            <BsBriefcase className="me-2"/> {MANAGE_COLLECTIONS}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row className="w-100 d-block">
                                                    {dataProduct && dataProductDetails && (dataProductSettings ==  MANAGE_COLLECTIONS) && 
                                                        <ManageProducts setDataProductSettings={setDataProductSettings}/>
                                                    }
                                                </Row>
                                                
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                       
                    </Col>
                    <Col xs={4}>
                        <AboutDataProduct dataProductDetails={dataProductDetails} 
                            setShowDeleteModal={setShowDeleteModal}
                            healthColor={DATA_PRODUCT_HEALTHY}/>
                    </Col>
                    
                </Row>
             
            </React.Fragment>
        
            }
            
            {list.length==0 && !dataProduct && <NoDataProductsCreated/>}

            {list.length>0  && !dataProduct && <NoDataProductSelected>
                <Row>
                <Col></Col>
                {/*<Col>
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
                </Col>*/}
                <Col></Col>
                </Row> 
            </NoDataProductSelected>    
            }
        </main>
    </Layout>
}