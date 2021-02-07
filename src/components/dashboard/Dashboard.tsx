import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar from '../navbar/Navbar'
import AddPost from '../Post/AddPost'

const Dashboard = () => {
    return (
        <>
        <Navbar/>
        <Container className="mt-5">
            <Row>
                <Col className="d-none d-lg-block" lg="4">
                </Col>
                <Col lg="8" className="p-md-0">
                    <AddPost/>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Dashboard
