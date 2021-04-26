import TerminusClient from '@terminusdb/terminusdb-client'
import {shortenURL} from "../Functions/Utils"

export const getPropertiesOfClass = (id) => {
    if(!id) return null
    let WOQL=TerminusClient.WOQL

    return WOQL.select("v:Property ID","v:Property Name","v:Property Domain","v:Property Type","v:Property Range","v:Property Description").and(
        WOQL.quad("v:Property ID", "type", "v:OWL Type", "schema/main"),
        WOQL.and(
            WOQL.quad("v:Property ID", "domain", id, "schema/main"),
            WOQL.quad("v:Property ID", "range", "v:Property Range", "schema/main")
        ),
        WOQL.limit(1).or(
            WOQL.and(
                WOQL.eq("v:OWL Type", "DatatypeProperty"),
                WOQL.eq("v:Property Type", "Data")
            ),
            WOQL.and(
                WOQL.eq("v:OWL Type", "ObjectProperty"),
                WOQL.eq("v:Property Type", "Object")
            )
        ),
        WOQL.limit(1).or(
            WOQL.quad("v:Property ID", "label", "v:Property Name", "schema/main"),
            WOQL.eq("v:Property Name", "")
        ),
        WOQL.limit(1).or(
            WOQL.quad("v:Property ID", "comment", "v:Property Description", "schema/main"),
            WOQL.eq("v:Property Description", "")
        )
    )
}

export const getPropertyRelation = (id) => {
    if(!id) return
    let WOQL=TerminusClient.WOQL

    return WOQL.triple("v:Domain", id, "v:Range").
        triple("v:Domain", "type", "v:Domain Type")
}

export const getPropertyRelationQueryString = (id) => {
    if(!id) return
    let short=shortenURL(id)
    console.log("short", short)

    return `triple("v:Domain", "${short}", "v:Range").
        triple("v:Domain", "type", "v:Domain Type")`
        //quad("v:Domain Type", "label", "v:Domain Label", "schema/main")
}

export const getClassesLib = () => {
    return `lib().classes()`
} 


