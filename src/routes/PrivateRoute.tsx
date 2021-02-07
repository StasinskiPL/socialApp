import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RootState } from "../store/reducer";

// interface Props  {
//   component: React.ElementType;
//   path:string;
// }

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const {logged} = useSelector((state:RootState) => state.auth)
  return (
    <Route
      {...rest}
      render={(props) =>
        logged ? <Component {...props} /> : <Redirect to="/logowanie" />
      }
    />
  );
};

export default PrivateRoute;
