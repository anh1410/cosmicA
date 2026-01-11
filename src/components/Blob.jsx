import { useState } from "react";

function Blob({ src, x, y, width = "280px", onClick }) {
  const [wiggle, setWiggle] = useState(false);

  const handleClick = () => {
    setWiggle(true);
    setTimeout(() => setWiggle(false), 300);
    if (onClick) onClick();
  };

  return (
    <img
      src={src}
      alt=""
      onClick={handleClick}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        cursor: "pointer",
        zIndex: 5,
        animation: wiggle ? "wiggle 0.3s ease-in-out" : "none",
      }}
    />
  );
}

export default Blob;
