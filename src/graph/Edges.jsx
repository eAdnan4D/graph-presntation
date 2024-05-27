import { useContext } from "react";
import Edge from "./Edge";
import { Context } from "./Graph";

// Help us draw all edges
function Edges() {
  const { edges, path, curSnapshot } = useContext(Context);

  if (curSnapshot <= 1) {
    return edges?.map((edge, i) => {
      return <Edge key={edges[i].from + edges[i].to} details={edge} />;
    });
  }

  // We want the current node and the next one
  // But start where there is at least 2 nodes
  const visited = {};
  path.forEach((node, index) => {
    if (index >= curSnapshot - 1) return;
    const id = node + path[index + 1];
    const refId = path[index + 1] + node;
    visited[id] = 1;
    visited[refId] = 1;
  });

  return edges.map((edge, i) => {
    return (
      <Edge
        key={edges[i].from + edges[i].to}
        visited={visited[edges[i].from + edges[i].to]}
        details={edge}
      />
    );
  });
}

export default Edges;
