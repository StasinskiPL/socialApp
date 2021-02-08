import { useEffect, useState } from 'react'
import NewUsers from './NewUsers';
import Stats from "./Stats"

const InfoColumn = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize)
    },[]);

  

    if(width< 992){
        return null
    }
    return (
        <>
        <Stats/>
        <NewUsers/>
            
        </>
    )
}

export default InfoColumn
