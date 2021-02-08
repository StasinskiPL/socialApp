import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../store/postSlice'
import { RootState } from '../../store/reducer'
import Navbar from '../navbar/Navbar'
import AddPost from '../Post/AddPost'
import PostsContainer from '../Post/PostsContainer'
import InfoColumn from './InfoColumn/InfoColumn'
import "./dashboard.scss"
import FetchMoreBtn from './FetchMoreBtn'

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
                <Col lg="8" className="p-md-0">
                    <AddPost/>
                    <PostsContainer posts={posts} />
                    <FetchMoreBtn/>

                </Col>
                <Col className="d-none d-lg-block mt-4 pt-3 pr-0 pl-3" lg="4">
                    <InfoColumn/>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Dashboard
