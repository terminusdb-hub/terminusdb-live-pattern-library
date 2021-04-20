

export const handleRunQuery = (woqlQuery, updateQuery, commitMessage) => {
    if(woqlQuery){
        if(updateQuery) updateQuery(woqlQuery, commitMessage)
    }
}

export const handleError = (err) => {
    console.log("error", err)
}