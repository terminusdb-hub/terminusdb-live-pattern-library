import TerminusClient from '@terminusdb/terminusdb-client'


export const tableViewConfig= () => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.pager("remote")
    tabConfig.pagesize(20)
    return tabConfig
}

/*
{
    "Duration": {
        "@type": "http://www.w3.org/2001/XMLSchema#integer",
        "@value": 288
    },
    "End": "terminusdb:///data/Station_31009",
    "End_Label": {
        "@type": "http://www.w3.org/2001/XMLSchema#string",
        "@value": "Crystal Dr & 27th St S"
    },
    "Start": "terminusdb:///data/Station_31007",
    "Start_Label": {
        "@type": "http://www.w3.org/2001/XMLSchema#string",
        "@value": "Crystal City Metro / 18th & Bell St"
    }
}
*/


export const graphViewConfig = (result) => { 
    const graph=TerminusClient.View.graph();
    graph.height(800).width("1500")

    graph.show_force(true)
    graph.edges(["Start", "End"])

    graph.edge("Start", "End").size(2).text("Property").arrow({width: 50, height: 20})
        .icon({label: true, color: [109,98,100], size: 0.8})
      
    graph.node("End").size(30).text("End_Label").color([27,153,139, 0.3]).icon({label: true, color: [109,98,100]})
    graph.node("Start").size(30).text("Start_Label").color([97,218,251, 0.3]).icon({label: true, color: [109,98,100]})
   
    graph.node("Start").collisionRadius(100)
    graph.node("End").collisionRadius(100)




    let graphConfig = graph.create(null);
    graphConfig.setResult(result);
    return graphConfig
}