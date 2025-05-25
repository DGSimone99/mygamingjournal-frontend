import { useState } from "react";
import { Carousel, Container, Image } from "react-bootstrap";

function DescriptionTab({ game }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  function GameDescription({ description }) {
    if (!description) return null;

    const blocks = description.split("###").map((block) => {
      const lines = block.trim().split("\n");
      const title = lines[0];
      const content = lines.slice(1).join("\n").split("\n\n");

      if (!title) return null;

      return (
        <div key={title}>
          <h4 className="mt-3 fs-4">{title}:</h4>
          {content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      );
    });

    return <>{blocks}</>;
  }

  return (
    <Container className="description-tab">
      {game?.screenshots?.length > 2 && (
        <Carousel activeIndex={index} onSelect={handleSelect} className="tab-carousel">
          {game.screenshots.slice(1, -1).map((screenshot, i) => (
            <Carousel.Item key={i}>
              <Image src={screenshot} alt={`Screenshot ${i + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <h2>Summary</h2>
      {game?.description && <GameDescription description={game.description} />}
    </Container>
  );
}

export default DescriptionTab;
