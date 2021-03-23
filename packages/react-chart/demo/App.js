import React, { Component, useState,useRef } from 'react';
import {ReactChart} from '@terminusdb-live/react-chart';
import {resultData} from './resultTest'

const configData={"chart":{"margin":{"top":10,"right":20,"left":40,"bottom":80},"title":"Commits"},"rules":[{"pattern":{"scope":"Bar","variables":["Commit_num"]},"rule":{"label":"Commit for day","stroke":"#FF9800"}},{"pattern":{"scope":"XAxis","variables":["Timestamp"]},"rule":{"labelRotate":-40,"label":"Day","labelDateOutput":"YYYY-MM-DD ddd","padding":{"left":20,"right":20}}}]}


const App= (props) =>{  

    return <ReactChart onLoad="https://hub-dev.dcm.ist/api/workers/admin/a15d7h1616496639611" config={configData}/>
  
}

export default App;