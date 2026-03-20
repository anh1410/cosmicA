import { useState } from "react";

function MuseumGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images?.length) {
    return <p className="retro-copy">No gallery photos yet.</p>;
  }

  const activeImage = images[activeIndex];

  const goBack = () => {
    setActiveIndex((previousIndex) =>
      previousIndex === 0 ? images.length - 1 : previousIndex - 1,
    );
  };

  const goFront = () => {
    setActiveIndex((previousIndex) =>
      previousIndex === images.length - 1 ? 0 : previousIndex + 1,
    );
  };

  return (
    <div className="museum-gallery">
      <div className="gallery-photo-frame">
        <img
          className={`gallery-photo ${activeImage.toneClassName || ""}`.trim()}
          src={activeImage.src}
          alt={activeImage.alt}
        />
      </div>

      <div className="gallery-controls">
        <button type="button" className="gallery-button" onClick={goBack}>
          Back
        </button>

        <span className="gallery-index">
          {activeIndex + 1} / {images.length}
        </span>

        <button type="button" className="gallery-button" onClick={goFront}>
          Front
        </button>
      </div>
    </div>
  );
}

export default MuseumGallery;
