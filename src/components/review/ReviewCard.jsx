import { Star, Trash3Fill } from "react-bootstrap-icons";
import NoUser from "../../assets/NoUser.png";
import { Button, Container, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../redux/actions";
import { useNavigate } from "react-router";

function ReviewCard({ review, yourReview, userView }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteBtn = () => {
    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (confirmed) {
      dispatch(deleteReview(review.id, review.game.id));
    }
  };

  const formattedDate = new Date(review?.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Container className="p-4 mt-3 rounded-3 shadow-sm bg-dark">
      {yourReview && (
        <div className="d-flex justify-content-between">
          <h4 className="mb-3">Your review</h4>
          <Button onClick={deleteBtn} className="bg-transparent border-0 rounded-5">
            <Trash3Fill className="fs-5" style={{ fill: "var(--danger)" }} />
          </Button>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        {!userView ? (
          <div className="d-flex align-items-center gap-3">
            <Image
              src={review?.author?.avatarUrl || NoUser}
              height={50}
              width={50}
              className="rounded-circle border border-secondary"
            />
            <div>
              <h5 className="mb-0">{review?.author?.username}</h5>
              <p className="text-secondary m-0">{formattedDate}</p>
            </div>
          </div>
        ) : (
          <div
            className="d-flex align-items-center gap-3 pointer-list px-2 py-1 rounded w-75"
            onClick={() => navigate(`/game/${review?.game?.id}`)}
          >
            <Image
              src={review?.game?.backgroundImage}
              height={50}
              width={50}
              alt="Game"
              className="rounded-circle"
              style={{ objectFit: "cover" }}
            />
            <div>
              <h5 className="mb-0">{review?.game?.name}</h5>
              <p className="text-secondary p-0">{formattedDate}</p>
            </div>
          </div>
        )}

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
