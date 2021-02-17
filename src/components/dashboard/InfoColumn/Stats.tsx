import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";

const Stats = () => {
  const [usersCount, setUsersCount] = useState<number | null>(null);

  useEffect(() => {
    db.collection("users")
      .get()
      .then((doc) => {
        setUsersCount(doc.size);
      });
  });
  return (
    <div className="dashboard-info p-2 px-3">
      <h4 className="text-center">Stats</h4>
      <p>
        Users count: <span className="h5 pl-2">{usersCount}</span>
      </p>
    </div>
  );
};

export default React.memo(Stats);
