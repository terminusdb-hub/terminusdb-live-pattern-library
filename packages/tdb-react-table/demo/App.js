import React, { Component, useState,useRef, useMemo } from 'react';
import {TDBReactTable} from '@terminusdb-live/tdb-react-table';
import {resultData} from './resultTest'
import moment from  'moment';
import {makeData} from './makeData'

const configData={columns : [], data: {}}

const App= (props) =>{



    //const data = React.useMemo(() => makeData(20), [])
    const data = makeData
    let columns = []



    console.log("data", data)

    for(var key in data[0]) { // format columns
      columns.push ({Header: key, accessor: key })
    }

    configData.columns = columns


    console.log("configData", JSON.stringify(configData))

    return <TDBReactTable startData={data} config={configData} />
    //onLoad="https://hub-dev.dcm.ist/api/workers/admin/a15d7h1616496639611"
}

export default App;
