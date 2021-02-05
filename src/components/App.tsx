import { Redirect, Route, Switch } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import PrivateRoute from "../routes/PrivateRoute";
import Dashboard from "./dashboard/Dashboard";
import Loading from "./ui/Loading";
import { auth, db } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { Container } from "react-bootstrap";
const Registration = lazy(() => import("./auth/Registration"));
const Login = lazy(() => import("./auth/Login"));

function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection("users")
        .where("id", "==", user.uid)
        .limit(1)
        .get()
        .then((doc) => {
          dispatch(
            setUser({ nick: doc.docs[0].data().nick, userId: user.uid })
            );
            setLoading(false);
        });
    } else {
      dispatch(setUser({ nick: null, userId: null }));
      setLoading(false)
    }
  });
  if(loading){
    return (
      <Container className="w-100 d-flex justify-context-center">
        <Loading/>
      </Container>
    )
  }

  return (
    <main>
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route path="/rejestracja" render={() => <Registration />} />
          <Route path="/logowanie" render={() => <Login />} />
          <PrivateRoute path="/" component={Dashboard} />
          {/* <PrivateRoute path="/post/:id"  component={Dashboard}  /> */}
          {/* <PrivateRoute path="/user/:id"  component={Dashboard}  /> */}

          <Redirect to="/logowanie" />
        </Suspense>
      </Switch>
    </main>
  );
}

export default App;
