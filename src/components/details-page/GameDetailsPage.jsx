import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { fetchDetails, fetchUserGameEntries } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import DescriptionTab from "./details-tabs/DescriptionTab";
import DetailsTab from "./details-tabs/DetailsTab";
import AchievementsTab from "./details-tabs/AchievementsTab";
import RelatedGamesTab from "./details-tabs/RelatedGamesTab";
import OverviewTab from "./details-tabs/OverviewTab";
import ReviewsTab from "./details-tabs/ReviewsTab";

function GameDetailsPage() {
  const dispatch = useDispatch();
  const { gameId } = useParams();

  const game = useSelector((state) => state.game || {});
  const [tab, setTab] = useState("Description");

  useEffect(() => {
    dispatch(fetchDetails(gameId));
    dispatch(fetchUserGameEntries());
  }, [dispatch, gameId, game.averageRating, game.added]);

  return (
    <Container fluid className="page">
      <Row className="h-100 ms-4 shadow-lg">
        <OverviewTab game={game} />
        <Col md={8} className="tabs-container rounded-end px-0 h-100">
          <div className="tabs-bar">
            <ButtonGroup className="d-flex justify-content-between">
              <Button className={`tabs ${tab === "Description" ? "active" : ""}`} onClick={() => setTab("Description")}>
                Description
              </Button>
              <Button className={`tabs ${tab === "Details" ? "active" : ""}`} onClick={() => setTab("Details")}>
                Details
              </Button>
              <Button
                className={`tabs ${tab === "Achievements" ? "active" : ""}`}
                onClick={() => setTab("Achievements")}
              >
                Achievements
              </Button>
              <Button className={`tabs ${tab === "Related" ? "active" : ""}`} onClick={() => setTab("Related")}>
                Related Games
              </Button>
              <Button className={`tabs ${tab === "Reviews" ? "active" : ""}`} onClick={() => setTab("Reviews")}>
                Reviews
              </Button>
            </ButtonGroup>
          </div>
          <div className="tabs-content">
            {tab === "Description" && <DescriptionTab game={game} />}
            {tab === "Details" && <DetailsTab game={game} />}
            {tab === "Achievements" && <AchievementsTab game={game} />}
            {(game?.relatedGames?.length > 0 || game?.dlcList?.length > 0) && tab === "Related" && (
              <RelatedGamesTab game={game} />
            )}
            {tab === "Reviews" && <ReviewsTab game={game} />}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GameDetailsPage;
