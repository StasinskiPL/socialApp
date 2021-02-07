import { Button, Container } from "react-bootstrap"
import {FaUserAlt,FaPowerOff} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { RootState } from "../../store/reducer"
import {logOut} from "../../store/authSlice"

const NavbarNavigation = () => {

    const {userNick} = useSelector((state:RootState)=>state.auth)
    const dispatch = useDispatch()

    const logOutHandler = ()=>{
        dispatch(logOut())
    }

    return (
        <Container className="d-flex justify-content-end">
            <Link to={`/user/${userNick}`}><FaUserAlt className="text-white mr-2"/></Link>
            <Button onClick={logOutHandler} size="sm" variant="dark"><FaPowerOff/></Button>
            
        </Container>
    )
}

export default NavbarNavigation
