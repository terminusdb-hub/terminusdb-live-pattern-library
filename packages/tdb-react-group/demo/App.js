import React from 'react'
import {GroupComponents} from '@terminusdb-live/tdb-react-group'

const dataProvider= [{"Commit_num":9,"TimeStamp":"2021-03-16T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":13,"TimeStamp":"2021-03-17T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":2,"TimeStamp":"2021-03-17T00:00:00.000Z","UserName":"GavinMendelGleason"},{"Commit_num":4,"TimeStamp":"2021-03-18T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":16,"TimeStamp":"2021-03-23T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":2,"TimeStamp":"2021-03-23T00:00:00.000Z","UserName":"github-actions[bot]"},{"Commit_num":11,"TimeStamp":"2021-03-24T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":18,"TimeStamp":"2021-03-25T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":1,"TimeStamp":"2021-03-25T00:00:00.000Z","UserName":"KittyJose"},{"Commit_num":3,"TimeStamp":"2021-03-25T00:00:00.000Z","UserName":"github-actions[bot]"},{"Commit_num":1,"TimeStamp":"2021-03-26T00:00:00.000Z","UserName":"Francesca-Bit"}]
const  config = {"chart":{"margin":{"top":10,"right":20,"left":0,"bottom":70},"title":"Commits","description":"30 Days"},
"rules":[{"pattern":{"scope":"Line","variables":["Commit_num"]},"rule":{"label":"Commit_numTool","showLabel":false, "dot":true,"strokeWidth":"3px","stroke":"#05a677","fill":"#05a677","type":"monotone", "dotR":"20"}},{"pattern":{"scope":"XAxis","variables":["TimeStamp"]},"rule":{"labelRotate":-40,"label":"Day","labelDateOutput":"YYYY-MM-DD ddd","padding":{"left":20,"right":20}}},{"pattern":{"scope":"YAxis"},"rule":{"type":"number","domain":["dataMin","dataMax  + 10"]}},
{"pattern":{"scope":"Legend"},"rule":{"layout":'vertical',"align":"left","payload":[{"value":"commits","color":"#05a677","id":"Commit_num"},{"value":"commits003","color":"red"}]}}]}


let configRepo = {
    display: "Vertical",
    buttons:[{id: "terminusdb:///data/Repository_327894826", icon: 'fa-window-maximize', size: "sm"},
    {id: "terminusdb:///data/Repository_262082824", icon: 'fa-window-maximize', size: "sm"},
    {id: "terminusdb:///data/Repository_329969626", icon: 'fa-window-maximize', size: "sm"},
    {id: "terminusdb:///data/Repository_204949228", icon: 'fa-window-maximize', size: "sm"},
    {id: "terminusdb:///data/Repository_208302966", icon: 'fa-window-maximize', size: "sm"},
    {id: "terminusdb:///data/Repository_198466472", icon: 'fa-window-maximize', size: "sm"}
    ]
}

let configCard = {
    display: "Card",
    size: 3,
    cards: [{id: "Stars", title:"Stars" , icon: "fa-star"},
        {id: "Commits",  title:"Commits" , icon: "fa-wave-square"},
        {id: "Forks",  title:"Forks" , icon: "fa-share-alt"},
        {id: "PullRequests",  title:"Pull Requests" , icon: "fa-code-branch"},
        {id: "Issues",  title:"Issues" , icon: "fa-exclamation-triangle"}]
}

const datap = [ {lib_name:"TDBReactButton.TDBReactButtonGroup",
                config:configRepo,
                onLoad:"https://hub-dev.dcm.ist/api/workers/admin/6dd5z1617187654409"},
                {lib_name:'TDBReactLayout.TDBReactLayout',
                resultVarName:null,
                config:configCard,startData:[],
                onLoad:"https://hub-dev.dcm.ist/api/workers/admin/tkrvdo1617178357567"     
                },

                {lib_name:'ReactChart.ReactChart',
                resultVarName:null,
                config:config,startData:dataProvider},

                //{lib_name:'ReactPrettyPrint.JsonPrint',resultVarName:'result001',config:{}},
                {lib_name:"ReactPrettyPrint.JsonPrint",resultVarName:'result001',
                onChangeEndPoint:'https://hub-dev.dcm.ist/api/workers/admin/a15d7h1616496639611'}]



let configCardList = {
    display: "List",
    size: 2,
    cards: [{id: "Stars", title:"Stars" , icon:"fa-star"},
        {id: "Commits",  title:"Commits" , icon: "fa-wave-square"},
        {id: "Forks",  title:"Forks" , icon: "fa-share-alt"},
        {id: "PullRequests",  title:"Pull Requests" , icon: "fa-code-branch"},
        {id: "Issues",  title:"Issues" , icon: "fa-exclamation-triangle"}]
}
                
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