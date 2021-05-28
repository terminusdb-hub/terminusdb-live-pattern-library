import React, {useEffect, useState} from "react"
import {DatabaseCard, NewDatabaseCard} from "../components/DatabaseCard"
import {Row, Col, Card, Button} from "react-bootstrap"
import {TDBReactButton,MainLayout} from '@terminusdb-live/tdb-react-layout'
import {NEW_DATA_PRODUCT_BUTTON, DATA_PRODUCT_LABEL} from "./constants"
import {useCreateNewDataProductStates} from "../hooks/CreateNewDataProduct"
import {dataProductList} from "../hooks/DataProductList"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {Sidebar} from './Sidebar'
import {ConsoleHistory} from "../routing/Router"
import {PRODUCT_MODELS, DATA_PRODUCTS} from "../routing/constants"
import {SideBar} from "./Sidebar"
import {FiSettings} from "react-icons/fi"
import {AiOutlineDelete} from "react-icons/ai"
import {NewDatabaseModal} from "../components/NewDatabaseModal"

const DataProductSummary = ({dataProductDetails}) => {
    return <Col md={12} className="px-xl-0 mt-5">
        {<React.Fragment>
            <div className="d-flex align-items-center">
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Size</h6>
                    <h3>{"234 KB"}</h3>
                    {/*<h3>{formatBytes(details['Size']['@value'])}</h3>*/}
                </div>
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Triples</h6>
                    <h3>{"3243 triples"}</h3>
                    {/*<h3>{formatTripleCount(details['Triples']['@value'])}</h3>*/}
                </div>
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Commits</h6>
                    <h3>{"520 commits"}</h3>
                    {/*<h3>{formatCommits(details['Commits']['@value'])}</h3>*/}
                </div>
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Classes</h6>
                    <h3>{"90 classes"}</h3>
                   {/* <h3>{formatClassesCount(details['Classes']['@value'])}</h3>*/}
                </div>
                <div class="d-block col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Properties</h6>
                    <h3>{"875 properties"}</h3>
                    {/*<h3>{formatPropertiesCount(details['Properties']['@value'])}</h3>*/}
                </div>
            </div>
            <div className="d-flex align-items-center">
                <div className="d-block mt-5 mb-5 align-items-center col-md-2">
                    <h6 class="fw-normal text-muted mb-2">Most recent commit </h6>
                    <h6>{"10.17, May 27 2021 by TerminusDB"}</h6>
                    {/*<h6>{formatLastCommitTimeStamp(details)}</h6>*/}
                </div>
                <div className="d-block mt-5 mb-5 align-items-center col-md-2">
                    <h6 class="fw-normal text-muted mb-2">First commit </h6>
                    <h6>{"10.17, May 27 2021"}</h6>
                    {/*<h6>{formatLastCommitTimeStamp(details)}</h6>*/}
                </div>
            </div>
        </React.Fragment>
        }
    </Col>
}

export const DataProductsHome = (props) => {
    const {woqlClient, setDataProduct, dataProduct} = WOQLClientObj()
    const [dataProductDetails, setDataProductDetails] = useState(false)
    
    //if(woqlClient) woqlClient.setSystemDb()

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
        showNewDataProductModal} = useCreateNewDataProductStates(woqlClient)


 
    return  <Layout sideBarContent={<Sidebar page = {DATA_PRODUCTS} handleNew={handleNew}></Sidebar>}>
        <main className="content mr-3 ml-5 w-95">
            <Row>
                {/*newDataProduct && <div className="col-md-4 d-grid pb-3">
                        <NewDatabaseCard onCancel={setNewDataProduct} 
                            setNewDataProductInfo={setNewDataProductInfo} 
                            loadiSideBarng={loading}/>
                    </div>
                */}
            </Row>

            <NewDatabaseModal setShowNewDataProductModal={setShowNewDataProductModal} showNewDataProductModal={showNewDataProductModal} setNewDataProductInfo={setNewDataProductInfo} loading={loading}/>

            {dataProduct && dataProductDetails && <Row className="mt-5 w-100 justify-content-md-center">
            <Col xs={12} className="mb-4 d-none d-sm-block align-items-center ">
                <Card>
                    <Card.Header as="h3">
                        Connected to Data Product  - 
                        <strong className="text-success"> {dataProductDetails.label}</strong>
                        <div className="float-right d-flex">
                            <Button variant="light" className="mr-3">
                                <FiSettings className="me-2"/>Advanced Settings
                            </Button>
                            <Button variant="danger" title={`Delete Data Product ${dataProduct}`}>
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
                    {/*<Card.Footer>
                        <Button variant="light" className="float-right">
                            <FiSettings className="me-2"/>Advanced Settings
                        </Button>
                    </Card.Footer>*/}
                </Card>
            </Col>
        </Row>}
            
            {!dataProduct && <div style={{top: "50%", bottom: "50%", position: "absolute", width: "100%"}}>
                <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
                    <h1 className="text-dark mt-5">
                        Use the sidebar to connect to a <span className="fw-bolder">Data Product</span>
                    </h1>
                </Col>
            </div>}
        </main>
    </Layout>
}