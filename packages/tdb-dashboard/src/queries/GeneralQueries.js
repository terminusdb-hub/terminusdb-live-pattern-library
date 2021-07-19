import TerminusClient from '@terminusdb/terminusdb-client'
import {shortenURL, covertStringToId} from "../components/utils" 


export const ClassFromSchema = () => {
    let WOQL=TerminusClient.WOQL
    return WOQL.quad("v:Class ID", 'type', 'owl:Class', "schema/main").
        quad("v:Class ID", 'label', "v:Class Name", "schema/main")
}

export const getDocumentClasses = (dataProduct) => {
    if(!dataProduct) return null
    let WOQL=TerminusClient.WOQL
    return WOQL.using(dataProduct).lib().document_classes()
      .eq("v:Class ID", "v:Class")
      .count("v:Count", WOQL.triple("v:Class Count", "type", "v:Class"))
}

export const getPropertiesOfClass = (id, dataProduct, woqlClient) => {
    if(!id && !dataProduct && !woqlClient) return null
    let WOQL=TerminusClient.WOQL
    let user=woqlClient.user()
    let dp = `${user.id}/${dataProduct}`
   
    return WOQL.using(dp).select("v:Property ID","v:Property Name","v:Property Domain","v:Property Type","v:Property Range","v:Property Description").and(
        WOQL.quad("v:Property ID", "type", "v:OWL Type", "schema/main"),
        WOQL.and(
            WOQL.quad("v:Property ID", "domain", id, "schema/main"),
            WOQL.quad("v:Property ID", "range", "v:Property Range", "schema/main"),
            WOQL.quad("v:Property ID", "domain", "v:Property Domain", "schema/main")
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

export const getPropertyRelation = (id, dataProduct, woqlClient) => {
    if(!id  && !dataProduct && !woqlClient) return
    let WOQL=TerminusClient.WOQL
    let user=woqlClient.user()
    let dp = `${user.id}/${dataProduct}`

    return WOQL.using(dp).triple("v:Domain", id, "v:Range").
      triple("v:Domain", "label", "v:Domain Label").
      quad(id, "label", "v:Range Label", "schema/main")
}


export const getClassesLib = (dataProduct, woqlClient) => {
    if(!dataProduct && !woqlClient) return
    let WOQL=TerminusClient.WOQL
    let user=woqlClient.user()
    let dp = `${user.id}/${dataProduct}`
    return WOQL.using(dp).lib().classes()
} 

export const getPropertiesLib = (dataProduct, woqlClient) => {
    if(!dataProduct && !woqlClient) return
    let WOQL=TerminusClient.WOQL
    let user=woqlClient.user()
    let dp = `${user.id}/${dataProduct}`
    return WOQL.using(dp).lib().properties()
} 

export const getDocumentMetadataLib = (dataProduct, woqlClient) => {
    if(!dataProduct && !woqlClient) return
    let WOQL=TerminusClient.WOQL
    let user=woqlClient.user()
    let dp = `${user.id}/${dataProduct}`
    return WOQL.using(dp).lib().document_metadata()
} 

// query to store query object in query library database
export const storeQueries = (query, saveQueryName) => {
    let WOQL=TerminusClient.WOQL
    let id = covertStringToId(saveQueryName)
    var json
    console.log("query", query)
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
    let user=woqlClient.user()
    let dp = `${user.id}/${dataProduct}`
    return WOQL.using(dp).triple(id, "query", "v:Query")
    
}



export const getPropertyMeta = () => {
  let WOQL =  TerminusClient.WOQL
  let gstr =  "schema/main"

  return WOQL.and(
    WOQL.lib().properties(false, false, gstr),
    WOQL.quad("v:Property Domain", "label", "v:Domain Name", gstr)
    .or(
        WOQL.quad("v:Property Domain", "system:tag", "system:abstract", gstr).eq("v:Abstract Domain", "Yes"),
        WOQL.and(
            WOQL.not().quad("v:Property Domain", "system:tag", "system:abstract", gstr),
            WOQL.eq("v:Abstract Domain", "No")
        )
    )
    .or(
        WOQL.sub("system:Document", "v:Property Domain").eq("v:Document Domain", "Yes"),
        WOQL.and(
            WOQL.not().sub("system:Document", "v:Property Domain"),
            WOQL.eq("v:Document Domain", "No")
        )
    )  
    .opt().quad("v:Property Range", "label", "v:Range Name", gstr)	
        .or(
            WOQL.quad("v:Property Range", "system:tag", "system:abstract", gstr).eq("v:Abstract Range", "Yes"),
            WOQL.and(
                WOQL.not().quad("v:Property Range", "system:tag", "system:abstract", gstr),
                WOQL.eq("v:Abstract Range", "No")
            )
        )
        .or(
            WOQL.sub("system:Document", "v:Property Range").eq("v:Document Range", "Yes"),
            WOQL.and(
                WOQL.not().sub("system:Document", "v:Property Range"),
                WOQL.eq("v:Document Range", "No")
            )
        )
        .or(
            WOQL.quad("v:Property Range", "owl:oneOf", "v:Any", gstr).eq("v:Enum Range", "Yes"),
            WOQL.and(
                WOQL.not().quad("v:Property Range", "owl:oneOf", "v:Any", gstr),
                WOQL.eq("v:Enum Range", "No")
            )
        )
  )
}


/**** Document Queries  ****/
/*export const getDocumentsOfType = (doctype) => {
    let WOQL =  TerminusClient.WOQL
    return  WOQL.and(
        WOQL.lib().document_metadata()
    ).sub(doctype, "v:Type ID")
}*/
