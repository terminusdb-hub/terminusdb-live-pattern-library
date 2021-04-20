import TerminusClient from '@terminusdb/terminusdb-client'


export const resultViewConfig= () => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.pager("remote")
    tabConfig.pagesize(20)
    return tabConfig
}