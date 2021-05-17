import React, {useState}  from 'react'
import {NavBar} from "../../Components/Navbar"
import SplitPane from 'react-split-pane'
import {handleWidthChange} from './utils'
import {DataProductsHome} from "./DataProductsHome"
import {IconBar} from "../../Components/IconBar"
import {Col} from "@themesberg/react-bootstrap"
import {DATA_PRODUCTS_EXPLORER_VIEW, DATA_PRODUCTS_VIEW, DATA_PRODUCT_MODEL_VIEW} from "../constants"
import {DatabaseList} from "../../Components/DatabaseList"
import {dataProductList} from "../../Hooks/DataProductList"
import {ModelBuilder} from "./ModelBuilder"

export const Layout = ({woqlClient}) => {
 
    const [width, setWidth] = useState("")
    const [view, setView] = useState(DATA_PRODUCTS_VIEW)
    const {list, setList} = dataProductList(woqlClient)

    const Content = ({view, woqlClient, list}) => {
        if(view == DATA_PRODUCTS_VIEW) 
            return <DataProductsHome woqlClient={woqlClient} list={list}/> 
        else if (view == DATA_PRODUCTS_EXPLORER_VIEW)
            return <div>{DATA_PRODUCTS_EXPLORER_VIEW}</div>
        else if (view == DATA_PRODUCT_MODEL_VIEW)
            return <ModelBuilder woqlClient={woqlClient}/>
        return <div/> 
    }

    return <React.Fragment>
        
    <SplitPane split="vertical"
        defaultSize="15%"
        onChange={size => handleWidthChange(size, setWidth)}>
    
        <div className="row nav-bar-row">
            <Col md={3}>
                <IconBar setView={setView}/>
            </Col>
            <Col md={9}>
            
                <DatabaseList list={list} woqlClient={woqlClient}/>
               {/* <nav className="col-md-2 vh-100 position-fixed d-flex flex-column d-md-block bg-custom-blue sidebar">
                    <div className="sidebar-sticky">
                        <div className="nav-item mb-4 mt-4 d-flex justify-content-center">
                            <a href="https://terminusdb.com" target="_blank" className="nav-link">
                                <span>
                                    <img src="https://terminusdb.com/img/logos/logo.svg" className="logo_img"/>
                                </span>
                            </a>
                        </div> 
                    </div>
                </nav>*/}
            </Col>
        </div>
            
        <div height={width}>
            <main className="content">
                <NavBar/>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <Content woqlClient={woqlClient} view={view} list={list}/>
                </div>
            </main>
        </div>
        
    </SplitPane>
    </React.Fragment>
}