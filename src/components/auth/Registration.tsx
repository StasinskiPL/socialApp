import { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../store/authSlice";
import { RootState } from "../../store/reducer";
import Loading from "../ui/Loading";
import "./auth.scss";


const Registration = () => {
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, errorMessage, logged } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (logged) {
      history.push("/");
    }
  }, [logged, history]);
  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const registrationUserHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || password.trim().length < 6) {
      setError("Enter login and password");
    } else if (password !== confirm) {
      setError("passwords have to match");
    } else if (nick.trim().length < 5) {
      setError("Nick have to be longer then 5 characters");
    } else if (nick.trim().length > 20) {
      setError("Nick can't have more then 20 characters");
    } else {
      dispatch(registerUser({ email, password, nick }));
    }
    setPassword("");
    setConfirm("");
  };

  return (
    <Form
      onSubmit={registrationUserHandler}
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
              {error}
            </Alert>
          )}

          <Form.Group className="w-100">
            <Form.Label>Nick</Form.Label>
            <Form.Control
              placeholder="nick"
              type="text"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
            />
          </Form.Group>
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
            <Form.Label>
              Password <small>(min 6 characters)</small>
            </Form.Label>
            <Form.Control
              placeholder="password"
              type="password"
              value={password}
              autoComplete="newPassword"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="w-100">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="outline-success"
            size="lg"
            className="w-100 mt-3"
            type="submit"
          >
            Sign up
          </Button>
          <Link to="/login" className="btn-dark btn w-100 mt-3" type="submit">
            Have an account ? Login!
          </Link>
          <p className="text-center mt-2">&copy; Albicja🚀</p>
        </>
      )}
    </Form>
  );
};

export default Registration;
