import React from "react"
import {
    Router,
    Switch,
    Route,
} from "react-router-dom"

import {createBrowserHistory} from "history"
import {ORGANIZATION, DATA_PRODUCTS,PRODUCT_EXPLORER,PRODUCT_MODELS} from "./constants"
import {InitSetupPage} from "../pages/InitSetupPage"
import {ModelProductPage} from "../pages/ModelProductPage"
import {ProductsExplorer} from "../pages/ProductsExplorer"
import {ManageProducts} from "../pages/ManageProducts"
import {DataProductsHome} from "../pages/DataProductsHome"
import {DBContextProvider} from "../hooks/DBContext"
import {Home} from "../pages/Home"
import {VerifyEmail} from "../pages/VerifyEmail"
//import {ConsoleHistory} from "../"
//{basename: base_router}
export const ConsoleHistory= createBrowserHistory();

export const Routes = () => {
// <DataProductsHome woqlClient={woqlClient} list={list}/>
    if (window.location.search.includes("error=unauthorized")) {
        ConsoleHistory.push("/verify")
    }
    return <Router history={ConsoleHistory}>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/verify" exact>
                    <VerifyEmail />
                </Route>
                <Route path={DATA_PRODUCTS}>
                    <DataProductsHome />
                </Route>
                <DBContextProvider>
                    <Route path={PRODUCT_EXPLORER}>
                        <ProductsExplorer />
                    </Route> 
                    <Route path={PRODUCT_MODELS}>
                        <ModelProductPage/>     
                    </Route>
                </DBContextProvider>            
            </Switch>
            </Router>
  }

  /*

   <Route path={ORGANIZATION}>
                    <InitSetupPage />
                </Route>

   <Route path={PRODUCT_EXPLORER}>
                    <ProductsExplorer woqlClient={woqlClient}/>
                </Route>
                <Route path={PRODUCT_MODELS}>
                    <DBContextProvider woqlClient={woqlClient} dataProduct={dataProduct}> 
                        <ModelBuilder woqlClient={woqlClient} dataProduct={dataProduct}/>
                    </DBContextProvider>
                </Route>

  
  <Router>
            <Switch>
                <Route path={DATA_PRODUCTS}>
                    <Layout woqlClient={woqlClient}/>
                </Route>
                <Route path={ORGANIZATION}>
                    <InitSetupPage woqlClient={woqlClient}/>
                </Route>
            </Switch>
            </Router>*/
  