import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Col, Container, Row, Spinner, Alert } from "react-bootstrap";

import { fetchDetails } from "../../redux/actions";
import DescriptionTab from "./details-tabs/DescriptionTab";
import DetailsTab from "./details-tabs/DetailsTab";
import AchievementsTab from "./details-tabs/AchievementsTab";
import RelatedGamesTab from "./details-tabs/RelatedGamesTab";
import OverviewTab from "./details-tabs/OverviewTab";
import ReviewsTab from "./details-tabs/ReviewsTab";

function GameDetailsPage() {
  const { gameId } = useParams();
  const dispatch = useDispatch();

  const { game, isLoading, error } = useSelector((state) => state.game);
  const [tab, setTab] = useState("Description");

  useEffect(() => {
    dispatch(fetchDetails(gameId));
  }, [dispatch, gameId]);

  const hasRelatedGames = game?.relatedGames?.length > 0 || game?.dlcList?.length > 0;
  const hasAchievements = game?.achievements?.length > 0;

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert className="bg-danger border-0">Error loading game details: {error}</Alert>
      </Container>
    );
  }

  if (!game) {
    return null;
  }

  return (
    <Container fluid className="page">
      <Row className="h-100 ms-4 shadow-lg">
        <OverviewTab game={game} />

        <Col md={12} lg={8} className="tabs-container rounded-end px-0 h-100">
          <div className="tabs-bar">
            <ButtonGroup className="d-flex justify-content-between">
              {["Description", "Details"].map((label) => (
                <Button key={label} className={`tabs ${tab === label ? "active" : ""}`} onClick={() => setTab(label)}>
                  {label}
                </Button>
              ))}

              {hasAchievements && (
                <Button
                  className={`tabs ${tab === "Achievements" ? "active" : ""}`}
                  onClick={() => setTab("Achievements")}
                >
                  Achievements
                </Button>
              )}

              {hasRelatedGames && (
                <Button className={`tabs ${tab === "Related" ? "active" : ""}`} onClick={() => setTab("Related")}>
                  Related Games
                </Button>
              )}

              <Button className={`tabs ${tab === "Reviews" ? "active" : ""}`} onClick={() => setTab("Reviews")}>
                Reviews
              </Button>
            </ButtonGroup>
          </div>

          <div className="tabs-content">
            {tab === "Description" && <DescriptionTab game={game} />}
            {tab === "Details" && <DetailsTab game={game} />}
            {tab === "Achievements" && <AchievementsTab game={game} />}
            {tab === "Related" && hasRelatedGames && <RelatedGamesTab game={game} />}
            {tab === "Reviews" && <ReviewsTab game={game} />}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GameDetailsPage;
