import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown } from "react-bootstrap-icons";
import { Button, Collapse, Container, Form, Image } from "react-bootstrap";
import { postReview } from "../../redux/actions";
import NoUser from "../../assets/NoUser.png";

function PostReview({ game }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ text: "", score: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.text.trim() || !form.score) return;

    dispatch(postReview(game.id, form.text, Number(form.score)));
    setForm({ text: "", score: "" });
  };

  return (
    <Container className="p-4 mt-3 rounded-3 shadow-sm bg-dark shadow-lg">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="d-flex align-items-center justify-content-between text-white mb-1 pointer"
      >
        <h4 className="mb-0">Post a Review</h4>
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} size={24} />
      </div>

      <Collapse in={open}>
        <div>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-3">
                <Image
                  src={user?.avatarUrl || NoUser}
                  height={50}
                  width={50}
                  className="rounded-circle border border-secondary mt-2"
                />
                <div>
                  <h5 className="mb-0">{user?.username}</h5>
                </div>
              </div>

              <Form.Group>
                <Form.Select
                  required
                  value={form.score}
                  onChange={(e) => setForm({ ...form, score: e.target.value })}
                  className="bg-black border border-secondary"
                >
                  <option value="">Score</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <Form.Group className="bg-primary p-3 rounded-2 d-flex">
              <Form.Control
                required
                as="textarea"
                placeholder="Your review here"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="input-field bg-sidebar border border-secondary"
              />

              <Button type="submit" className="border-secondary ms-2 btn-confirm">
                Post
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Collapse>
    </Container>
  );
}

export default PostReview;
