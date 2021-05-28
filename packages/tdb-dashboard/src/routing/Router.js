//maybe I can remove it
/*
import React from "react"
import {
    Router,
    Switch,
    Route,
} from "react-router-dom"

import {createBrowserHistory} from "history"
import {ORGANIZATION, DATA_PRODUCTS, PRODUCT_EXPLORER, PRODUCT_MODELS, PRODUCT_MANAGE} from "./constants"
import {InitSetupPage} from "../pages/InitSetupPage"
import {ModelProductPage} from "../pages/ModelProductPage"
import {ProductsExplorer} from "../pages/ProductsExplorer"
import {ManageProductPage} from "../pages/ManageProductPage"
import {DataProductsHome} from "../pages/DataProductsHome"
import {DBContextProvider} from "../hooks/DBContext"
import {Home} from "../pages/Home"
import {VerifyEmail} from "../pages/VerifyEmail"
import PrivateRoute from "./PrivateRoute"
import {DashboardRouter} from "./DashboardRouter"

export const ConsoleHistory= createBrowserHistory();

export const Routes = () => {
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
                <PrivateRoute path={DATA_PRODUCTS} component = {DataProductsHome} exact/>
                <DBContextProvider>
                    <PrivateRoute path={PRODUCT_EXPLORER} component = {ProductsExplorer} exact/>
                    <PrivateRoute path={PRODUCT_MODELS} component = {ModelProductPage} exact/>               
                </DBContextProvider> 
            </Switch>
            </Router>
}
*/
/*
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
                <Route path={PRODUCT_MANAGE}>
                    <ManageProductPage/>     
                </Route>                   
            </DBContextProvider>            
        </Switch>
    </Router>
  }

*/
