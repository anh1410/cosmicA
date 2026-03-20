import { useMemo } from "react";

function Blob({
  svgMarkup,
  x,
  y,
  width = "280px",
  onClick,
  zIndex = 1,
}) {
  const renderedSvgMarkup = useMemo(() => {
    if (!svgMarkup) return "";

    const withSvgClass = svgMarkup.replace(
      /<svg\b([^>]*)>/i,
      (_match, attrs) =>
        `<svg${attrs} class="blob-svg" aria-hidden="true" focusable="false">`,
    );

    return withSvgClass.replace(/<path\b/gi, '<path class="blob-hit"');
  }, [svgMarkup]);

  const handleClick = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.closest(".blob-hit")) return;
    onClick?.();
  };

  return (
    <div
      className="blob"
      onClick={handleClick}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        zIndex,
      }}
      dangerouslySetInnerHTML={{ __html: renderedSvgMarkup }}
    />
  );
}

export default Blob;
