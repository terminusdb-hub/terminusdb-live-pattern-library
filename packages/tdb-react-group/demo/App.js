import React from 'react'
import {GroupComponents} from '@terminusdb-live/tdb-react-group'

const dataProvider= [{"Commit_num":9,"TimeStamp":"2021-03-16T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":13,"TimeStamp":"2021-03-17T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":2,"TimeStamp":"2021-03-17T00:00:00.000Z","UserName":"GavinMendelGleason"},{"Commit_num":4,"TimeStamp":"2021-03-18T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":16,"TimeStamp":"2021-03-23T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":2,"TimeStamp":"2021-03-23T00:00:00.000Z","UserName":"github-actions[bot]"},{"Commit_num":11,"TimeStamp":"2021-03-24T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":18,"TimeStamp":"2021-03-25T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":1,"TimeStamp":"2021-03-25T00:00:00.000Z","UserName":"KittyJose"},{"Commit_num":3,"TimeStamp":"2021-03-25T00:00:00.000Z","UserName":"github-actions[bot]"},{"Commit_num":1,"TimeStamp":"2021-03-26T00:00:00.000Z","UserName":"Francesca-Bit"}]
const  config = {"chart":{"margin":{"top":10,"right":20,"left":0,"bottom":70},"title":"Commits","description":"30 Days"},
"rules":[{"pattern":{"scope":"Line","variables":["Commit_num"]},"rule":{"label":"Commit_numTool","showLabel":false, "dot":true,"strokeWidth":"3px","stroke":"#05a677","fill":"#05a677","type":"monotone", "dotR":"20"}},{"pattern":{"scope":"XAxis","variables":["TimeStamp"]},"rule":{"labelRotate":-40,"label":"Day","labelDateOutput":"YYYY-MM-DD ddd","padding":{"left":20,"right":20}}},{"pattern":{"scope":"YAxis"},"rule":{"type":"number","domain":["dataMin","dataMax  + 10"]}},
{"pattern":{"scope":"Legend"},"rule":{"layout":'vertical',"align":"left","payload":[{"value":"commits","color":"#05a677","id":"Commit_num"},{"value":"commits003","color":"red"}]}}]}


const datap = [ {lib_name:'ReactChart.ReactChart',
                resultVarName:null,
                config:config,startData:dataProvider},
                {lib_name:'ReactPrettyPrint.JsonPrint',resultVarName:'result001',config:{}},
                {lib_name:"ReactPrettyPrint.JsonPrint",resultVarName:'result001',
                onChangeEndPoint:'https://hub-dev.dcm.ist/api/workers/admin/a15d7h1616496639611'}]
                
                
/*let config = [{id: "Stars", title:"Stars" ,  data: 1000},
                {id: "Commits",  title:"Commits" , icon: faWaveSquare, data: 4320},
                {id: "Forks",  title:"Forks" , icon: faShareAlt, data: 590},
                {id: "PullRequests",  title:"Pull Requests" , icon: faCodeBranch, data: 40},
                {id: "Issues",  title:"Issues" , icon: faExclamationTriangle, data: 78}]
            
 */






const App= (props) =>{  
    return <GroupComponents config={datap}/>
    //onLoad="https://hub-dev.dcm.ist/api/workers/admin/a15d7h1616496639611"
}

export default App;