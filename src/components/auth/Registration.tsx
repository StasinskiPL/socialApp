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

  const RegistrationUserHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || password.trim().length < 6) {
      setError("Wprowadź email i hasło");
    } else if (password !== confirm) {
      setError("Hasła muszą być takie same");
    } else if (nick.trim().length < 5) {
      setError("Nick musi zawierać minimum pięć znaków");
    } else if (nick.trim().length > 20) {
      setError("Nick może zawierać maksymalnie 20 znaków");
    }else{
        dispatch(registerUser({email,password,nick}))
    }
    setPassword("")
    setConfirm("")
  };

  return (
    <Form
      onSubmit={RegistrationUserHandler}
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
              {error}
            </Alert>
          )}

          <Form.Group className="w-100">
            <Form.Label>Nazwa(Nick)</Form.Label>
            <Form.Control
              placeholder="nick"
              type="text"
              value={nick}
              onChange={(e) =>setNick(e.target.value)}
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
              Hasło <small>(min 6 znaków)</small>
            </Form.Label>
            <Form.Control
              placeholder="haslo"
              type="password"
              value={password}
              autoComplete="newPassword"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="w-100">
            <Form.Label>Powtórz hasło</Form.Label>
            <Form.Control
              placeholder="haslo"
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
            Zarejestruj
          </Button>
          <Link
            to="/logowanie"
            className="btn-dark btn w-100 mt-3"
            type="submit"
          >
            Masz już konto? Zaloguj się!
          </Link>
          <p className="text-center mt-2">
            @2022 AlbiclaV2 The Future of the web🚀
          </p>
        </>
      )}
    </Form>
  );
};

export default Registration;
