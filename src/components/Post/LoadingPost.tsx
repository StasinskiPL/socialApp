import React from 'react'
import { Card } from 'react-bootstrap'
import Loading from '../ui/Loading'

const LoadingPost = () => {
    return (
        <Card className="mt-3">
            <Card.Body className="d-flex justify-content-center p-0">
            <Loading/>
            </Card.Body>
        </Card>
    )
}

export default LoadingPost
