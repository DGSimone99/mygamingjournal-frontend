import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsByGame } from "../../../redux/actions";
import ReviewCard from "../../review/ReviewCard";
import PostReview from "../../review/PostReview";
import PaginationControls from "../../common/PaginationControls";

function ReviewsTab({ game }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews || []);
  const reviewsPages = useSelector((state) => state.reviews.totalPages || 0);
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => Boolean(state.auth.token));
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchReviewsByGame(game.id, page));
  }, [dispatch, game.id, page]);

  const yourReview = isLoggedIn ? reviews.find((r) => r.author?.id === user?.id) : null;
  const otherReviews = reviews.filter((r) => !yourReview || r.id !== yourReview.id);

  return (
    <Container className="position-relative">
      {isLoggedIn && !yourReview && <PostReview game={game} />}
      {yourReview && <ReviewCard key={yourReview.id} review={yourReview} yourReview={true} />}
      <div className="mt-3">
        {reviewsPages >= 1 && (
          <PaginationControls
            currentPage={page}
            totalPages={reviewsPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        {otherReviews.length > 0 &&
          otherReviews.map((review) => <ReviewCard key={review.id} review={review} yourReview={false} />)}
      </div>
    </Container>
  );
}

export default ReviewsTab;
