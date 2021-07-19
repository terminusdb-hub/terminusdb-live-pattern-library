import React, {useEffect, useState} from "react"
import {Card, Button, Row, Col, Form} from "react-bootstrap"
import {BiTimer} from "react-icons/bi"
import {WOQLClientObj} from '../init-woql-client'
import {TimeTravel}  from "./TimeTravel"
import {AiOutlineClose} from "react-icons/ai"
import {BsBriefcase} from "react-icons/bs"
//import AnchorLink from 'react-anchor-link-smooth-scroll'

export const TimeTravelWidget = (props) => {
    const [showTimeTravel, setShowTimeTravel] = useState(false)
      
    //const [iconColor, setIconColor] = useState("#00bc8c")

    const {branches,branch,chosenCommit}=WOQLClientObj()
    
    const [cssWidget, setCssWidget] = useState("")
    const [cssTimeTravel, setCssTimeTravel] = useState("display-none")

    const iconColor = chosenCommit && chosenCommit.time ? "#f39c12" : "#00bc8c"

   /* useEffect(() => {
      // set status and current time on time travel jump
      function getCommitTime() {
        if (consoleTime) {
            //if(setCurrentCommit) setCurrentCommit(printts(consoleTime))
            if(setIconColor) setIconColor("#f39c12")
            if(setStatus) setStatus("text-warning")
        }
        else {
            setIconColor("#00bc8c")
            if(setStatus)setStatus("text-muted")
        }
      }


      getCommitTime(consoleTime, null, null, setIconColor)
    }, [consoleTime])*/

    function handleTimeTravel() {
      setCssTimeTravel("")
      setCssWidget("display-none")
      setShowTimeTravel(true)
    }

    function handleCloseTimeTravel () {
      setCssWidget("")
      setCssTimeTravel("display-none")
      setShowTimeTravel(false)
    }

    function handleOnChange (e) {
      updateBranches(e.target.value)
    }

    const BranchOptions = ({branchList}) => {
      if(!branchList) return []
      let opts = []
      for (var item in branchList) {
        opts.push(
          <option key={`opt_${item}`}>{item}</option>
        )
      }
      return opts
    }

  return <React.Fragment>

      {!showTimeTravel && 
        <Button className=" time-travel-control time-travel-widget" title="Time Travel through history of Data Product" onClick={handleTimeTravel} style={{top: "55"}}> 
            <h3  style={{color: iconColor}}><BiTimer /></h3>
        </Button>
      }  

      {/*
        <AnchorLink href={`#${chosenCommit.commit}`}>
          <Button className={` ${cssWidget} time-travel-control time-travel-widget`} title="Time Travel through history of Data Product" onClick={handleTimeTravel} style={{top: "55"}}> 
            <h3  style={{color: iconColor}}><BiTimer /></h3>
          </Button>
        </AnchorLink> 
      */}

    {<div className={` ${cssTimeTravel} time-travel-control`}>
        <Card className="mt-5">
            <Card.Header className="d-flex justify-content-end"> 
                <h6 className="mr-4 mt-2">Time travel on collection  -  <strong className="text-success">{branch}</strong></h6>
                <BsBriefcase className="me-2 mr-5 mt-2" style={{fontSize: "20px"}}/>
                <Form className="mb-0 mr-4 ml-3">
                    <Form.Group controlId="timetravel_select" className="mb-0">
                        <Form.Control as="select" 
                          onChange={handleOnChange} 
                          className="bg-transparent border-1-light text-light mb-0" 
                          style={{width: "270px"}}>
                            <option defaultValue>{branch}</option>
                            <BranchOptions branchList={branches}/>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <div className="float-right d-flex ml-4">
                  <Button variant="info" className="mr-3" title={"Close Time Travel View"} onClick={handleCloseTimeTravel}>
                      <AiOutlineClose className="me-2"/>
                  </Button>
                </div>
                
            </Card.Header>
            <Card.Body className="time-travel-card-body overflow-auto">
              <div>
            Years ago, my ex-girlfriend gave me a pair of Bluetooth headphones as a birthday present. I tried so hard to make them work. But they irritated my ears and always fell out. I went back to my regular wired headphones.
Unfortunately, this decision became a source of torment. Every time we went to the gym she brought it up, “It’s a shame you aren’t using those $150 headphones I got you.” She brought it up for months and months. It felt like I’d loaned money to the devil.
Humans are strongly reciprocal in nature. Healthy relationships are built on giving and getting in return. A gulf in reciprocity creates a power imbalance. This is why gifts are a common tool for manipulation.
Even worse, bestowing presents is a common tactic by abusers. Each of Michael Jackson’s accusers made similar claims of him showering them with amazing gifts. They felt a sense of loyalty to him, particularly when it came time to defend him.
With my aforementioned ex, we eventually reached a resolution that once a gift is given, it is released. There are no clawbacks. There is no weaponizing them during arguments. Thank god it only took us 300 fights to figure that out. Reciprocity is important but don’t let it stray into scorekeeping. Beware of gifts.
The Ben Franklin Effect
The most advanced manipulators use this trick and you can too, in a good way. It’s one of the easiest ways to get someone to like you.
Ben Franklin had a political enemy who was making speeches against him. Franklin remembered an old quote, “He that has once done you a kindness will be more ready to do you another than he whom you yourself have obliged.” Then he asked that political enemy to loan him a rare book. Then, Ben returned it to him with a nice thank you note. Suddenly, their political rivalry vanished and Franklin had a new friend.
Asking for a favor is a conveyance of trust and need. That person feels chosen. You are suggesting they have something you don’t: knowledge, ability, resources. It appeals to their insecurities. If you don’t know the requester or are angry at them, it creates a cognitive dissonance: why am I helping someone I don’t know or am mad at?
Your brain watches you behaving in conflict and creates a subconscious conclusion: you must like the person. After all, we ask favors of people we trust and care for. Beware of favor requests from people who have something to gain from you.
Years ago, my ex-girlfriend gave me a pair of Bluetooth headphones as a birthday present. I tried so hard to make them work. But they irritated my ears and always fell out. I went back to my regular wired headphones.
Unfortunately, this decision became a source of torment. Every time we went to the gym she brought it up, “It’s a shame you aren’t using those $150 headphones I got you.” She brought it up for months and months. It felt like I’d loaned money to the devil.
Humans are strongly reciprocal in nature. Healthy relationships are built on giving and getting in return. A gulf in reciprocity creates a power imbalance. This is why gifts are a common tool for manipulation.
Even worse, bestowing presents is a common tactic by abusers. Each of Michael Jackson’s accusers made similar claims of him showering them with amazing gifts. They felt a sense of loyalty to him, particularly when it came time to defend him.
With my aforementioned ex, we eventually reached a resolution that once a gift is given, it is released. There are no clawbacks. There is no weaponizing them during arguments. Thank god it only took us 300 fights to figure that out. Reciprocity is important but don’t let it stray into scorekeeping. Beware of gifts.
The Ben Franklin Effect
The most advanced manipulators use this trick and you can too, in a good way. It’s one of the easiest ways to get someone to like you.
Ben Franklin had a political enemy who was making speeches against him. Franklin remembered an old quote, “He that has once done you a kindness will be more ready to do you another than he whom you yourself have obliged.” Then he asked that political enemy to loan him a rare book. Then, Ben returned it to him with a nice thank you note. Suddenly, their political rivalry vanished and Franklin had a new friend.
Asking for a favor is a conveyance of trust and need. That person feels chosen. You are suggesting they have something you don’t: knowledge, ability, resources. It appeals to their insecurities. If you don’t know the requester or are angry at them, it creates a cognitive dissonance: why am I helping someone I don’t know or am mad at?
Your brain watches you behaving in conflict and creates a subconscious conclusion: you must like the person. After all, we ask favors of people we trust and care for. Beware of favor requests from people who have something to gain from you.
Years ago, my ex-girlfriend gave me a pair of Bluetooth headphones as a birthday present. I tried so hard to make them work. But they irritated my ears and always fell out. I went back to my regular wired headphones.
Unfortunately, this decision became a source of torment. Every time we went to the gym she brought it up, “It’s a shame you aren’t using those $150 headphones I got you.” She brought it up for months and months. It felt like I’d loaned money to the devil.
Humans are strongly reciprocal in nature. Healthy relationships are built on giving and getting in return. A gulf in reciprocity creates a power imbalance. This is why gifts are a common tool for manipulation.
Even worse, bestowing presents is a common tactic by abusers. Each of Michael Jackson’s accusers made similar claims of him showering them with amazing gifts. They felt a sense of loyalty to him, particularly when it came time to defend him.
With my aforementioned ex, we eventually reached a resolution that once a gift is given, it is released. There are no clawbacks. There is no weaponizing them during arguments. Thank god it only took us 300 fights to figure that out. Reciprocity is important but don’t let it stray into scorekeeping. Beware of gifts.
The Ben Franklin Effect
The most advanced manipulators use this trick and you can too, in a good way. It’s one of the easiest ways to get someone to like you.
Ben Franklin had a political enemy who was making speeches against him. Franklin remembered an old quote, “He that has once done you a kindness will be more ready to do you another than he whom you yourself have obliged.” Then he asked that political enemy to loan him a rare book. Then, Ben returned it to him with a nice thank you note. Suddenly, their political rivalry vanished and Franklin had a new friend.
Asking for a favor is a conveyance of trust and need. That person feels chosen. You are suggesting they have something you don’t: knowledge, ability, resources. It appeals to their insecurities. If you don’t know the requester or are angry at them, it creates a cognitive dissonance: why am I helping someone I don’t know or am mad at?
Your brain watches you behaving in conflict and creates a subconscious conclusion: you must like the person. After all, we ask favors of people we trust and care for. Beware of favor requests from people who have something to gain from you.
Years ago, my ex-girlfriend gave me a pair of Bluetooth headphones as a birthday present. I tried so hard to make them work. But they irritated my ears and always fell out. I went back to my regular wired headphones.
Unfortunately, this decision became a source of torment. Every time we went to the gym she brought it up, “It’s a shame you aren’t using those $150 headphones I got you.” She brought it up for months and months. It felt like I’d loaned money to the devil.
Humans are strongly reciprocal in nature. Healthy relationships are built on giving and getting in return. A gulf in reciprocity creates a power imbalance. This is why gifts are a common tool for manipulation.
Even worse, bestowing presents is a common tactic by abusers. Each of Michael Jackson’s accusers made similar claims of him showering them with amazing gifts. They felt a sense of loyalty to him, particularly when it came time to defend him.
With my aforementioned ex, we eventually reached a resolution that once a gift is given, it is released. There are no clawbacks. There is no weaponizing them during arguments. Thank god it only took us 300 fights to figure that out. Reciprocity is important but don’t let it stray into scorekeeping. Beware of gifts.
The Ben Franklin Effect
The most advanced manipulators use this trick and you can too, in a good way. It’s one of the easiest ways to get someone to like you.
Ben Franklin had a political enemy who was making speeches against him. Franklin remembered an old quote, “He that has once done you a kindness will be more ready to do you another than he whom you yourself have obliged.” Then he asked that political enemy to loan him a rare book. Then, Ben returned it to him with a nice thank you note. Suddenly, their political rivalry vanished and Franklin had a new friend.
Asking for a favor is a conveyance of trust and need. That person feels chosen. You are suggesting they have something you don’t: knowledge, ability, resources. It appeals to their insecurities. If you don’t know the requester or are angry at them, it creates a cognitive dissonance: why am I helping someone I don’t know or am mad at?
Your brain watches you behaving in conflict and creates a subconscious conclusion: you must like the person. After all, we ask favors of people we trust and care for. Beware of favor requests from people who have something to gain from you.
Years ago, my ex-girlfriend gave me a pair of Bluetooth headphones as a birthday present. I tried so hard to make them work. But they irritated my ears and always fell out. I went back to my regular wired headphones.
Unfortunately, this decision became a source of torment. Every time we went to the gym she brought it up, “It’s a shame you aren’t using those $150 headphones I got you.” She brought it up for months and months. It felt like I’d loaned money to the devil.
Humans are strongly reciprocal in nature. Healthy relationships are built on giving and getting in return. A gulf in reciprocity creates a power imbalance. This is why gifts are a common tool for manipulation.
Even worse, bestowing presents is a common tactic by abusers. Each of Michael Jackson’s accusers made similar claims of him showering them with amazing gifts. They felt a sense of loyalty to him, particularly when it came time to defend him.
With my aforementioned ex, we eventually reached a resolution that once a gift is given, it is released. There are no clawbacks. There is no weaponizing them during arguments. Thank god it only took us 300 fights to figure that out. Reciprocity is important but don’t let it stray into scorekeeping. Beware of gifts.
The Ben Franklin Effect
The most advanced manipulators use this trick and you can too, in a good way. It’s one of the easiest ways to get someone to like you.
Ben Franklin had a political enemy who was making speeches against him. Franklin remembered an old quote, “He that has once done you a kindness will be more ready to do you another than he whom you yourself have obliged.” Then he asked that political enemy to loan him a rare book. Then, Ben returned it to him with a nice thank you note. Suddenly, their political rivalry vanished and Franklin had a new friend.
Asking for a favor is a conveyance of trust and need. That person feels chosen. You are suggesting they have something you don’t: knowledge, ability, resources. It appeals to their insecurities. If you don’t know the requester or are angry at them, it creates a cognitive dissonance: why am I helping someone I don’t know or am mad at?
Your brain watches you behaving in conflict and creates a subconscious conclusion: you must like the person. After all, we ask favors of people we trust and care for. Beware of favor requests from people who have something to gain from you.
Years ago, my ex-girlfriend gave me a pair of Bluetooth headphones as a birthday present. I tried so hard to make them work. But they irritated my ears and always fell out. I went back to my regular wired headphones.
Unfortunately, this decision became a source of torment. Every time we went to the gym she brought it up, “It’s a shame you aren’t using those $150 headphones I got you.” She brought it up for months and months. It felt like I’d loaned money to the devil.
Humans are strongly reciprocal in nature. Healthy relationships are built on giving and getting in return. A gulf in reciprocity creates a power imbalance. This is why gifts are a common tool for manipulation.
Even worse, bestowing presents is a common tactic by abusers. Each of Michael Jackson’s accusers made similar claims of him showering them with amazing gifts. They felt a sense of loyalty to him, particularly when it came time to defend him.
With my aforementioned ex, we eventually reached a resolution that once a gift is given, it is released. There are no clawbacks. There is no weaponizing them during arguments. Thank god it only took us 300 fights to figure that out. Reciprocity is important but don’t let it stray into scorekeeping. Beware of gifts.
The Ben Franklin Effect
The most advanced manipulators use this trick and you can too, in a good way. It’s one of the easiest ways to get someone to like you.
Ben Franklin had a political enemy who was making speeches against him. Franklin remembered an old quote, “He that has once done you a kindness will be more ready to do you another than he whom you yourself have obliged.” Then he asked that political enemy to loan him a rare book. Then, Ben returned it to him with a nice thank you note. Suddenly, their political rivalry vanished and Franklin had a new friend.
Asking for a favor is a conveyance of trust and need. That person feels chosen. You are suggesting they have something you don’t: knowledge, ability, resources. It appeals to their insecurities. If you don’t know the requester or are angry at them, it creates a cognitive dissonance: why am I helping someone I don’t know or am mad at?
Your brain watches you behaving in conflict and creates a subconscious conclusion: you must like the person. After all, we ask favors of people we trust and care for. Beware of favor requests from people who have something to gain from you.
Years ago, my ex-girlfriend gave me a pair of Bluetooth headphones as a birthday present. I tried so hard to make them work. But they irritated my ears and always fell out. I went back to my regular wired headphones.
Unfortunately, this decision became a source of torment. Every time we went to the gym she brought it up, “It’s a shame you aren’t using those $150 headphones I got you.” She brought it up for months and months. It felt like I’d loaned money to the devil.
Humans are strongly reciprocal in nature. Healthy relationships are built on giving and getting in return. A gulf in reciprocity creates a power imbalance. This is why gifts are a common tool for manipulation.
Even worse, bestowing presents is a common tactic by abusers. Each of Michael Jackson’s accusers made similar claims of him showering them with amazing gifts. They felt a sense of loyalty to him, particularly when it came time to defend him.
With my aforementioned ex, we eventually reached a resolution that once a gift is given, it is released. There are no clawbacks. There is no weaponizing them during arguments. Thank god it only took us 300 fights to figure that out. Reciprocity is important but don’t let it stray into scorekeeping. Beware of gifts.
The Ben Franklin Effect
The most advanced manipulators use this trick and you can too, in a good way. It’s one of the easiest ways to get someone to like you.
Ben Franklin had a political enemy who was making speeches against him. Franklin remembered an old quote, “He that has once done you a kindness will be more ready to do you another than he whom you yourself have obliged.” Then he asked that political enemy to loan him a rare book. Then, Ben returned it to him with a nice thank you note. Suddenly, their political rivalry vanished and Franklin had a new friend.
Asking for a favor is a conveyance of trust and need. That person feels chosen. You are suggesting they have something you don’t: knowledge, ability, resources. It appeals to their insecurities. If you don’t know the requester or are angry at them, it creates a cognitive dissonance: why am I helping someone I don’t know or am mad at?
Your brain watches you behaving in conflict and creates a subconscious conclusion: you must like the person. After all, we ask favors of people we trust and care for. Beware of favor requests from people who have something to gain from you.
   
   
            </div>
   
            </Card.Body>   
          </Card>
      
    </div>}

  </React.Fragment>

    
}
//<TimeTravel/>