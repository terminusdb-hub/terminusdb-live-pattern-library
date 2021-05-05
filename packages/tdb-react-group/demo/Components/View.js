import React, {useState, useEffect} from "react"
import {QueryPane} from "./QueryPane"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {NEW_PANE_CONFIG} from "./constants"

export const View = ({setQp, qp, setWOQLQuery}) => {
    

    const QueryPaneBox = (props) => {

        const [newQp, setNewQp] = useState()

        return (
            <div id={props.id}>

                <TDBReactButton config={NEW_PANE_CONFIG} 
                    onClick={() => { setQp(arr => [...arr, {index: props.qp.length, 
                        woqlQuery: undefined, 
                        setWOQLQuery: props.setWOQLQuery}]) 
                    }}
                />

                <QueryPane id={props.pstate.index} 
                    name={props.name}
                    qpaneQuery={props.pstate.woqlQuery} 
                    setQp={setQp}
                    qp={qp}
                    setQPaneQuery={props.pstate.setWOQLQuery}/>

          </div>
        )
    }

    const NewQueryPane = ({setQp, qp, setWOQLQuery}) => {
        
        
        return qp.slice(0).reverse().map(m => <QueryPaneBox key={m.index} 
            id={`queryPane_${m.index}`}
            name={`Query Pane ${m.index + 1}`}
            setQp={setQp}
            qp={qp}
            setWOQLQuery={setWOQLQuery}
            pstate={m}/>
        )

    }

    return (
        <React.Fragment>
            <NewQueryPane setQp={setQp} qp={qp} setWOQLQuery={setWOQLQuery} />
        </React.Fragment>
    )


}

