import TerminusClient from '@terminusdb/terminusdb-client'

export const isArray = (arr) => {
    if (!Array.isArray(arr) || !arr.length) {
        return false
    }
    return true
}

export const shortenURL=(url) => {
    return TerminusClient.UTILS.shorten(url)
}