import TerminusClient from '@terminusdb/terminusdb-client'
import {format, subSeconds} from "date-fns"
import deAT from 'date-fns/locale/de-AT/index'
import {XSD_DATA_TYPE_PREFIX, XDD_DATA_TYPE_PREFIX} from "./constants"

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

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function formatTripleCount(tc){
    if(tc == 1) return tc + " triple"
    if(tc < 999){ return tc + " triples" }
    return tc.toLocaleString() + " triples"
}

export function formatCommits (ct) {
    if(ct == 1) ct += " commit"
    else ct += " commits"
    return ct
}

export function formatClassesCount (ct) {
    if(ct == 1) ct += " class"
    else ct += " classes"
    return ct
}

export function formatPropertiesCount (ct) {
    if(ct == 1) ct += " property"
    else ct += " properties"
    return ct
}

export function formatLastCommitTimeStamp (meta) {
    let ct = "Last commit"
    if(meta['Author']) ct += " by " + meta['Author']["@value"]
    if(meta['Time']) ct += " at " + printts(meta['Time']["@value"])
    if(meta['Message']) ct += ' "' + meta['Message']["@value"] + '"'
    return ct
}

export const printts = (ts) => {
    let f = "MMM d, yyyy - HH:mm:ss"
    return format(new Date(ts * 1000), f)
}

export const printtsDate = (ts) => {
    let f = "MMM d, yyyy"
    return format(new Date(ts * 1000), f)
}


export const printtsTime = (ts) => {
    let f = "HH:mm:ss"
    return format(new Date(ts * 1000), f)
}

export const getUsing = (woqlClient, commit) =>  {
    return woqlClient.resource("ref", commit)
}

// pure js easy function to copy a string to clipboard
export const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

export function trimWOQL (str) {
    let check = "WOQL."
    if(str.includes(check)) {
        return str.substr(check.length, str.length)
    }
    return str
}

export function trimText (text) {
    let length = 250
    let trimmedText = text.substring(0, length)
    return trimmedText + "..."
}

export const refreshDBList = (meta, woqlClient) => {
    let id = id || woqlClient.db()
    let org = org || woqlClient.organization()
    let usings = [org + "/" + id]
    let sysClient = woqlClient.copy()
    sysClient.setSystemDb()

    return TerminusClient.WOQL.lib().assets_overview(usings, sysClient, true)
        .then((res) =>{
            if(res[0]){
                let local = res[0]
                let dbs = woqlClient.databases()
                local.label = meta.label
                local.comment = meta.comment
                dbs.push(local)
                woqlClient.databases(dbs)
            }
        })
        .catch((err) => console.log(err))
}

// returns true for data type with prefixes xsd: or xdd
export const isDataType = (property) => {
    if(typeof property == "object") return false 
  
    if(property.substring(0, 4) ==  XSD_DATA_TYPE_PREFIX) return true
    else if(property.substring(0, 4) ==  XDD_DATA_TYPE_PREFIX) return true
    else return false
}

// returns true for properties ponting to another document
//have to compare with enums as well 
export const isClassType = (property, documentType) => {
    for (var item=0; item < documentType.length; item++) {
        if((documentType[item]["@type"] == "Class") && documentType[item]["@id"] == property){
            return property
        }
    }
    return false
}

// returns true for properties ponting to an enum class
export const isEnumType = (property) => {
    if(typeof property !== "object") return false 
    if(property["@type"] === "Enum") return true
}

// returns true for properties which are subdocuments
export const isSubDocumentType = (property) => {
    if(typeof property !== "object") return false 
    if(property["@class"]){
        let classObject=property["@class"]
        if(classObject["@subdocument"]) return true
    }
    return false 
}

// returns true for properties ponting to another document which can be a set/ list
export const isSetType = (property, documentType) => {
    if(typeof property !== "object") return false 
    if(property["@type"] === "Set") return true
    if(property["@type"] === "List") return true
    return false
}

// returns true for optional 
export const isOptionalType = (property) => {
    if(typeof property !== "object") return false
    if(property["@type"] === "Optional") return true
    return false
}

export const getColumnsFromResults = (results) => {
    let columns = []
    for(var k in results[0]) columns.push(k) 
    columns[columns.length] = "Delete"
    columns[columns.length] = "Copy"
    // add delete and copy button for document explorer
    return columns
}
