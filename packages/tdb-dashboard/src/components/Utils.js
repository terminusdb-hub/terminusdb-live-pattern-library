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

export const covertStringToId = (str) => {
    return "doc:" + str.replace(/ /g, "_")
}

export const convertToWOQL = (str) => {
    const myj = JSON.parse(str)
    let WOQL=TerminusClient.WOQL
    return WOQL.json(myj)
}

export const arrayEquals = (a, b) => {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

export const legalURLID = (idstr) => {
    if(!idstr.match(/^[0-9a-z_\-]+$/)) {
        return false
    }
    if(idstr.length > 40) return false
    return true
}

export function queryTimeDisplay(t) {
    let qtime = t ? t / 1000 : false
    return qtime ? ' (' + qtime + ' seconds' + ')' : ''
}