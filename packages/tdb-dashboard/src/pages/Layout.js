import React, {useState}  from 'react'
//import {MainNavBar} from '@terminusdb-live/tdb-react-layout'
import {MainNavBar} from '../components/MainNavBar'
import SplitPane from 'react-split-pane'
import {handleWidthChange} from './utils'
import {DataProductsHome} from "./DataProductsHome"
import {IconBar} from "../components/IconBar"
import {Col} from "@themesberg/react-bootstrap"
import {DATA_PRODUCT_EXPLORER_VIEW, DATA_PRODUCTS_VIEW, DATA_PRODUCT_MODEL_VIEW, DATA_PRODUCT_MANAGE_VIEW} from "./constants"
import {DatabaseList} from "../components/DatabaseList"
import {dataProductList} from "../hooks/DataProductList"
import {ModelBuilder} from "./ModelBuilder"
import {ProductsExplorer} from "./ProductsExplorer"
import {ManageProducts} from "./ManageProducts"
import {DatabaseButtons} from "../components/DatabaseButtons"
import {SampleQueries} from "../components/SampleQueries"
import {SavedQueries} from "../components/SavedQueries"
import {QueryPaneProvider} from "../hooks/queryPaneContext"
import {TDBReactAccordian} from '@terminusdb-live/tdb-react-layout'
import { useAuth0 } from "../react-auth0-spa"
import {DBContextProvider} from "../hooks/DBContext"



const getAccordianObjects = (woqlClient, dataProduct, setDataProduct, list) => {
    let accordianDatabaseButtons = 
    [
        {
            id: 2,
            eventKey: "1",
            title: `Connected to - ${dataProduct}`,
            description: <QueryPaneProvider>
                <DatabaseButtons woqlClient={woqlClient} dataProduct={dataProduct}/>
            </QueryPaneProvider>
        }
    ]

    let accordianDatabaseList = 
    [
        {
            id: 1,
            eventKey: "2",
            title: "Database List",
            description: <DatabaseList list={list} woqlClient={woqlClient} setDataProduct={setDataProduct}/>
        }
    ]

    let accordianSampleQueries = 
    [
        {
            id: 3,
            eventKey: "2",
            title: "Sample Queries",
            description: <QueryPaneProvider>
                <SampleQueries woqlClient={woqlClient} dataProduct={dataProduct}/>
            </QueryPaneProvider>
        }
    ]

    let accordianSavedQueries = 
    [
        {
            id: 4,
            eventKey: "2",
            title: "Saved Queries",
            description: <QueryPaneProvider>
                <SavedQueries woqlClient={woqlClient} dataProduct={dataProduct}/>
            </QueryPaneProvider>
        }
    ]

    return {accordianDatabaseButtons, accordianDatabaseList, accordianSampleQueries, accordianSavedQueries}

}

export const Layout = ({woqlClient}) => {
 
    const [width, setWidth] = useState("")
    const [dataProduct, setDataProduct] = useState(false)
    const [view, setView] = useState(DATA_PRODUCTS_VIEW)
    const {list, setList} = dataProductList(woqlClient)

    const {isAuthenticated, user, loading,loginWithRedirect,logout, login } = useAuth0()
    const {accordianDatabaseButtons, 
        accordianDatabaseList, 
        accordianSampleQueries, 
        accordianSavedQueries} = getAccordianObjects(woqlClient, dataProduct, setDataProduct, list)


    const Content = ({view, woqlClient, list, dataProduct}) => {
        if(view == DATA_PRODUCTS_VIEW) 
            return <DataProductsHome woqlClient={woqlClient} list={list}/> 
        else if (view == DATA_PRODUCT_EXPLORER_VIEW)
            return <ProductsExplorer woqlClient={woqlClient}/>
        else if (view == DATA_PRODUCT_MODEL_VIEW)
            return <DBContextProvider woqlClient={woqlClient} dataProduct={dataProduct}> 
                <ModelBuilder woqlClient={woqlClient} dataProduct={dataProduct}/>
            </DBContextProvider>
        else if (view == DATA_PRODUCT_MANAGE_VIEW)
            return <DBContextProvider woqlClient={woqlClient} dataProduct={dataProduct}>
                <ManageProducts woqlClient={woqlClient} dataProduct={dataProduct}/>
            </DBContextProvider>
        return <div/> 
    }

    return <React.Fragment>
        
    <SplitPane split="vertical"
        defaultSize="20%"
        onChange={size => handleWidthChange(size, setWidth)}>
    
        <div className="row nav-bar-row">
            <Col md={3}>
                <IconBar setView={setView} dataProduct={dataProduct}/>
            </Col>
            <Col md={9}>


                { (view !== DATA_PRODUCT_EXPLORER_VIEW) && <DatabaseList list={list} woqlClient={woqlClient} setDataProduct={setDataProduct}/>}
               
                {/*dataProduct && (view == DATA_PRODUCT_EXPLORER_VIEW) && <QueryPaneProvider>
                    <DatabaseButtons woqlClient={woqlClient} dataProduct={dataProduct}/>
                    <hr className="my-3 mr-3 border-indigo dropdown-divider" role="separator"></hr>
                    <SampleQueries woqlClient={woqlClient} dataProduct={dataProduct}/>
                    <hr className="my-3 mr-3 border-indigo dropdown-divider" role="separator"></hr>
                    <SavedQueries/>
                </QueryPaneProvider>*/}

                {dataProduct && (view == DATA_PRODUCT_EXPLORER_VIEW) && <React.Fragment>
                    <TDBReactAccordian
                        defaultKey="1"
                        data={accordianDatabaseList} />
                    <hr className="my-3 mr-3 border-indigo dropdown-divider" role="separator"></hr>
                    <TDBReactAccordian
                        defaultKey="1"
                        data={accordianDatabaseButtons} />
                    <hr className="my-3 mr-3 border-indigo dropdown-divider" role="separator"></hr>
                    <TDBReactAccordian
                        defaultKey="1"
                        data={accordianSampleQueries} />
                    <hr className="my-3 mr-3 border-indigo dropdown-divider" role="separator"></hr>
                    <TDBReactAccordian
                        defaultKey="1"
                        data={accordianSavedQueries} />
                    <hr className="my-3 mr-3 border-indigo dropdown-divider" role="separator"></hr>
                </React.Fragment>}

            </Col>
        </div>
            
        <div height={width}>
            <main className="content">
                <MainNavBar user={user} logout={logout}/>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <Content woqlClient={woqlClient} view={view} list={list} dataProduct={dataProduct}/>
                </div>
            </main>
        </div>
        
    </SplitPane>
    </React.Fragment>
}