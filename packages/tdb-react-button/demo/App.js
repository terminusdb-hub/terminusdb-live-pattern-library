import React, { Component, useState,useRef } from 'react';
import {TDBReactButtonGroup} from '@terminusdb-live/tdb-react-button';
//import {faWindowMaximize} from "@fortawesome/free-solid-svg-icons";

import "./App.css"

const App= (props) =>{

    let config = {
        display: "Vertical",
        buttons:[{id: "terminusdb:///data/Repository_327894826", icon: 'fa-window-maximize', size: "sm"},
        {id: "terminusdb:///data/Repository_262082824", icon: 'fa-window-maximize', size: "sm"},
        {id: "terminusdb:///data/Repository_329969626", icon: 'fa-window-maximize', size: "sm"},
        {id: "terminusdb:///data/Repository_204949228", icon: 'fa-window-maximize', size: "sm"},
        {id: "terminusdb:///data/Repository_208302966", icon: 'fa-window-maximize', size: "sm"},
        {id: "terminusdb:///data/Repository_198466472", icon: 'fa-window-maximize', size: "sm"}
        ]
    }

    return <TDBReactButtonGroup onLoad="https://hub-dev.dcm.ist/api/workers/admin/6dd5z1617187654409" config={config}/>

    //startData={props.start}  
}

export default App; 
