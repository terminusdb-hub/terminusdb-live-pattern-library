import React, { Component, useState,useRef } from 'react';
import {ReactChart} from '@terminusdb-live/react-chart';
import {resultData} from './resultTest'
import moment from  'moment';

const configData={"chart":{"margin":{"top":10,"right":20,"left":40,"bottom":80},"title":"Commits"},"rules":[{"pattern":{"scope":"Line","variables":["Commit_num"]},"rule":{"label":"Commit_numTool","stroke":"#FF9800","type":"number"}},{"pattern":{"scope":"XAxis","variables":["TimeStamp"]},"rule":{"labelRotate":-40,"label":"Day","labelDateOutput":"YYYY-MM-DD ddd","padding":{"left":20,"right":20}}},{"pattern":{"scope":"YAxis"},"rule":{"label":"Number of Commits","type":"number","domain":["dataMin","dataMax  + 10"]}}]}

const App= (props) =>{  
   const label='2020-11-25T00:00:00.000Z'
   const mom=moment(label)
   console.log(mom)
     // if(mom.format(labelDateOutput)!==undefined){
    console.log(mom.format('YYYY-MM-DD ddd'))
      //}

    const start=[{"TimeStamp":"2021-03-16T00:00:00.000Z","Commit_num":9,"Commit_numTool":{"Cheukting":9}},{"TimeStamp":"2021-03-17T00:00:00.000Z","Commit_num":15,"Commit_numTool":{"Cheukting":13,"GavinMendelGleason":2}},{"TimeStamp":"2021-03-18T00:00:00.000Z","Commit_num":3,"Commit_numTool":{"Cheukting":3}},{"TimeStamp":"2021-03-23T00:00:00.000Z","Commit_num":18,"Commit_numTool":{"Cheukting":16,"github-actions[bot]":2}}]
    return <ReactChart startData={start}  config={configData}/>
  //onLoad="https://hub-dev.dcm.ist/api/workers/admin/a15d7h1616496639611"
}

export default App;