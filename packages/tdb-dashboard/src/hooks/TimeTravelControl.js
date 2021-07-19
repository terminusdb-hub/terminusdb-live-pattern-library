import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import moment from 'moment'
import {WOQL} from '@terminusdb/terminusdb-client'
import {commitsQueryByBranch,previousCommits} from './timetravelquery'
const DATETIME_FULL = "hh:mm:ss, DD-MM-YYYY"

const QUERY_TYPE_LOAD = 'QUERY_TYPE_LOAD';
const QUERY_TYPE_PREVIOUS = 'QUERY_TYPE_PREVIOUS';
const QUERY_TYPE_NEXT = 'QUERY_TYPE_NEXT';

export const TimeTravelControl = (limit=10) => {
    const {woqlClient, branch, chosenCommit,dataProduct} = WOQLClientObj()
    const [report, setError] = useState(false)
    const currentDay = chosenCommit && chosenCommit.time ? moment.unix(chosenCommit.time) : moment()

    const currentStartTime = currentDay.unix()
   
    const [currentPage, setCurrentPage] = useState(0);
    const [startTime, setUpdateStartTime] = useState(currentStartTime);
    const [gotoPosition,setGotoPosition] = useState(null);
    const [reloadQuery,setReloadQuery] = useState(0);

    const [queryType,setQueryType] = useState(QUERY_TYPE_LOAD);

    const [dataProviderValues,setDataProviderValues] = useState({dataProvider:[],selectedValue:0})

    const setSelectedValue=(value)=>{
        const newValue={dataProvider:dataProviderValues.dataProvider,
                        selectedValue:value}
        setDataProviderValues(newValue)
    }
    /*ss
    * move the commit search from time
    */
    const getPage=()=>{
        return limit*currentPage
    }

    const setStartTime=(time)=>{
        setCurrentPage(0);
        setGotoPosition(null)
        //setCurrentCommit(null)
        setUpdateStartTime(time)
    }

    /*
    * first render
    * commit ref or is the last commit
    * I have to add get by time
    */
    useEffect(() => {
        //start from the branch commit
        let queryObj = WOQL.query()
        switch(queryType){
            case QUERY_TYPE_NEXT:
                //to be review get the commits after the actual one in time
                //const firstElement= dataProviderValues.dataProvider.slice(-1)[0]
                //queryObj=WOQL.lib().next_commits(firstElement.commit,branch,limit)
                break;
            case QUERY_TYPE_PREVIOUS:
                const lastElement= dataProviderValues.dataProvider.slice(-1)[0]
                queryObj=previousCommits(lastElement.commit,limit)
                break;
            default:
                //when i change branch or dataprovider 
                //I start from the head commit 
                queryObj = commitsQueryByBranch(branch,limit)

        }
        const tmpWoqlClient =  woqlClient.copy()
        
        tmpWoqlClient.checkout('_commits')
        tmpWoqlClient.query(queryObj).then((result) => {
            if (result.bindings) {
                const dataFormatted=formatResult(result.bindings);
                let newPoss=dataFormatted.newPoss;
                let selVal=dataFormatted.toBeSelect;
                /*
                * if I have the time set and I'm in the first page
                * I'm not in append mode
                */
                //if(startTime && currentPage===0){
                //newPoss=selVal;
                //}

                setDataProviderValues({dataProvider:dataFormatted.dataP,selectedValue:selVal})
                setQueryType(QUERY_TYPE_LOAD);
                setGotoPosition(newPoss)
            }
        }).catch((err)=>{
            if(setError)setError(err);
            console.log(err);
        })
    }, [reloadQuery, startTime, branch, dataProduct])

    /*
    * the result comes order by time so the first is the last commits.
    * we need to reverse the array for the time travel
    * (the last in the right position must be the last in the array),
    * the 0 post have to be the oldest of the result commits
    */

    const getValue=(item)=>{
        return typeof item==='object' ? item['@value'] : ''
    }

    const formatResult=(result)=>{
        let dataP=[];
        const resLength= Math.max(result.length-1,0)
        /*
        * head of the commit
        */
        let toBeSelect= resLength;
        //append at the preview result
        if(queryType===QUERY_TYPE_PREVIOUS || queryType===QUERY_TYPE_NEXT){
            dataP=dataProviderValues.dataProvider;
        }

        result.forEach((entry,index)=>{
               const time=getValue(entry.Time) //* 1000;
               const commitValue=getValue(entry['Commit ID']);
               //if I get the branch name it is the firstcommit
               const isHeadCommit= getValue(entry['Branch ID']) ? true : false

               if(chosenCommit && chosenCommit.commit===commitValue)toBeSelect=index;
               const parent = getValue(entry['Parent ID'])
               
               //if is the first commit or the last 
               //const isFirstCommit=branchId===branch || parent==='' ? true : false;

               const item={ datetime:time * 1000,
                            time: time,
                            label:moment.unix(time).format(DATETIME_FULL),
                            message:getValue(entry['Message']),
                            commit:commitValue,
                            author:getValue(entry['Author']),
                            parent: parent,
                            isHeadCommit:isHeadCommit
                        }
                if(queryType===QUERY_TYPE_NEXT){
                    /*
                    *I need to prepend if already I have some data
                    * next data are newer then the first commit
                    */
                    dataP.unshift(item)
                }else{
                    dataP.push(item)
                }
        })
        let newPoss=toBeSelect;
        if(queryType===QUERY_TYPE_PREVIOUS){
             toBeSelect=dataProviderValues.selectedValue + resLength + 1
             newPoss=5;
             if(resLength<5)newPoss=0;
        }
        if(queryType===QUERY_TYPE_NEXT){
            toBeSelect=dataProviderValues.selectedValue;
            //if(resLength<5)
            newPoss=Math.max(dataP.length-1,0);
        }
        return {dataP:dataP,toBeSelect:toBeSelect,newPoss:newPoss};
    }

    const loadPreviousPage=(obj)=>{
       // {lastPosition:positionValue,maxPosition:maxPosition}
       setQueryType(QUERY_TYPE_PREVIOUS)
       setReloadQuery(Date.now());
    }

    const loadNextPage=(obj)=>{
       // {lastPosition:positionValue,maxPosition:maxPosition}
       setQueryType(QUERY_TYPE_NEXT)
       setReloadQuery(Date.now());
    }

    const currentItem = dataProviderValues.dataProvider.length>0  ? dataProviderValues.dataProvider[dataProviderValues.selectedValue] : {label:'No Value',author:'',message:''}
    const olderCommit= dataProviderValues.dataProvider.length>0 ? dataProviderValues.dataProvider.slice(-1)[0] : null

    return {currentItem,
            gotoPosition, 
            dataProvider: dataProviderValues.dataProvider || [], 
            setSelectedValue,
            setStartTime,
            olderCommit,
            branch, 
            loadPreviousPage, 
            loadNextPage}
}