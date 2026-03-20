import { useMemo, useState } from "react";

import Window from "./components/Window.jsx";
import Blob from "./components/Blob.jsx";
import MuseumGallery from "./components/MuseumGallery.jsx";
import topFrame from "./assets/top-frame.svg";
import layoutTexture from "./assets/layout.png";
import blobScripture from "./assets/blob-scripture.svg?raw";
import blobSongs from "./assets/blob-songs.svg?raw";
import blobKids from "./assets/blob-kids.svg?raw";
import blobConnect from "./assets/blob-connect.svg?raw";
import blobMuseum from "./assets/blob-museum.svg?raw";
import "./App.css";

const galleryImageModules = import.meta.glob("./assets/gallery/*.{png,jpg,jpeg,webp,gif}", {
  eager: true,
  import: "default",
});

const kidsImageModules = import.meta.glob("./assets/kids/*.{png,jpg,jpeg,webp,gif}", {
  eager: true,
  import: "default",
});

const SCRIPTURE_TEXT = "ELLO ! im anagha :p 20 years old and i have very little interest in anything at all, but i love reading sometimes, i love my friends (you will find them in the gallery) and i have a lot of moisturizers. im very invested in extensive fry eating and ig id have to say my purpose in life is to be the universe's silliest and most whimsical soldier.";

const BLOB_LAYOUT = [
  { id: "scripture", title: "Scripture Blob", svgMarkup: blobScripture, left: 24.17, top: 19.04, width: 72.15 },
  { id: "songs", title: "Song Blob", svgMarkup: blobSongs, left: 41.67, top: 20.9, width: 54.93 },
  { id: "kids", title: "My Kids Blob", svgMarkup: blobKids, left: 22.92, top: 43.16, width: 34.58 },
  { id: "connect", title: "Connect with the Divine", svgMarkup: blobConnect, left: 2.22, top: 57.91, width: 38.06 },
  { id: "museum", title: "Museum Blob", svgMarkup: blobMuseum, left: 3.4, top: 20.31, width: 20 },
];

function App() {
  const [windows, setWindows] = useState([]);

  const windowSize = useMemo(() => ({ width: 560, height: 360 }), []);
  const kidsImageSrc = useMemo(() => {
    const kidsSources = Object.entries(kidsImageModules).sort(([pathA], [pathB]) =>
      pathA.localeCompare(pathB),
    );
    return kidsSources[0]?.[1] || layoutTexture;
  }, []);

  const museumImages = useMemo(
    () =>
      Object.entries(galleryImageModules)
        .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
        .map(([, src], index) => ({
          src,
          alt: `Museum gallery photo ${index + 1}`,
          toneClassName: index % 3 === 0 ? "tone-a" : index % 3 === 1 ? "tone-b" : "tone-c",
        })),
    [],
  );

  const renderWindowContent = (blobId) => {
    if (blobId === "scripture") {
      return (
        <div className="retro-panel scripture-panel retro-content">
          <p className="retro-copy">{SCRIPTURE_TEXT}</p>
        </div>
      );
    }

    if (blobId === "songs") {
      return (
        <div className="retro-panel retro-content">
          <p className="retro-copy">Tune in here:</p>
          <a
            className="retro-link"
            href="https://open.spotify.com/playlist/0d9gKuQPSVeLkiTrv4hBzY?si=ab70BuEzSIm_VUQEDwt9AA&pi=k_6wolTDQjCPc"
            target="_blank"
            rel="noreferrer"
          >
            playlist
          </a>
        </div>
      );
    }

    if (blobId === "museum") {
      return (
        <div className="retro-panel retro-content">
          <MuseumGallery images={museumImages} />
        </div>
      );
    }

    if (blobId === "connect") {
      return (
        <div className="retro-panel retro-content">
          <p className="retro-copy">Find me here:</p>
          <div className="link-stack">
            <a className="retro-link" href="https://github.com/anh1410" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              className="retro-link"
              href="https://www.linkedin.com/in/anaghakatla/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a className="retro-link" href="https://www.instagram.com/anaghaktl/" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      );
    }

    if (blobId === "kids") {
      return (
        <div className="retro-panel retro-content">
          <div className="gallery-photo-frame kids-photo-frame">
            <img className="gallery-photo" src={kidsImageSrc} alt="Kids placeholder" />
          </div>
          <p className="retro-copy">Image placeholder</p>
        </div>
      );
    }

    return <p className="retro-copy">Content coming soon.</p>;
  };

  const openWindow = (blob) => {
    const id = `${blob.id}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    if (typeof window !== "undefined") {
      const maxX = Math.max(8, window.innerWidth - windowSize.width - 12);
      const maxY = Math.max(8, window.innerHeight - windowSize.height - 12);
      const pos = {
        x: 8 + Math.random() * maxX,
        y: 12 + Math.random() * maxY,
      };
      setWindows((prev) => [...prev, { id, blobId: blob.id, blobTitle: blob.title, pos }]);
    } else {
      setWindows((prev) => [...prev, { id, blobId: blob.id, blobTitle: blob.title, pos: null }]);
    }
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="app">
      <div className="layout">
        <img className="top-frame" src={topFrame} alt="top frame" />

        <div className="checkerband" aria-hidden="true" />

        {BLOB_LAYOUT.map((blob) => (
          <Blob
            key={blob.id}
            svgMarkup={blob.svgMarkup}
            x={`${blob.left}%`}
            y={`${blob.top}%`}
            width={`${blob.width}%`}
            onClick={() => openWindow(blob)}
          />
        ))}
      </div>

      {BLOB_LAYOUT.map((blob) => (
        <button
          key={`btn-${blob.id}`}
          style={{ display: "none" }}
          aria-hidden
          onClick={() => openWindow(blob)}
        />
      ))}

      {windows.map((win, index) => (
        <Window
          key={win.id}
          title={win.blobTitle}
          onClose={() => closeWindow(win.id)}
          initialPos={win.pos}
          width={windowSize.width}
          height={windowSize.height}
          zIndex={1100 + index}
        >
          {renderWindowContent(win.blobId)}
        </Window>
      ))}
    </div>
  );
}

export default App;
