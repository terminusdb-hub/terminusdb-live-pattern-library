import React, {useEffect} from "react"
import {Router,Switch,Route} from "react-router-dom"
import {Loading} from "./components/Loading"
import {SERVER_LOADING_MESSAGE} from "./components/constants"
import {trackWithPendo} from "./trackWithPendo"
import {useAuth0} from "./react-auth0-spa"
import {ProductsExplorer} from "./pages/ProductsExplorer"
import history from "./routing/history"
import {DOCUMENT,INVITE_PAGE,ORGANIZATION, DATA_PRODUCTS,PRODUCT_EXPLORER,PRODUCT_MODELS, DOCUMENT_EXPLORER, FEEDBACK, EXAMPLES_PRODUCTS, INFO} from "./routing/constants"
import {InitSetupPage} from "./pages/InitSetupPage"
import {ModelProductPage} from "./pages/ModelProductPage"
import {DataProductsHome} from "./pages/DataProductsHome"
import {DBContextProvider} from "./hooks/DBContext"
import {Home} from "./pages/Home"
import {VerifyEmail} from "./pages/VerifyEmail"
import PrivateRoute from "./routing/PrivateRoute"
//import {ManageProductPage} from "./pages/ManageProductPage"
import {DocumentPage} from "./pages/DocumentPage"
import {DocumentExplorer} from "./pages/DocumentExplorer"
import {Feedback} from "./pages/Feedback"
import {ExampleProducts} from "./pages/ExampleProducts"
import {TerminusInfo} from "./pages/TerminusInfo"

export function App (props){
    const { user, loading} = useAuth0();

    //const {loadingServer} = WOQLClientObj()
    const base_url =process.env.REACT_APP_BASE_ROUTER || ''
    if (window.location.search.includes("error=unauthorized")) {
       
        history.push(`/verify`)
    }
    
    if (window.location.search.includes("supportSignUp=true")) {
        history.push(`/`)
    }
    
    useEffect(() => {
        trackWithPendo(user)
    }, [user])

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
                <DBContextProvider> 
                    <PrivateRoute path={DATA_PRODUCTS} component = {DataProductsHome} exact/>
                    <PrivateRoute path={PRODUCT_EXPLORER} component = {ProductsExplorer} exact/>
                    <PrivateRoute path={PRODUCT_MODELS} component = {ModelProductPage} exact/>
                    <Route path={DOCUMENT} component = {DocumentPage} exact/>               
                    <PrivateRoute path={DOCUMENT_EXPLORER} component = {DocumentExplorer} exact/> 
                    <PrivateRoute path={FEEDBACK} component = {Feedback} exact/>               
                    <PrivateRoute path={EXAMPLES_PRODUCTS} component = {ExampleProducts} exact/>  
                    <PrivateRoute path={INFO} component = {TerminusInfo} exact/>  
                </DBContextProvider> 
                <Route path = {INVITE_PAGE} >
                    <PrivateRoute path = {INVITE_PAGE} component = {Home} exact />
                </Route> 
            </Switch>
            </Router>         
            </div>
          </React.Fragment>
}
