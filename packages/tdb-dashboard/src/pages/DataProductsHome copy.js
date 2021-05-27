
import React, {useEffect, useState} from "react"
import {DatabaseCard, NewDatabaseCard} from "../components/DatabaseCard"
import {Container, Row} from "react-bootstrap"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {NEW_DATA_PRODUCT_BUTTON, DATA_PRODUCT_LABEL} from "./constants"
import {useCreateNewDataProductStates} from "../hooks/CreateNewDataProduct"

import { GridGenerator, Layout, Hexagon, Text, Pattern, HexUtils, HexGrid } from 'react-hexgrid'


export const DataProductsHome = ({woqlClient, list}) => {

    /*const [hexagons, setHexagon] = useState(initHexas())

    function initHexas () {
        const initHex = GridGenerator.parallelogram(-1, 1, -1, 2).map((hexagon, index) => {
            return Object.assign({}, hexagon, {
              text: `Cat #${index}`,
              image: `http://lorempixel.com/400/400/cats/${index%10}/`
            });
          })
        return initHex
    }*/

    //const [hexagons, setHexagon] = useState(GridGenerator.hexagon(0))
    const [hexagons, setHexagon] = useState([])
    const [newMappedHexagons, setNewMappedHexagons] = useState([])


    const [gridHexagons, setGridHexagons] = useState(GridGenerator.hexagon(2))


    useEffect(() => {
        if(newMappedHexagons.length>0){
            console.log("newMappedHexagons", newMappedHexagons)
            //setHexagon(newMappedHexagons);  
        
        }
    }, [newMappedHexagons])

   


    //{q: -0, r: 0, s: 0, blocked: true, text: "Bikes"}

    useEffect(() => {
        //hexagons[0].blocked = true;
        //hexagons[1].blocked = true;
        var tempList = list
        let hexCount = 0

        for (var products in tempList) {
            tempList[products].checked = false
        }

        let repeat = 0, tempArr = []
        for (var grids in gridHexagons) {

            if(repeat > tempList.length) {
                console.log("tempArr when breaking", tempArr)
                setHexagon(tempArr)
                break
            }
            for (var products in tempList) {

                if(!tempList[products].checked) {
                    var temp = gridHexagons[grids]
                    temp.text = tempList[products].label
                    temp.blocked = true
                    tempList[products].checked = true 
                    console.log("temp", temp)
                    tempArr.push(temp)
                    console.log("tempArr", tempArr)
                    
                    break
                }

                
            }
            repeat += 1
        }

        
        

        /*list.map(item => {
            let temp = {q: -0, r: 0, s: 0, blocked: true, text: item.label}
            setHexagon( arr => [...arr, temp]);
        })*/

        
        
      
        /*list.map(item => {
           var newHex = hexagons[0]
           newHex.text = item.label;
           console.log("newHex", newHex)
           setNewMappedHexagons(arr => [...arr, newHex]); 
           console.log("newMappedHexagons", newMappedHexagons)
        })*/
        
        
        


        //setHexagon(arr => [...arr, newHex]);  

        //console.log("newMappedHex", newMappedHex)
        
        /*const hexas = hexagons.map(hex => {
            hexCount += 1
            if(hexCount > list.length) {
                console.log("hexas when limit hit", hexagons)
                return hexagons
            }
            list.map(item => {
                   if(item.checked) return 
                //if (HexUtils.equals(source.state.hex, hex)) {
                    hex.text = item.label;
                    hex.image = null;
                    item.checked = true
                    return; 
                //}
                /*if(item.length > hex.length){
                    hexCount = true
                    return
                } */
           /* })
            hexCount += 1
        });
        console.log("hexas", hexas)
        setHexagon(hexas);  */
        //setHexagon(hexagons)
    }, [list]) 

    console.log("hexagons", hexagons)

    // Add custom prop to couple of hexagons to indicate them being blocked
    

     // onDrop you can read information of the hexagon that initiated the drag
    function onDrop(event, source, targetProps) {
        const hexas = hexagons.map(hex => {
            // When hexagon is dropped on this hexagon, copy it's image and text
            if (HexUtils.equals(source.state.hex, hex)) {
                hex.image = targetProps.data.image;
                hex.text = targetProps.data.text;
            }
                return hex;
            });
        setHexagon(hexas);
    }

    function onDragStart(event, source) {
        // If this tile is empty, let's disallow drag
        if (!source.props.data.text) {
        event.preventDefault();
        }
    }

    // Decide here if you want to allow drop to this node
    function onDragOver(event, source) {
        // Find blocked hexagons by their 'blocked' attribute
        const blockedHexas = hexagons.filter(h => h.blocked);
        // Find if this hexagon is listed in blocked ones
        const blocked = blockedHexas.find(blockedHex => {
            return HexUtils.equals(source.state.hex, blockedHex);
        });

        const { text } = source.props.data;
        // Allow drop, if not blocked and there's no content already
        if (!blocked && !text) {
        // Call preventDefault if you want to allow drop
        event.preventDefault();
        }
    }

    // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
    function onDragEnd(event, source, success) {
        if (!success) {
        return;
        }
        // TODO Drop the whole hex from array, currently somethings wrong with the patterns

     
        // When hexagon is successfully dropped, empty it's text and image
        let hexCount = false
        const hexas = hexagons.map(hex => {
            list.map(item => {
                if (HexUtils.equals(source.state.hex, hex)) {
                    hex.text = item.label;
                    hex.image = null;
                }
                if(item == hex){
                    hexCount = true
                    return
                } 
            })
            if(hexCount) return hex;
        });
        setHexagon(hexas);
    }

    
    const [selectDP, setSelectDP] = useState(false)
    const {newDataProduct,
        setNewDataProduct,
        setNewDataProductInfo,
        loading,
        handleNew} = useCreateNewDataProductStates(woqlClient)
    
    return <Container>
        <Row>
            <div class="col-md-3 d-grid pb-3">
                <TDBReactButton config={NEW_DATA_PRODUCT_BUTTON} onClick={handleNew}/>
            </div>
        </Row> 
        <Row>
            {newDataProduct && <div className="col-md-4 d-grid pb-3">
                    <NewDatabaseCard onCancel={setNewDataProduct} 
                        setNewDataProductInfo={setNewDataProductInfo} 
                        loading={loading}/>
                </div>
            }
        </Row>
        <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
        <h4 className="mt-5 mb-5">{DATA_PRODUCT_LABEL}</h4>
        {/*<Row className="equal">
            {list.map(item => <div key={`key_${item.id}`} className="col-md-4 d-grid pb-3">
                    <DatabaseCard title={item.label} 
                        description={item.comment} 
                        onClick={setSelectDP}
                        key={`key_${item.id}`}
                        id={item.id}/>
                </div>
            )}
        </Row>*/}

        <div className="App">
            <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
            <Layout className="game" size={{ x: 10, y: 10 }} flat={true} spacing={1.08} origin={{ x: -30, y: 0 }}>
                {(hexagons.length>0) &&
                hexagons.map((hex, i) => (
                    <Hexagon
                    key={i}
                    q={hex.q}
                    r={hex.r}
                    s={hex.s}
                    className={hex.blocked ? 'blocked' : null}
                    fill={(hex.image) ? HexUtils.getID(hex) : null}
                    data={hex}
                        onDragStart={(e, h) => onDragStart(e, h)}
                        onDragEnd={(e, h, s) => onDragEnd(e, h, s)}
                        onDrop={(e, h, t) => onDrop(e, h, t) }
                        onDragOver={(e, h) => onDragOver(e, h) }
                    >
                    {/*<Text>{hex.text || HexUtils.getID(hex)}</Text>*/}
                    <Text>{hex.text}</Text>
                    { hex.image && <Pattern id={HexUtils.getID(hex)} link={hex.image} /> }
                    </Hexagon>
                ))
                }
            </Layout>
            </HexGrid>
        </div>



      


    </Container>
}


/*
<div className="App">
        <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
          {/* Grid with manually inserted hexagons */ /*}
          <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
            <Hexagon q={0} r={0} s={0} />
            {/* Using pattern (defined below) to fill the hexagon *//*}
            <Hexagon q={0} r={-1} s={1} fill="pat-1" />
            <Hexagon q={0} r={1} s={-1} />
            <Hexagon q={1} r={-1} s={0}>
              <Text>1, -1, 0</Text>
            </Hexagon>
            <Hexagon q={1} r={0} s={-1}>
              <Text>1, 0, -1</Text>
            </Hexagon>
            {/* Pattern and text *//*}
            <Hexagon q={-1} r={1} s={0} fill="pat-2">
              <Text>-1, 1, 0</Text>
            </Hexagon>
            <Hexagon q={-1} r={0} s={1} />
            <Hexagon q={-2} r={0} s={1} />
            <Path start={new Hex(0, 0, 0)} end={new Hex(-2, 0, 1)} />
          </Layout>
          <Pattern id="pat-1" link="http://cat-picture" />
          <Pattern id="pat-2" link="http://cat-picture2" />
        </HexGrid>
      </div>
      */