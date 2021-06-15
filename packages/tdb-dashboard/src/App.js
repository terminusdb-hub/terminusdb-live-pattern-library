import React, {useEffect} from "react"
import {Router,Switch,Route} from "react-router-dom"
import {Loading} from "./components/Loading"
import {SERVER_LOADING_MESSAGE} from "./components/constants"
import {trackWithPendo} from "./trackWithPendo"
import {useAuth0} from "./react-auth0-spa"
import {ProductsExplorer} from "./pages/ProductsExplorer"
import history from "./routing/history"
import {ORGANIZATION, DATA_PRODUCTS,PRODUCT_EXPLORER,PRODUCT_MODELS,INVITE_PAGE} from "./routing/constants"
import {InitSetupPage} from "./pages/InitSetupPage"
import {ModelProductPage} from "./pages/ModelProductPage"
import {ManageProducts} from "./pages/ManageProducts"
import {DataProductsHome} from "./pages/DataProductsHome"
import {DBContextProvider} from "./hooks/DBContext"
import {Home} from "./pages/Home"
import {VerifyEmail} from "./pages/VerifyEmail"
import PrivateRoute from "./routing/PrivateRoute"
//import {ManageProductPage} from "./pages/ManageProductPage"

export function App (props){
    const { user, loading, logout} = useAuth0();

    console.log("___REDIRECT__",window.location.href, window.location.search)
 
    //const {loadingServer} = WOQLClientObj()
    const base_url =process.env.REACT_APP_BASE_ROUTER || ''
    if (window.location.search.includes("error=unauthorized")) {
        //if(logout)logoutWithRedirect()
        history.push(`/verify`)
    }
    
    /*useEffect(() => {
        if(user){
             trackWithPendo(user)
        }
    }, [user])*/

    if(loading) return <Loading message={SERVER_LOADING_MESSAGE}/>

    return <React.Fragment>
            <div className="container-fluid container-background h-100">
            <Router history={history}>
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
                <Route path = {INVITE_PAGE} >
                    <PrivateRoute path = {INVITE_PAGE} component = {Home} exact />
                </Route> 
            </Switch>
            </Router>         
            </div>
          </React.Fragment>
}
