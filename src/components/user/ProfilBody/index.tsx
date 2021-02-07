import React from 'react'
import { Container, Row } from 'react-bootstrap'
import ProfilInfos from "./ProfilInfos"
import ProfilPosts from './ProfilPosts'

const ProfilBody = () => {
    return (
        <Container>
            <Row className="mt-5">
            <ProfilInfos/>
            <ProfilPosts/>
            </Row>
        </Container>
    )
}

export default ProfilBody
