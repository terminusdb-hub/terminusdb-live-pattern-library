import React from 'react'
import {GroupComponents} from '@terminusdb-live/tdb-react-group'


const datap = [{lib_name:'ReactPrettyPrint.JsonPrint',resultVarName:'result001',config:{}},
                {lib_name:"ReactPrettyPrint.JsonPrint",resultVarName:'result001',
                onChangeEndPoint:'https://hub-dev.dcm.ist/api/workers/admin/a15d7h1616496639611'}]



const App= (props) =>{  
    return <GroupComponents config={datap}/>
    //onLoad="https://hub-dev.dcm.ist/api/workers/admin/a15d7h1616496639611"
}

export default App;