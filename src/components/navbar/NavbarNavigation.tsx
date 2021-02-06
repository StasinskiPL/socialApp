import { Button, Container } from "react-bootstrap"
import {FaUserAlt,FaPowerOff} from "react-icons/fa"
import { useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { RootState } from "../../store/reducer"

const NavbarNavigation = () => {

    const {userNick} = useSelector((state:RootState)=>state.auth)

    const logOut = ()=>{

    }

    return (
        <Container className="d-flex justify-content-end">
            <Link to={`/user/${userNick}`}><FaUserAlt className="text-white mr-2"/></Link>
            <Button onClick={logOut} size="sm" variant="dark"><FaPowerOff/></Button>
            
        </Container>
    )
}

export default NavbarNavigation
