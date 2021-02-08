import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface Props{
    nick:string,
    avatarUrl:string
}

const FollowLink:React.FC<Props> = ({avatarUrl,nick}) => {
    return (
        <Col className="col-4 p-1">
            <Link to={`/user/${nick}`} className=" text-dark profil-follower-link">
                <img src={avatarUrl} className="img-fluid rounded" alt={nick}/>
                <p className="pt-1">{nick}</p>
            </Link>
            
        </Col>
    )
}

export default FollowLink
