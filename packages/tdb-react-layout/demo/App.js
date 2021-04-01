import React, { Component, useState,useRef } from 'react';
import {TDBReactLayout} from '@terminusdb-live/tdb-react-layout';
import {faStar, faWaveSquare, faShareAlt, faCodeBranch, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

import "./App.css"

const App= (props) =>{

    // display - Card/ List
    let configCard = {
        display: "Card",
        size: 2,
        cards: [{id: "Stars", title:"Stars" , icon: "fa-star"},
            {id: "Commits",  title:"Commits" , icon: "fa-wave-square"},
            {id: "Forks",  title:"Forks" , icon: "fa-share-alt"},
            {id: "PullRequests",  title:"Pull Requests" , icon: "fa-code-branch"},
            {id: "Issues",  title:"Issues" , icon: "fa-exclamation-triangle"}]
    }

    let configCardList = {
        display: "List",
        size: 2,
        cards: [{id: "Stars", title:"Stars" , icon:"fa-star"},
            {id: "Commits",  title:"Commits" , icon: "fa-wave-square"},
            {id: "Forks",  title:"Forks" , icon: "fa-share-alt"},
            {id: "PullRequests",  title:"Pull Requests" , icon: "fa-code-branch"},
            {id: "Issues",  title:"Issues" , icon: "fa-exclamation-triangle"}]
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
