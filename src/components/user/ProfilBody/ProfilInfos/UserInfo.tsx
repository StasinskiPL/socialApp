interface Props {
  nick: string;
  createdAt: string;
}

const UserInfo: React.FC<Props> = ({ nick, createdAt }) => {
  return (
    <div className="profil-infos p-3 rounded bg-white">
      <h4>Informacje</h4>
      <p className="mt-3 h5">
        Nick: <span>{nick}</span>
      </p>
      <p className="h5">
        Data dołączenia: <span>{createdAt}</span>
      </p>
    </div>
  );
};

export default UserInfo;
