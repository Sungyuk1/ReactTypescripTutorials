import React from 'react'
import storeItems from "../data/items.json"
import {Col, Row} from "react-bootstrap"
import { StoreItem } from '../components/StoreItem'

//g-3 : gap of 3 between the columns
export function Store(){
    return (<>
    <h1>Store</h1>
    <Row md={2} sx={1} lg={3} className='g-3'>
        {storeItems.map(item=>(
            <Col key={item.id}><StoreItem {...item}/></Col>
        ))}
    </Row>
    </>)
}