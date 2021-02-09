import { Route, Switch } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import PrivateRoute from "../routes/PrivateRoute";
import Dashboard from "./dashboard/Dashboard";
import Loading from "./ui/Loading";
import { auth, db } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { Container } from "react-bootstrap";
import "../style/main.scss";
import Profil from "./user/Profil";
import UserList from "./usersList/UserList";
import Footer from "./footer/Footer";
const Registration = lazy(() => import("./auth/Registration"));
const Login = lazy(() => import("./auth/Login"));

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          const data = doc.data();
          if (data) {
            const { nick, following } = data;
            let followingUsers: string[] = [];
            if (following) {
              followingUsers = following.map(
                (follower: { id: string }) => follower.id
              );
            }

            dispatch(
              setUser({
                nick,
                userId: user.uid,
                userFollowing: followingUsers,
              })
            );
          }
          setLoading(false);
        });
    } else {
      dispatch(setUser({ nick: null, userId: null, userFollowing: [] }));
      setLoading(false);
    }
  });
  if (loading) {
    return (
      <Container className="w-100 d-flex justify-content-center align-items-center loadingBox">
        <Loading />
      </Container>
    );
  }

  return (
    <>
    <main className="bg-light">
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route path="/rejestracja" render={() => <Registration />} />
          <Route path="/logowanie" render={() => <Login />} />
          <PrivateRoute path="/user/:nick/:type" exact component={UserList} />
          <PrivateRoute path="/user/:nick" exact component={Profil} />
          <PrivateRoute path="/search/:value" component={UserList} />
          <PrivateRoute path="/" exact component={Dashboard} />
        </Suspense>
      </Switch>
    </main>
    <Footer/>
    </>
  );
}

export default App;
