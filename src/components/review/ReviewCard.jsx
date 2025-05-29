import { Star, Trash3Fill } from "react-bootstrap-icons";
import NoUser from "../../assets/NoUser.png";
import { Button, Container, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../redux/actions";

function ReviewCard({ review, yourReview }) {
  const dispatch = useDispatch();

  const deleteBtn = () => {
    dispatch(deleteReview(review.id, review.game.id));
  };
  return (
    <Container className="p-4 mt-3 rounded-3 shadow-sm bg-dark">
      {yourReview && (
        <div className="d-flex justify-content-between">
          <h4 className="mb-3">Your review</h4>
          <div>
            <Button onClick={deleteBtn} className="bg-transparent border-0 rounded-5">
              <Trash3Fill className="fs-5" style={{ fill: "var(--danger)" }} />
            </Button>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-3">
          <Image
            src={review?.author?.avatarUrl || NoUser}
            height={50}
            width={50}
            className="rounded-circle border border-secondary"
          />
          <div>
            <h5 className="mb-0">{review?.author?.username}</h5>
            <small className="text-secondary">{review?.date}</small>
          </div>
        </div>
        <div className="d-flex align-items-center gap-1 fs-5">
          <Star /> {review?.score}
        </div>
      </div>
      <div className="bg-primary p-3 rounded-2">
        <p className="mb-0">{review?.text}</p>
      </div>
    </Container>
  );
}

export default ReviewCard;
