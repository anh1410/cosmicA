import { useState } from "react";

import Blob from "./components/Blob.jsx";
import Window from "./components/Window.jsx";

import LayoutImage from "./assets/layout.png";
import blobMuseum from "./assets/blob-museum.svg";

function App() {
  const [activeWindow, setActiveWindow] = useState(null);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#fbe6e3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* CANVAS */}
      <div
        style={{
          position: "relative",
          width: "1200px",
          height: "675px", // 16:9 fixed canvas
        }}
      >
        {/* BACKGROUND LAYOUT */}
        <img
          src={LayoutImage}
          alt="layout"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* WINDOWS */}
        {activeWindow === "about" && (
          <Window title="About" onClose={() => setActiveWindow(null)}>
            <h2>hi! i’m shar</h2>
            <p>illustrator, animator, and developer.</p>
            <p>
              This is a desktop-style window. You can put text, images,
              audio, or anything here.
            </p>
          </Window>
        )}
      </div>
    </div>
  );
}

export default App;
