import { useContext, useEffect, useRef, useState } from "react";
import CheckNode from "./CheckNode";
import Empty from "./Empty";
import { Context } from "../Graph";
import Header from "./Header";
import SolveBtn from "./SolveBtn";

function Solve() {
  const { setShowSolve, nodes, path, isSolving } = useContext(Context);
  // Start point
  const [selectedNode, setSelectedNode] = useState("");
  // All nodes the user want to find
  const [wantedNodes, setWantedNodes] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add("show-dashboard");
    }
  }, []);

  // When use select a node and this node in wanted list then remove it
  useEffect(() => {
    if (wantedNodes[selectedNode]) {
      setWantedNodes(function (state) {
        const keys = [];
        Object.keys(state).forEach((val) => {
          val != selectedNode ? keys.push([val, 1]) : null;
        });
        return Object.fromEntries(keys);
      });
    }
  }, [selectedNode]);

  function handleClose() {
    if (ref.current) {
      ref.current.classList.remove("show-dashboard");
      const timer = setTimeout(() => {
        setShowSolve(false);
        clearTimeout(timer);
      }, 1000);
    }
  }

  return (
    <div ref={ref} className={`graph-dashboard solve`}>
      <Header title="Find Shortest Path" handleClose={handleClose}>
        <label
          htmlFor="select-node"
          {...(path.length && { "data-path": "Clear the path first" })}
        >
          Select start point
        </label>
        <select
          value={selectedNode}
          onChange={(e) => setSelectedNode(e.target.value)}
          disabled={!nodes.length || isSolving || path.length}
          name="select-node"
          id="select-node"
        >
          <option value="" disabled={true}>
            Select node
          </option>
          {nodes.map((node) => (
            <option key={`option-${node}`} value={node}>
              The node &quot;{node}&quot;
            </option>
          ))}
        </select>
      </Header>
      <div className="dashboard-body">
        {!nodes.length ? (
          <Empty>No nodes yet create the graph first</Empty>
        ) : (
          <div className="node-details">
            <h1 className="title">Mark Wanted node to visit</h1>
            {nodes.map(
              (node) =>
                node != selectedNode && (
                  <CheckNode
                    key={`check-${node}`}
                    node={node}
                    val={wantedNodes[node]}
                    dis={selectedNode == ""}
                    onCheck={setWantedNodes}
                  />
                )
            )}
          </div>
        )}
        <SolveBtn
          parentRef={ref}
          wantedNodes={wantedNodes}
          start={selectedNode}
        />
      </div>
    </div>
  );
}

export default Solve;
