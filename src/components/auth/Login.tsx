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
      className="d-flex p-2 flex-column mt-5 align-items-center authForm"
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <Form.Label>
            <h1 className="display-3">Albicja</h1>
          </Form.Label>

          {error && (
            <Alert variant="danger" className="w-100 mt-3 text-center">
              Wrong Email or password
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="password"
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
            Login
          </Button>
          <Link
            to="/registration"
            className="btn-dark btn w-100 mt-3"
            type="submit"
          >
            Don't have an account ? Sign up!
          </Link>
          <p className="text-center mt-2">
            &copy; Albicja🚀
          </p>
        </>
      )}
    </Form>
  );
};

export default Login;
