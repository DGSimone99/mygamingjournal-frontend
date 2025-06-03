import { useState } from "react";
import { Carousel, Container, Image } from "react-bootstrap";

function GameDescription({ description }) {
  if (!description?.trim()) return null;

  return description.split("###").map((block, blockIndex) => {
    const lines = block.trim().split("\n");
    const title = lines[0]?.trim();
    const paragraphs = lines.slice(1).join("\n").split("\n\n");

    if (!title) return null;

    return (
      <div key={blockIndex}>
        <h4 className="mt-3 fs-4">{title}:</h4>
        {paragraphs.map((para, i) => (
          <p key={i}>{para.trim()}</p>
        ))}
      </div>
    );
  });
}

function DescriptionTab({ game }) {
  const [index, setIndex] = useState(0);
  const screenshots = game?.screenshots || [];

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Container className="description-tab">
      {screenshots.length > 2 && (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="tab-carousel"
          interval={null}
          indicators={screenshots.length <= 5}
        >
          {screenshots.slice(1, -1).map((screenshot, i) => (
            <Carousel.Item key={i}>
              <Image src={screenshot} alt={`Screenshot ${i + 1}`} fluid />
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <h2>Summary</h2>
      <GameDescription description={game?.description} />
    </Container>
  );
}

export default DescriptionTab;
