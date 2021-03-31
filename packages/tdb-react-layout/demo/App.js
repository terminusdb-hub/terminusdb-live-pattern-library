import React, { Component, useState,useRef } from 'react';
import {TDBReactLayout} from '@terminusdb-live/tdb-react-layout';
import {faStar, faWaveSquare, faShareAlt, faCodeBranch, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

import "./App.css"

const App= (props) =>{

    // display - Card/ List
    let configCard = {
        display: "Card",
        size: 2,
        cards: [{id: "Stars", title:"Stars" , icon: faStar},
            {id: "Commits",  title:"Commits" , icon: faWaveSquare},
            {id: "Forks",  title:"Forks" , icon: faShareAlt},
            {id: "PullRequests",  title:"Pull Requests" , icon: faCodeBranch},
            {id: "Issues",  title:"Issues" , icon: faExclamationTriangle}]
    }

    let configCardList = {
        display: "List",
        size: 2,
        cards: [{id: "Stars", title:"Stars" , icon: faStar},
            {id: "Commits",  title:"Commits" , icon: faWaveSquare},
            {id: "Forks",  title:"Forks" , icon: faShareAlt},
            {id: "PullRequests",  title:"Pull Requests" , icon: faCodeBranch},
            {id: "Issues",  title:"Issues" , icon: faExclamationTriangle}]
    }

    return <React.Fragment>
        <TDBReactLayout onLoad="https://hub-dev.dcm.ist/api/workers/admin/tkrvdo1617178357567" 
            config={configCard}/>
        <TDBReactLayout onLoad="https://hub-dev.dcm.ist/api/workers/admin/tkrvdo1617178357567" 
            config={configCardList}/>
    </React.Fragment>
    
}


//startData={props.start}  

export default App; 
