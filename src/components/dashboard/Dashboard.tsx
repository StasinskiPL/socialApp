import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../store/postSlice'
import { RootState } from '../../store/reducer'
import Navbar from '../navbar/Navbar'
import AddPost from '../Post/AddPost'
import PostsContainer from '../Post/PostsContainer'

const Dashboard = () => {

    const {posts} = useSelector((state:RootState)=>state.posts)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchPosts())
    },[dispatch])
    return (
        <>
        <Navbar/>
        <Container className="mt-5">
            <Row>
                <Col className="d-none d-lg-block" lg="4">
                </Col>
                <Col lg="8" className="p-md-0">
                    <AddPost/>
                    <PostsContainer posts={posts} />
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Dashboard
