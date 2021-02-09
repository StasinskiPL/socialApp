import React from "react";
import "./profil.scss";
import ProfilBody from "./ProfilBody";
import ProfilHeader from "./ProfilHeader";

const Profil:React.FC = () => {
  return (
    <>
      <ProfilHeader />
      <ProfilBody />
    </>
  );
};

export default Profil;
