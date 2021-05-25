
import TerminusClient from '@terminusdb/terminusdb-client'

export const getBranchCommits = (branch, ref) => {
    if(!branch) return null
    let WOQL = TerminusClient.WOQL
    let q = WOQL.query()
    if(ref){
        q = WOQL.lib().commit_history(ref)
    }
    else {
        q = WOQL.and(
            WOQL.lib().active_commit_id(branch, false, "Active ID"),
            WOQL.lib().commit_history("v:Active ID")
        )
    }
    return WOQL.select("v:Author", "v:Commit ID", "v:Message", "v:Time", q)
}


export const getBranchQuery = (dataProduct, woqlClient) => {
    if(!dataProduct) return
    let WOQL=TerminusClient.WOQL
    let user=woqlClient.user()
    let dp = `${user.id}/${dataProduct}`
    return WOQL.using(dp).lib().branches()
}