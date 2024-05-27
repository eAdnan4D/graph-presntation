import { useContext } from "react";
import { Context } from "./Graph";

// The item in the list of nodes
function Relation({ details }) {
  const { allEdges, path } = useContext(Context);
  const [firstNode, secondNode] = details.split(",");

  // Mark the relation in graph presntation
  function markRelation() {
    // When there is a sloution this will ruin the nodes colors
    if (path.length) return;
    const node1 = document.getElementById(firstNode);
    const edge = document.getElementById(firstNode + secondNode);
    const node2 = document.getElementById(secondNode);
    node1.classList.add("visited-node");
    edge?.classList?.add("visited-edge"); // maybe the user removed the edges
    node2.classList.add("visited-node");
  }

  // UnMark the relation in graph presntation (after leave)
  function unmarkRelation() {
    if (path.length) return;
    const node1 = document.getElementById(firstNode);
    const edge = document.getElementById(firstNode + secondNode);
    const node2 = document.getElementById(secondNode);
    node1.classList.remove("visited-node");
    edge?.classList?.remove("visited-edge");
    node2.classList.remove("visited-node");
  }

  return (
    <div
      className="relation"
      onMouseEnter={markRelation}
      onMouseLeave={unmarkRelation}
    >
      <div className="node-weight">{firstNode}</div>
      <div className="arrow"></div>
      <span className="weight">{allEdges.current[details]}</span>
      <div className="node-weight">{secondNode}</div>
    </div>
  );
}

export default Relation;
