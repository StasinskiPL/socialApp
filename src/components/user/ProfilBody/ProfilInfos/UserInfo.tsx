import React from 'react'
import { useParams } from 'react-router-dom';

const UserInfo:React.FC = () => {
    const { nick }: { nick: string } = useParams();
    return (
        <div className="profil-infos p-3 rounded bg-white">
            <h4>Informacje</h4>
            <p className="mt-3 h5">Nick: <span>{nick}</span></p>
            <p className="h5">Data dołączenia: <span></span></p>
        </div>
    )
}

export default UserInfo
