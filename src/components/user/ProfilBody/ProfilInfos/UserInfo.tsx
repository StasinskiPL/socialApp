import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebase';
import moment from "moment"

const UserInfo:React.FC = () => {
    const { nick }: { nick: string } = useParams();
    const [createdAt,setCreatedAt] = useState<string>("");

    useEffect(()=>{
        db.collection("users").where("nick","==",nick).get().then(doc=>{
            if(doc.docs[0]){
                const data = doc.docs[0].data()
                if(data && data.createdAt){
                    setCreatedAt(moment(data.createdAt).format("DD.MM.YYYY"))
                }
            }
        })
    
    },[nick])
    return (
        <div className="profil-infos p-3 rounded bg-white">
            <h4>Informacje</h4>
            <p className="mt-3 h5">Nick: <span>{nick}</span></p>
            <p className="h5">Data dołączenia: <span>{createdAt}</span></p>
        </div>
    )
}

export default UserInfo
