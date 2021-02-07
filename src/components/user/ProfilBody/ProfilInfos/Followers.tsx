import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Followers = () => {
    const [followers,setFollowers] = useState([])
    return (
        <div className="profil-infos p-3  mt-3 rounded bg-white">
        <h4>Obserwują</h4>

        {followers.length > 9 && (
            <Button variant="secondary" className="w-100">Zobacz więcej</Button>
        )}
    </div>
    )
}

export default Followers
