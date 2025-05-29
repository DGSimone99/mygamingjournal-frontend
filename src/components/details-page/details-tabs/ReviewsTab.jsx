import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsByGame } from "../../../redux/actions";
import ReviewCard from "../../review/ReviewCard";
import { useAuth } from "../../../context/AuthContext";
import PostReview from "../../review/PostReview";
import PaginationControls from "../../common/PaginationControls";

function ReviewsTab({ game }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews || []);
  const reviewsPages = useSelector((state) => state.reviews.totalPages || 0);
  const user = useSelector((state) => state.user);
  const yourReview = reviews.find((r) => r.author.id === user.id);
  const otherReviews = reviews.filter((r) => r.author.id !== user.id);
  const { isLoggedIn } = useAuth();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchReviewsByGame(game.id, page));
  }, [dispatch, game.id]);
  return (
    <Container className="position-relative">
      {isLoggedIn && !yourReview && <PostReview game={game} />}
      {yourReview && <ReviewCard key={yourReview.id} review={yourReview} yourReview={true} />}
      <div className="mt-3">
        {reviewsPages > 1 && (
          <PaginationControls
            currentPage={page}
            totalPages={reviewsPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        {otherReviews.length > 0 &&
          reviews.map((review) => <ReviewCard key={review.id} review={review} yourReview={false} />)}
      </div>
    </Container>
  );
}

export default ReviewsTab;
