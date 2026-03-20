import { useEffect, useRef, useState } from "react";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function Window({
  title,
  onClose,
  children,
  initialPos,
  width = 560,
  height = 360,
  zIndex = 1100,
}) {
  const [pos, setPos] = useState(initialPos || { x: 120, y: 120 });
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const startX = initialPos?.x ?? Math.max(8, (window.innerWidth - width) / 2);
    const startY = initialPos?.y ?? Math.max(24, (window.innerHeight - height) / 2);
    setPos({ x: startX, y: startY });

    const move = (e) => {
      if (!draggingRef.current) return;
      setPos({
        x: clamp(e.clientX - offsetRef.current.x, 8, window.innerWidth - width - 8),
        y: clamp(e.clientY - offsetRef.current.y, 8, window.innerHeight - height - 8),
      });
    };

    const up = () => (draggingRef.current = false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [height, width, initialPos]);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex }}>
      <div
        className="window-shell"
        style={{
          position: "absolute",
          top: pos.y,
          left: pos.x,
          width,
          height,
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          cursor: draggingRef.current ? "grabbing" : "default",

          background: `
            radial-gradient(circle at 50% 0%, rgba(255,207,207,0.15), transparent 55%),
            linear-gradient(180deg, #1a0f1f 0%, #08050b 100%)
          `,
          border: "2px solid #ffc3c3",
          boxShadow: `
            0 0 18px rgba(255,195,195,0.45),
            inset 0 0 40px rgba(0,0,0,0.75),
            -2px -2px 0 #000
          `,
          backgroundImage: `
            repeating-linear-gradient(90deg, #000 0px, #000 4px, #fff 4px, #fff 8px),
            repeating-linear-gradient(90deg, #000 0px, #000 4px, #fff 4px, #fff 8px),
            repeating-linear-gradient(0deg, #000 0px, #000 4px, #fff 4px, #fff 8px),
            repeating-linear-gradient(0deg, #000 0px, #000 4px, #fff 4px, #fff 8px)
          `,
          backgroundPosition: "top left, bottom left, top left, top right",
          backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
          backgroundSize: "100% 3px, 100% 3px, 3px 100%, 3px 100%",
        }}
      >
        {/* TITLE BAR */}
        <div
          onMouseDown={(e) => {
            draggingRef.current = true;
            offsetRef.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
            e.preventDefault();
          }}
          style={{
            height: 32,
            padding: "0 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "grab",
            userSelect: "none",

            background: `
              linear-gradient(180deg, rgba(255,255,255,0.18), transparent 40%),
              linear-gradient(180deg, #ffcfcf 0%, #ffc3c3 50%, #ffafaf 100%)
            `,
            borderBottom: "1px solid #000",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div className="window-title-controls">
              <span className="ctrl ctrl-min" />
              <span className="ctrl ctrl-max" />
              <span className="ctrl ctrl-close" />
            </div>

            <span
              style={{
                fontFamily: "'Georgia', 'Garamond', serif",
                fontSize: 14,
                fontWeight: "bold",
                letterSpacing: 1.5,
                color: "#2a0a15",
                textShadow: "0 0 6px rgba(255,207,207,0.6)",
              }}
            >
              {title}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 20,
              height: 20,
              background: "#ffc3c3",
              border: "1px solid #000",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 0 6px rgba(255,195,195,0.6)",
              color: "#2a0a15",
            }}
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div
          style={{
            flex: 1,
            padding: 20,
            color: "#f2d9e5",
            fontFamily: "'Courier New', monospace",
            fontSize: 14,
            lineHeight: 1.6,
            background: `
              radial-gradient(circle at 50% 30%, rgba(255,207,207,0.06), transparent 65%)
            `,
            boxShadow: "inset 0 0 50px rgba(0,0,0,0.8)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
