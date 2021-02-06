import React from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "../firebase";

interface Props {
  component: React.ElementType;
  path:string
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const isAuth = auth.currentUser;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/logowanie" />
      }
    />
  );
};

export default PrivateRoute;
