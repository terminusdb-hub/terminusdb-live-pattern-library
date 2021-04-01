import React from "react"
import {useWorker} from "@terminusdb-live/react-worker"
import {Col, Nav} from '@themesberg/react-bootstrap'

export const TDBReactNav= (props) =>{
    
    const startData= props.startData || []
    const config = props.config.navLinks || {}
    
    
    const display = props.config.display || "Vertical"
    //var displayCss;
    //(display == "Vertical") ? displayCss = "nav flex-column" : displayCss = "nav flex" 

    const {onChange, error, loading, dataProvider} = useWorker(startData, props.onLoad, false)

    let navLinks=[]
    
    console.log(JSON.stringify(dataProvider,null,4))

    if(dataProvider.length>0){
        function extractFromBindings(id, curItem){
            for(var key in dataProvider){
                let repoId = dataProvider[key].Repository
                if(repoId == id){
                    let label = dataProvider[key].Label
                    return {title: label, id: repoId, icon: curItem.icon, size: curItem.size}
                }
            }
            return {}
        }
    
        for (var key in config) {
            let id = config[key].id 
            let extracted = extractFromBindings(id, config[key])
            navLinks.push(
                <Nav.Link href="/home">{extracted.title}</Nav.Link>
            )

            /*
            <li className="nav-item">
                    <TDBReactButton config={extracted} key={`tdbButton_${extracted.title}`}/>
                </li>
                */
        }

        /*return <React.Fragment>
            <ul className={displayCss}>
                {buttons}
            </ul>
        </React.Fragment>*/
        return <Nav defaultActiveKey="/home" className="flex-column">
        {navLinks}
    </Nav>
    } 

    return <div>LOADING</div> 
}
