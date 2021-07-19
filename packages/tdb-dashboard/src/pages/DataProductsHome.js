import React, {useEffect, useState} from "react"
import {Row, Col, Card, Button} from "react-bootstrap"
import {useCreateNewDataProductStates} from "../hooks/CreateNewDataProduct"
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
import {TimeTravel} from "../components/TimeTravel"
import {BsBriefcase, BsDashSquare} from "react-icons/bs"
import {MANAGE_COLLECTIONS} from "../components/constants"
import {LeftSideBar} from "../components/LeftSideBar"
import {useCommitsControl} from '@terminusdb-live/tdb-react-components'
import moment from 'moment'
import {DBContextObj} from "../hooks/DBContext"
import {printtsDate, printtsTime} from "../components/utils"
import {BiTimer } from "react-icons/bi"
import {AboutDataProduct} from "../components/AboutDataProduct"
  


export const DataProductsHome = (props) => {
    const {woqlClient, dataProduct} = WOQLClientObj()
    const [dataProductDetails, setDataProductDetails] = useState(false)

    const list = woqlClient.databases() //dataProductList(woqlClient)

    const [dataProductSettings, setDataProductSettings] = useState(false)

    const [currentDay, setCurrentDay] = useState(moment())
    const [dataProvider, setDataProvider] = useState(false)

    useEffect (() => {
        const newList = woqlClient.databases()
        newList.map(dp => {
            if(dp.name == dataProduct) {
                setDataProductDetails(dp)
            }
        })
        setCurrentDay(moment())
        if(setReloadQuery) setReloadQuery(Date.now())
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

    
    const {setHead, branch, ref, branches, DBInfo} = DBContextObj()
    let { 
        dataProviderValues,
        loadPreviousPage,
        gotoPosition,
        startTime,
        setStartTime,
        setSelectedValue,
        loadNextPage,
        setReloadQuery
    } = useCommitsControl(woqlClient, null, branch, currentDay.unix(), ref, null)


    useEffect(() => {
        if(!dataProviderValues) return
        setDataProvider(dataProviderValues.dataProvider)
    }, [dataProviderValues])
    

    const TimelineElements = () => {
        if(!dataProvider) return <div/>

        let timeElements = []
        let selectedCounter = 0

        dataProvider.slice(0).reverse().map((item) => {
            if(selectedCounter>=5) return
            timeElements.push(<React.Fragment>

                <div class="list-group-item">
                    <div class="row">
                        <div class="col-auto">
                            <div class="avatar avatar-sm avatar-online">
                                <BiTimer className="activity-icon text-muted"/>
                            </div>

                        </div>
                        <div class="col ms-n2">
                            <h5 class="mb-1 d-flex">
                                {item.author}
                            </h5>

                            <h6 className="float-right">{printtsDate(item.time)} </h6>

                            <p class="small text-muted mb-0">
                                {item.message}
                            </p>

                            <small class="text-muted">
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
                <Row className="mt-4"><h2 className="text-success fw-bold ml-3"> {dataProductDetails.label} </h2></Row>
                <Row className="mt-5 w-100 justify-content-md-center">
                    
                    <Col xs={9} className="d-block">
                        <DataProductSummary/>

                        {dataProvider.length>0 && <div class="card card-fil m-3">
                            <div class="card-header d-flex">
                                <h4 class="card-header-title">
                                Recent Activities
                                </h4>
                                <Button className="btn btn-sm btn-light float-right" style={{marginLeft: "auto"}}> View More </Button>

                            </div>
                            <div class="card-body">

                                <div class="list-group list-group-flush list-group-activity my-n3">
                                    <TimelineElements/>
                                </div>
                            </div>

                           
                        </div>}

                        <div class="m-3 card card-fil mb-5">
                            <div class="card-header d-flex">
                            <h4 className="card-header-title text-muted">
                                Manage Collections
                                </h4>
                            </div>
                           
                            <div class="card-body w-100">
                                <Row className="w-100 d-flex">
                                    <Col md={10}>
                                        <p className="mt-2 text-muted"> Each Data Product can have one or more collections, with the default collection called main. Collections saves each version of Data Product as a snapshot of the data exactly as it was at the moment you committed it.</p>
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="light" 
                                            className="m-3 btn btn-sm float-right text-right" 
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

                        

                        <div class="card card-fil m-3">
                            <div class="card-header d-flex">
                                <h4 class="card-header-title text-muted">
                                Danger Zone
                                </h4>
                            </div>
                            <div class="card-body w-100 d-flex">
                                <Col md={10}>
                                    <p className="mt-2 text-muted"> Delete this Data Product, there is no going back. Please be certain. </p>
                                </Col>
                                <Col md={2}>
                                    <Button variant="danger" 
                                            title={`Delete Data Product ${dataProduct}`} 
                                            className="m-3 float-right text-right btn btn-sm"
                                            onClick={(e) =>setShowDeleteDataProductModal(true)}>
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
            
            {!dataProduct && <NoDataProductSelected/>}
        </main>
    </Layout>
}