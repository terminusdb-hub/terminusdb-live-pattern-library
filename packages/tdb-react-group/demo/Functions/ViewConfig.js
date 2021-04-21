import TerminusClient from '@terminusdb/terminusdb-client'


export const tableViewConfig= () => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.pager("remote")
    tabConfig.pagesize(20)
    return tabConfig
}

export const graphViewConfig = (result) => {
    const graph=TerminusClient.View.graph();
    graph.height(800).width(1000)
    let graphConfig = graph.create(null);
    graphConfig.setResult(result);
    return graphConfig
}