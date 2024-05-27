// Represent a single node
function Node({ node, styling, visited = false }) {
  return (
    <div
      id={node}
      className={`node-graph ${visited ? "visited-node" : ""}`}
      style={styling}
    >
      <span>{node}</span>
    </div>
  );
}

export default Node;
