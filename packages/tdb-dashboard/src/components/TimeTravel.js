import React, {useState, useEffect, useRef} from "react"
import {BiTimer, BiTime, BiMessageAltDetail} from "react-icons/bi"
import {BsFillCircleFill, BsCalendar} from"react-icons/bs"
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import {TimeTravelControl} from "../hooks/TimeTravelControl"
import {Button, Card} from "react-bootstrap"
import {TERMINUS_SUCCESS} from "./constants"
import {Alerts} from "./Alerts"
import {AiOutlineUser} from "react-icons/ai"
import {printtsDate, printtsTime} from "./utils"
//import {DBContextObj} from "../hooks/DBContext"

export const TimeTravel = (props) => {
 
    let cardColor = "#303030", transparantColor = "transparent", activeColor = "#00bc8c"
    const [chosenCommit,setChosenCommit]=useState({})
    //const {chosenCommit, setChosenCommit} = DBContextObj()
    const {currentItem, 
        dataProvider, 
        setSelectedValue, 
        setHead, 
        branch, 
        setCurrentDay,
        loadNextPage,
        loadPreviousPage
        } = TimeTravelControl()

    const [reportAlert, setReportAlert] = useState(false)


    const [commits, setCommits] = useState([])


    const handleTimeTravel = (e, commit, selectedVaue) => {
        e.preventDefault()
        setChosenCommit(commit)
        setSelectedValue(selectedVaue)
        if(commit && setHead){
            setHead(branch, commit)
         }
    }

    /*useEffect(() => {
      if(dataProvider.length > 0) {
          setCommits(dataProvider)
      }
    }, [dataProvider])*/

    /*useEffect(() => {
        if(chosenCommit && setHead){
            setHead(branch, chosenCommit)
            let message = `The state of data product has been set to date ${chosenCommit.label}`
            setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>)
         }
    }, [chosenCommit])*/


    const TimelineElements = () => {
        if(!dataProvider) return <div/>

        let timeElements = []
        let selectedCounter = 0

        dataProvider.slice(0).reverse().map((item) => {

            var iconStyle = { background: transparantColor, color: '#444' }
            var disabled = false
            var currentDateColor 

            if(!chosenCommit && item.isLastCommit) { // when nothing is selected to point to latest commit
                iconStyle = { background: activeColor, color: '#444' }
                disabled = true 
                currentDateColor = "current-time-point"
            }
            
            if(chosenCommit.commit == item.commit) { // to highlight current commit on jumping to a particular commit
                iconStyle = { background: activeColor, color: '#444' }
                disabled = true
                currentDateColor = "current-time-point"
            }

            timeElements.push(<VerticalTimelineElement    
                className="vertical-timeline-element--work"
                contentStyle={{ background: cardColor, color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid #00bc8c' }}
                iconStyle={iconStyle}
                icon={<BsFillCircleFill />}
                >
                <Card variant="success" className=" time-travel-card" id={item.commit}>

                    <Card.Header className={`d-flex ${currentDateColor}`}>
                      <h6>{`Commited on ${printtsDate(item.time)}`} </h6>
                      <h6 style={{marginLeft: "45%"}}><BiTime className="mr-1"/>{printtsTime(item.time)} </h6>
                    </Card.Header>

                    <Card.Body>
                        <h6 className="text-muted">
                          <AiOutlineUser className="mr-3 ml-3 mt-1"/>{item.author}
                        </h6>
                        <h6 className="text-muted">
                            <BiMessageAltDetail className="mr-3 ml-3 mt-1"/>{item.message}
                        </h6>
                        <div>
                            {!disabled && <Button variant="light" 
                              className="mr-3" 
                              title={"Time Travel to this Commit"} 
                              onClick={(e) =>   handleTimeTravel(e, item, selectedCounter)}>
                                <BiTimer className="me-2"/>{"Time Travel to this point"}
                            </Button>}
                            {disabled && <h6 className="text-success mt-3">
                                You are in this point in time 
                            </h6>}
                        </div>
                    </Card.Body>
                </Card>
            </VerticalTimelineElement>  )  
            selectedCounter += 1
        })

        return timeElements
    }

    const loadMore = () => {
        console.log("loading more")
    } 
 
    return <React.Fragment>
               
        {/*reportAlert && <React.Fragment>{reportAlert}</React.Fragment>*/}

        <VerticalTimeline layout="1-column-left">
            <TimelineElements/>
            <Button variant="link" className="float-right text-info" onClick={loadPreviousPage}>Load More</Button>
        </VerticalTimeline>

                
    </React.Fragment>
}

