import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom" 
import {Row, Col, Card, Button} from "react-bootstrap"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {DATA_PRODUCTS} from "../routing/constants"
import {AiOutlineDelete} from "react-icons/ai"
import {DeleteDatabaseModal} from "../components/DeleteDatabaseModal"
import {DataProductSummary} from "../components/DataProductSummary"
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
  
export const DataProductsHome = (props) => {
    const {woqlClient, dataProduct,setHead, branch, ref, branches, DBInfo} = WOQLClientObj()
    const [dataProductDetails, setDataProductDetails] = useState(false)
    const [dataProductSettings, setDataProductSettings] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [currentDay, setCurrentDay] = useState(moment())
    
    const [dataProvider, setDataProvider] = useState(false)

    let list = woqlClient.databases()

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


    const TimelineElements = () => {
        if(!dataProvider) return <div/>

        let timeElements = []
        let selectedCounter = 0

        dataProvider.slice(0).reverse().map((item) => {
            if(selectedCounter>=5) return
            timeElements.push(<React.Fragment>

                <div className="list-group-item">
                    <div className="row">
                        <div className="col-auto">
                            <div className="avatar avatar-sm avatar-online">
                                <BiTimer className="activity-icon text-muted"/>
                            </div>

                        </div>
                        <div className="col ms-n2">
                            <h5 className="mb-1 d-flex">
                                {item.author}
                            </h5>

                            <h6 className="float-right">{printtsDate(item.time)} </h6>

                            <p className="small text-muted mb-0">
                                {item.message}
                            </p>

                            <small className="text-muted">
                                {printtsTime(item.time)}
                            </small>
                        </div>
                    </div> 
                </div>
            </React.Fragment>  )  
            selectedCounter += 1
        })

        return timeElements
    }
      
    
    return  <Layout sideBarContent={<LeftSideBar route={DATA_PRODUCTS}/>}>
        <main className="content mr-3 ml-5 w-95">
            <DeleteDatabaseModal showModal={showDeleteModal} 
                setShowModal={setShowDeleteModal}  
                dataProductDetails={dataProductDetails}/>


            {dataProduct && dataProductDetails && <React.Fragment>
                <Row className="mt-4"><h2 className="text-success fw-bold ml-3"> {dataProductDetails.label} </h2></Row>
                <Row className="mt-5 w-100 justify-content-md-center">
                    
                    <Col xs={9} className="d-block">
                        
                        <DataProductSummary/>

                        {dataProvider.length>0 && <div className="card card-fil m-3">
                            <div className="card-header d-flex">
                                <h4 className="card-header-title">
                                Recent Activities
                                </h4>
                                <Button className="btn btn-sm btn-light float-right" style={{marginLeft: "auto"}}> View More </Button>

                            </div>
                            <div className="card-body">

                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {/*<TimelineElements/>*/}
                                </div>
                            </div>

                           
                        </div>}

                        <div className="m-3 card card-fil mb-5">
                            <div className="card-header d-flex">
                            <h4 className="card-header-title text-muted">
                                Manage Collections
                                </h4>
                            </div>
                           
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

                        

                        <div className="card card-fil m-3">
                            <div className="card-header d-flex">
                                <h4 className="card-header-title text-muted">
                                Danger Zone
                                </h4>
                            </div>
                            <div className="card-body w-100 d-flex">
                                <Col md={10}>
                                    <p className="mt-2 text-muted"> Delete this Data Product, there is no going back. Please be certain. </p>
                                </Col>
                                <Col md={2}>
                                    <Button variant="danger" 
                                            title={`Delete Data Product ${dataProduct}`} 
                                            className="m-3 float-right text-right btn btn-sm"
                                            onClick={(e) =>setShowDeleteModal(true)}>
                                        <AiOutlineDelete className="me-2" /> Delete 
                                    </Button>
                                </Col>
                            </div>
                        </div>

                    </Col>
                    <Col xs={3}>
                        <AboutDataProduct dataProductDetails={dataProductDetails}/>
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