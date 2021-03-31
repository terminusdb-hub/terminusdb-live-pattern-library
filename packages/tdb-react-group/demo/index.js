import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {GroupComponents} from '@terminusdb-live/tdb-react-group'


const datap = [{lib_name:'ReactPrettyPrint.JsonPrint',resultVarName:'result001',config:{}},
                {lib_name:"ReactPrettyPrint.JsonPrint",resultVarName:'result001',
                onChangeEndPoint:'https://hub-dev.dcm.ist/api/workers/admin/a15d7h1616496639611'}]


//}


ReactDOM.render(<App />, document.getElementById('root'));
