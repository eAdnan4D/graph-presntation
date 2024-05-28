import { useContext } from "react";
import Empty from "./Empty";
import { Context } from "../Graph";
import GraphError from "./GraphError";

function GraphDashboardBody({ filter }) {
  const {
    allEdges: { current: allEdges },
    graph,
    setGraph,
    nodes,
    path,
    isSolving,
  } = useContext(Context);

  // Delete all edges for particler node then delete it
  function handleDeleteNode(deletedNode) {
    const graphCopy = JSON.parse(JSON.stringify(graph)); // Deep Copy
    for (let key in graphCopy) {
      graphCopy[key] = graphCopy[key].filter(([node]) => node != deletedNode);
    }
    delete graphCopy[deletedNode];
    setGraph(graphCopy);
  }

  // As it's not direct then modify both of the weights
  function handleAddWeight(e, node1, node2) {
    const id1 = `weight-${node1},${node2}`;
    const id2 = `weight-${node2},${node1}`;
    const graphCopy = JSON.parse(JSON.stringify(graph)); // Deep Copy
    if (e.target.value == "") {
      // when the input is empty that's mean delete the edge
      // when we don't handle this case the edge will set to 0
      // and it will double the edge because we chek
      // on the Presentation not in Graph component
      document.getElementById(id1).value = "";
      document.getElementById(id2).value = "";
      graphCopy[node1] = graphCopy[node1].filter(([n]) => n != node2);
      graphCopy[node2] = graphCopy[node2].filter(([n]) => n != node1);
      setGraph(graphCopy);
      return;
    }
    const num = Math.abs(+e.target.value);
    if (allEdges[`${node1},${node2}`] && allEdges[`${node2},${node1}`]) {
      // If the node exist then modify
      graphCopy[node1] = graphCopy[node1].map(([n, weight]) =>
        n == node2 ? [n, num] : [n, weight]
      );
      graphCopy[node2] = graphCopy[node2].map(([n, weight]) =>
        n == node1 ? [n, num] : [n, weight]
      );
    } else {
      // Create new one
      graphCopy[node1].push([node2, num]);
      graphCopy[node2].push([node1, num]);
    }
    // The inputs are using default values so there is no state to update them
    // By using this way we make sure that they get updated before update the graph itself
    document.getElementById(id1).value = num;
    document.getElementById(id2).value = num;

    setGraph(graphCopy);
  }

  if (!nodes.length) {
    return <Empty>Add Nodes first to adjust the edges</Empty>;
  }
  // No filter
  if (filter == "") {
    return (
      <div className="dashboard-body">
        {nodes.map((node1) => (
          <div key={`node-${node1}`} className="node-details">
            <h1 className="title">Node {node1}</h1>
            <button
              className="delete-node"
              onClick={() => handleDeleteNode(node1)}
              disabled={isSolving || path.length}
            >
              -
            </button>
            <ul className="options">
              {nodes.map(function (node2) {
                const id = node1 + "," + node2; // To get the weights
                const edge = allEdges?.[id];
                return (
                  node2 != node1 && (
                    <li key={`edge-${id}`}>
                      <label htmlFor={`weight-${id}`}>
                        Enter Weight For Node {node2}
                      </label>
                      <input
                        type="number"
                        name={`weight-${id}`}
                        id={`weight-${id}`}
                        {...(edge != 0 && { defaultValue: edge })} // passing prop conditionly
                        placeholder="Leave the field empty if they aren't connected"
                        onBlur={(e) => handleAddWeight(e, node1, node2)}
                        disabled={isSolving || path.length}
                      />
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  if (filter != "") {
    const filteredNodes = nodes.filter((node) => node.startsWith(filter));
    return (
      <div className="dashboard-body">
        {filteredNodes.length ? (
          filteredNodes.map((node1) => (
            <div key={`node-${node1}`} className="node-details">
              <h1 className="title">Node {node1}</h1>
              <button
                className="delete-node"
                onClick={() => handleDeleteNode(node1)}
                disabled={isSolving || path.length}
              >
                -
              </button>
              <ul className="options">
                {nodes.map(function (node2) {
                  const id = node1 + "," + node2; // To get the weights
                  const edge = allEdges?.[id];
                  return (
                    node2 != node1 && (
                      <li key={`edge-${id}`}>
                        <label htmlFor={`weight-${id}`}>
                          Enter Weight For Node {node2}
                        </label>
                        <input
                          type="number"
                          name={`weight-${id}`}
                          id={`weight-${id}`}
                          {...(edge != 0 && { defaultValue: edge })} // passing prop conditionly
                          placeholder="Leave the field empty if they aren't connected"
                          onBlur={(e) => handleAddWeight(e, node1, node2)}
                          disabled={isSolving || path.length}
                        />
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
          ))
        ) : (
          <div className="dashboard-body">
            <GraphError>There is no node starts with {filter}</GraphError>
          </div>
        )}
      </div>
    );
  }
}

export default GraphDashboardBody;
