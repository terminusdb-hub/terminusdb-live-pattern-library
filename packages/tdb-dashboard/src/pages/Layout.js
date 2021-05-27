import React from 'react'
import {Container} from "react-bootstrap"
import {MainNavBar} from '../components/MainNavBar'
import SplitPane from 'react-split-pane'
import {handleWidthChange} from './utils'
import {IconBar} from "../components/IconBar"

export const Layout = (props) => {
    
    return <Container fluid className="p-0 flex-row">                              
            <SplitPane split="vertical" minSize={70} defaultSize={350} primary="first">                                                    
                <div className="side-black h-100 d-flex">
                    <IconBar />
                    {props.sideBarContent}
                </div>
                <div className="h-100">
                    <MainNavBar/>
                    {props.children}                                       
                </div>
            </SplitPane>
        </Container>
}
/*

<SplitPane split="vertical"
        defaultSize="20%"
        onChange={size => handleWidthChange(size, setWidth)}>
    
        <div className="row nav-bar-row">
            <Col md={3}>
                <IconBar setView={setView} dataProduct={dataProduct}/>
            </Col>
            <Col md={9}>
                
                {(view == DATA_PRODUCTS_VIEW) && <ProductViewDatabaseList list={list} woqlClient={woqlClient} handleNew={handleNew}/>}

                {(view !== DATA_PRODUCT_EXPLORER_VIEW) && (view !== DATA_PRODUCTS_VIEW) && 
                    <DatabaseList list={list} woqlClient={woqlClient} setDataProduct={setDataProduct}/>}

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
                <div className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
                    <Content woqlClient={woqlClient} view={view} list={list} dataProduct={dataProduct}/>
                </div>
            </main>
        </div>
        
    </SplitPane>
    </React.Fragment>
}*/