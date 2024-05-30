import { useContext } from "react";
import { Context } from "../../Parents/Graph";
import Node from "./Node";

function Nodes() {
  const { nodesStyle, path, curSnapshot } = useContext(Context);
  if (curSnapshot == 0) {
    return nodesStyle.map(function ({ styling, node }) {
      return <Node key={node} node={node} styling={styling} />;
    });
  }

  // To get visited node in order
  const visited = {};
  path.forEach((node, i) => {
    if (i < curSnapshot) visited[node] = 1;
  });

  return nodesStyle.map(function ({ styling, node }) {
    return (
      <Node key={node} node={node} visited={visited[node]} styling={styling} />
    );
  });
}

export default Nodes;
