import { useState } from "react";
import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import { registerFetch } from "../../redux/actions";
import { useNavigate } from "react-router";
import LogoCompleto from "../../assets/logoCompleto.png";
import allLanguages from "../../utils/allLanguages";
import Select from "react-select";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    languages: [],
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleSubmit = (event) => {
    event.preventDefault();
    const htmlForm = event.currentTarget;

    if (htmlForm.checkValidity() === false) {
      event.stopPropagation();
    } else if (form.password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
    } else if (!isValidPassword(form.password)) {
      setErrorMessage("Password must be at least 8 characters long, with an uppercase letter and a number.");
    } else {
      dispatch(registerFetch(form)).then((success) => {
        if (success) {
          navigate("/login");
        } else {
          setErrorMessage("Registration failed. Try again.");
        }
      });
    }
  };

  return (
    <Container className="page mt-5 d-flex flex-column justify-content-center h-100">
      <Image src={LogoCompleto} alt="Logo" className="mt-5 mb-4 d-block mx-auto" height={200} />
      <div className="d-flex align-items-center mx-auto text-center justify-content-center w-100">
        <Form onSubmit={handleSubmit} className="w-50">
          <Form.Group controlId="registerUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                className="input-field border-0"
              />
              <Form.Control.Feedback type="invalid" className="text-danger">
                This field cannot be empty.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="registerEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="input-field border-0"
              />
              <Form.Control.Feedback type="invalid" className="text-danger">
                Enter a valid email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="registerPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="input-field border-0"
              />
              <Form.Control.Feedback type="invalid" className="text-danger">
                This field cannot be empty.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="registerConfirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-field border-0"
              />
              <Form.Control.Feedback type="invalid" className="text-danger">
                This field cannot be empty.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="registerLanguages" className="mt-3">
            <Form.Label>Languages</Form.Label>
            <Select
              isMulti
              isSearchable
              options={allLanguages}
              value={allLanguages.filter((lang) => form.languages.includes(lang.value))}
              onChange={(selectedOptions) => {
                if (selectedOptions.length <= 3) {
                  setForm({ ...form, languages: selectedOptions.map((opt) => opt.value) });
                }
              }}
              classNamePrefix="react-select"
              className="react-select"
              placeholder="Select languages..."
            />
            <Form.Text className="text-secondary">Max 3. Start typing to search.</Form.Text>
          </Form.Group>

          <div className="text-danger mt-2">{errorMessage}</div>

          <Button className="btn-confirm rounded-pill mt-3" type="submit">
            Register
          </Button>

          <div className="mt-4 text-secondary d-flex flex-column">
            Already have an account?
            <span className="pointer-underline text-secondary ms-1" onClick={() => navigate("/login")}>
              Login
            </span>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default RegisterPage;
