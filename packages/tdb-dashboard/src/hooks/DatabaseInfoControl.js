
import {useEffect, useState} from "react"
import {useHook} from "./hook"
import {getDocumentClasses} from '../queries/GeneralQueries'
import {WOQLClientObj} from '../init-woql-client'

export const DatabaseInfoControl = () => {

    const {woqlClient} = WOQLClientObj()

    const [currentClass, setCurrentClass] = useState(false)
    const [classQuery, setClassQuery] = useState(false)
    const [query, setQuery]=useState(false)
    const [properties, setProperties]=useState(false)
    const [classes, setClasses]=useState(false)
    const [propertyResults]=useHook(woqlClient, query)
    const [classesResults]=useHook(woqlClient, classQuery)

    useEffect(() => {
        if(woqlClient){
            let q = getDocumentClasses()
            setClassQuery(q)
        }
    }, [woqlClient])

    useEffect(()=> {
        if(propertyResults) {
            setProperties(propertyResults)
        }
        
    }, [propertyResults])

    useEffect(()=> {
        if(classesResults){
            setClasses(classesResults)
        }
        
    }, [classesResults])

    return {
        setCurrentClass,
        currentClass,
        setQuery,
        properties,
        classes
    }

}
