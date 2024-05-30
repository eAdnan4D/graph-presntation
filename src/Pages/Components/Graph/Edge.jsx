// Represent a single edge
function Edge({ details, visited }) {
  const {
    startX = 0,
    startY = 0,
    from = "",
    to = "",
    eucLen = 0,
    angelDeg = 0,
  } = details;

  // Add to the left and right half of width and height of node (to make the edge start from middle of the node)
  // Add double of width and height of the node to make the edge start from middle of the first node and end in the target node
  const styling = {
    left: `${startX + 25}px`,
    top: `${startY + 25}px`,
    height: `${eucLen}px`,
    transform: `rotate(${angelDeg + 90}deg)`,
  };

  return (
    <div
      id={from + to}
      className={`edge-graph ${visited ? "visited-edge" : ""}`}
      style={styling}
    ></div>
  );
}

export default Edge;
