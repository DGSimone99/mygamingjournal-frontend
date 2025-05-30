import { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import { loginFetch } from "../../redux/actions";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import LogoCompleto from "../../assets/logoCompleto.png";

function LoginPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const htmlForm = event.currentTarget;

    if (htmlForm.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(loginFetch(form)).then((token) => {
        if (token) {
          login(token);
          navigate("/user/me");
        } else {
          setErrorMessage("Invalid username or password.");
        }
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  return (
    <Container className="page mt-5 h-100">
      <Image src={LogoCompleto} alt="Logo" className="mt-5 mb-4 d-block mx-auto" height={200} />
      <div className="d-flex align-items-center mx-auto text-center justify-content-center w-100">
        <Form onSubmit={handleSubmit} className="w-50">
          <Form.Group controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                value={form.username}
                type="text"
                placeholder="Username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                className="input-field border-0"
              />
              <Form.Control.Feedback type="invalid" className="text-danger">
                This field cannot be empty.
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Group controlId="validationCustomUsername" className="mt-3">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={form.password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="input-field border-0"
                />
                <Form.Control.Feedback type="invalid" className="text-danger">
                  This field cannot be empty.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <div className="text-danger mt-2">{errorMessage}</div>
          </Form.Group>
          <Button className="btn-confirm rounded-pill mt-3" type="submit">
            Login
          </Button>
          <div className="mt-4 text-secondary d-flex flex-column">
            Don't have an account?
            <span className="pointer-underline text-secondary ms-1" onClick={() => navigate("/register")}>
              Sign up
            </span>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;
