import React, {useState, useEffect} from "react"
import {QueryPane} from "./QueryPane"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {NEW_PANE_CONFIG} from "./constants"

export const View = ({setQp, qp, setWOQLQuery}) => {
    

    const QueryPaneBox = (props) => {

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

    const NewQueryPane = ({setQp, qp, setWOQLQuery, setPaneNumber}) => {
        
        
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

/*

export const View = (props) => {

    const QueryPaneBox = (props) => {
        const {qp, setQp} = props.pstate;

        return (
            <div id={props.id}>
                <QueryPane/>
                <TDBReactButton config={NEW_PANE_CONFIG} 
                    onClick={() => { setQp([...qp, qp.length]) }}
                />
          </div>
        );
    }

    const NewQueryPane = () => {
        const [qp, setQp] = useState([0]);
        return qp.map(m => <QueryPaneBox key={m} id={`queryPane_${m}`}
            qpNumber={m}
            pstate={{qp, setQp}}/>
        );
    }

    return (
        <React.Fragment>
            <NewQueryPane/>
        </React.Fragment>
    )

}

*/
 
/*export const View = ({interactiveQueryString, interactiveQuery, setWOQLQuery, woqlQuery}) => {

    const [qp, setQp] = useState([{setWOQLQuery: setWOQLQuery, woqlQuery: woqlQuery}]);
    let initQuery=interactiveQuery || ''
    let initQueryString=interactiveQueryString || ''
    const [runQuery, setRunQuery] = useState(woqlQuery)

    console.log("woqlQuery", woqlQuery)

    useEffect(() => {
        if(initQuery) {
            setQp(arr => [...arr, {initQuery: initQuery, 
                initQueryString: initQueryString, 
                setWOQLQuery:setWOQLQuery,
                woqlQuery: woqlQuery
            }])
        }
        
    }, [initQuery]) 

    useEffect(() => {
        
    },[woqlQuery])

    const QueryPaneBox = ({id, initQueryString, initQuery, woqlQuery, setWOQLQuery}) => {
        return (
            <div id={id}>
                <QueryPane initQueryString={initQueryString} initQuery={initQuery} woqlQuery={woqlQuery} setWOQLQuery={setWOQLQuery}/>     
            </div>
        )
    }

    
    const NewQueryPane = ({qp, setQp}) => {

        console.log("qp", qp)

    

        return qp.slice(0).reverse().map(m => <QueryPaneBox key={m} id={`queryPaneBox_${m}`}
            qpNumber={m}
            initQuery={m.initQuery}
            initQueryString={m.initQueryString}
            woqlQuery={m.woqlQuery}
            setWOQLQuery={m.setWOQLQuery}
            pstate={{qp, setQp}}/>
        )
    }


    console.log('runQuery', runQuery)
 
    

    return <React.Fragment>
        <div className={"d-flex justify-content-end mr-3"}>
            <TDBReactButton config={NEW_PANE_CONFIG} onClick={() => { setQp(arr => [...arr, {setWOQLQuery: setWOQLQuery,
                woqlQuery: woqlQuery}]) }}/>  
        </div>
        <NewQueryPane setQp={setQp} qp={qp} />
    </React.Fragment>

}  */
