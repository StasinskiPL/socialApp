import React from 'react'
import Navbar from "../navbar/Navbar";
import "./profil.scss"
import ProfilBody from './ProfilBody';
import ProfilHeader from './ProfilHeader';

const Profil = () => {
    return (
       <>
       <Navbar/>
       <ProfilHeader/>
       <ProfilBody/>
       </>
    )
}

export default Profil
