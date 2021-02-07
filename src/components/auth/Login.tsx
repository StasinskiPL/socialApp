import { useState, useRef, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../../store/authSlice";
import { RootState } from "../../store/reducer";
import Loading from "../ui/Loading";
import "./auth.scss";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef<HTMLFormElement>(null!);
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, logged } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (logged) {
      history.push("/");
    }
  }, [logged, history]);

  const loginUserHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: email.trim(), password: password.trim() }));
    formRef.current.reset();
  };

  return (
    <Form
      ref={formRef}
      onSubmit={loginUserHandler}
      className="d-flex p-2 flex-column justify-content-center align-items-center authForm"
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <Form.Label>
            <h1 className="display-3">AlbiclaV2</h1>
          </Form.Label>

          {error && (
            <Alert variant="danger" className="w-100 mt-3 text-center">
              Zły Email lub Hasło
            </Alert>
          )}

          <Form.Group className="w-100">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="w-100">
            <Form.Label>Haslo</Form.Label>
            <Form.Control
              placeholder="haslo"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="outline-success"
            size="lg"
            className="w-100 mt-3"
            type="submit"
          >
            Zaloguj
          </Button>
          <Link
            to="/rejestracja"
            className="btn-dark btn w-100 mt-3"
            type="submit"
          >
            Nie masz jeszcze Konta? Zarejestruj się!
          </Link>
          <p className="text-center mt-2">
            @2022 AlbiclaV2 The Future of the web🚀
          </p>
        </>
      )}
    </Form>
  );
};

export default Login;
