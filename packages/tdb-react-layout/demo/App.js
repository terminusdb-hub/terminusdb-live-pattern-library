import React, { Component, useState,useRef } from 'react';
import {TDBReactLayout} from '@terminusdb-live/tdb-react-layout';
import {faStar, faWaveSquare, faShareAlt, faCodeBranch, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

import "./App.css"

const App= (props) =>{


    let config = [{id: "Stars", title:"Stars" , icon: faStar, data: 1000},
    {id: "Commits",  title:"Commits" , icon: faWaveSquare, data: 4320},
    {id: "Forks",  title:"Forks" , icon: faShareAlt, data: 590},
    {id: "PullRequests",  title:"Pull Requests" , icon: faCodeBranch, data: 40},
    {id: "Issues",  title:"Issues" , icon: faExclamationTriangle, data: 78}]

    return <TDBReactLayout onLoad="https://hub-dev.dcm.ist/api/workers/admin/tkrvdo1617178357567" config={config}/>

    //startData={props.start}  
}

export default App; 
