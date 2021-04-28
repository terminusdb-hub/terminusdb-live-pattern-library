import TerminusClient from '@terminusdb/terminusdb-client'
import {shortenURL, covertStringToId} from "../Functions/Utils"

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

export const getPropertyRelation = (id, domain) => {
    if(!id) return
    let WOQL=TerminusClient.WOQL

    return WOQL.select("v:Start", "v:Start_Label", "v:End", "v:End_Label", "v:Property").and(
      WOQL.triple("v:Journey", "type", domain),
      WOQL.triple("v:Journey", "start_station", "v:Start"),
      WOQL.opt().triple("v:Start", "label", "v:Start_Label"),
      WOQL.triple("v:Journey", "end_station", "v:End"),
      WOQL.opt().triple("v:End", "label", "v:End_Label"),
      WOQL.triple("v:Journey", "journey_bicycle", "v:Bike"),
      WOQL.triple("v:Journey", id, "v:Property")
    )

    /*return WOQL.select("v:Start_Label","v:Duration", "v:End_Label").and(
      WOQL.triple("v:Journey", "type", "scm:Journey"),
      WOQL.triple("v:Journey", "start_station", "v:Start"),
      WOQL.opt().triple("v:Start", "label", "v:Start_Label"),
      WOQL.triple("v:Journey", "end_station", "v:End"),
      WOQL.opt().triple("v:End", "label", "v:End_Label"),
      WOQL.triple("v:Journey", "journey_bicycle", "v:Bike"),
      WOQL.triple("v:Journey", "duration", "v:Duration")
    )*/
    /*return WOQL.triple("v:Domain", id, "v:Range").
        triple("v:Domain", "type", "v:Domain Type") */
}

export const getClassesLib = () => {
    let WOQL=TerminusClient.WOQL

    return WOQL.lib().classes()
} 

export const getPropertiesLib = () => {
    let WOQL=TerminusClient.WOQL

    return WOQL.lib().properties()
} 

export const getDocumentMetadataLib = () => {
    let WOQL=TerminusClient.WOQL

    return WOQL.lib().document_metadata()
} 


/*
let j = {
  "@id": "doc:Worker_useful_test",
  "@type": "scm:Worker",
  "rdfs:comment": {
    "@type": "xsd:string",
    "@value": "my test query"
  },
  "rdfs:label": {
    "@type": "xsd:string",
    "@value": "my test query"
  },
  "scm:DatabaseID": {
    "@type": "xsd:string",
    "@value": "Kitty_Bikes"
  },
  "scm:query": {
    "@type": "xsd:string",
    "@value": "triple(\"v:X\", \"v:Y\", \"v:Z\")"
  }
}

update_object(j)

*/
// query to store query object in query library database
export const storeQueries = (query, saveQueryName) => {
    let WOQL=TerminusClient.WOQL
    let id = covertStringToId(saveQueryName)
    var json
    
    if(query) {
        let q = query.query
        json = {
            "@id": id,
            "@type": "scm:Worker",
            "rdfs:comment": {
              "@type": "xsd:string",
              "@value": saveQueryName
            },
            "rdfs:label": {
              "@type": "xsd:string",
              "@value": saveQueryName
            },
            "scm:DatabaseID": {
              "@type": "xsd:string",
              "@value": "Kitty_Bikes"
            },
            "scm:query": {
              "@type": "xsd:string",
              "@value": JSON.stringify(q)
            }
          }
    }
    return WOQL.using("admin/live").update_object(json)
}

export const getStoredQueriesNames = () => {
    let WOQL=TerminusClient.WOQL

    return WOQL.using("admin/live").triple("v:Worker", "type", "scm:Worker").
        triple("v:Worker", "DatabaseID", "Kitty_Bikes").
        triple("v:Worker", "query", "v:Query").
        triple("v:Worker", "label", "v:Query Name")
    
}

export const getStoredQueryObject = (id) => {
    if(!id) return
    let WOQL=TerminusClient.WOQL
    return WOQL.using("admin/live").triple(id, "query", "v:Query")
    
}


