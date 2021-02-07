import React from 'react'
import { Col } from 'react-bootstrap'
import Followers from './Followers'
import UserInfo from './UserInfo'

const Infos = () => {
    return (
        <Col className="p-3" lg="5">
            <UserInfo/>
            <Followers/>
        </Col>
    )
}

export default Infos
