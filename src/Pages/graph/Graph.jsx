import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./graph.css";
import Edges from "./Components/Edges";
import Empty from "./Components/Empty";
import GraphDashboard from "./Components/GraphDashboard";
import GraphError from "./Components/GraphError";
import NextSnapshot from "./Components/NextSnapshot";
import Nodes from "./Components/Nodes";
import PrevSnapshot from "./Components/PrevSnapshot";
import Relation from "./Components/Relation";
import SearchNodes from "./Components/SearchNodes";
import Solve from "./Components/Solve";
import {
  distributeEdges,
  distributeNodes,
  isDirect,
  isSameAsReverse,
  isValidGraph,
} from "./Components/helper";

export const Context = createContext({
  graph: null,
  path: null,
  setPath: null,
  solveFn: null,
  isSolving: null,
  setIsSolving: null,
  error: null,
  abslouteEdges: null,
  allEdges: null,
  filter: null,
  setFilter: null,
  elementsCount: null,
  showDashboard: null,
  setShowDashboard: null,
  setGraph: null,
  showSolve: null,
  setShowSolve: null,
  points: null,
  nodesCoordinate: null,
  nodesStyle: null,
  nodeSize: null,
  lengthForSide: null,
  edges: null,
  nodes: null,
  curSnapshot: null,
  setCurSnapshot: null,
});

// Represent the whole graph container to not overflow
function Graph({
  children,
  solveFn,
  nodeSize = 50,
  lengthForSide = 100,
  height = 600,
}) {
  const [graph, setGraph] = useState({});
  const [path, setPath] = useState([]); // The answer of traversal
  const [isSolving, setIsSolving] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("graph");
  const [showDashboard, setShowDashboard] = useState(false); // dasbaord for add nodes
  const [showSolve, setShowSolve] = useState(false); // dashboard for solve way
  const [curSnapshot, setCurSnapshot] = useState(0);

  const dashboardRef = useRef(null);
  // keep track of all edges backword and forward
  const allEdges = useRef({});
  // Keep track of elements count for styling purpose
  // This will be accessed by main pieces only
  const elementsCount = useRef(children.length);

  // Prepare Nodes
  const nodes = Object.keys(graph);
  const nodeLen = nodes.length;
  const radius = (nodeLen * 100) / 4; // distance between center and points(Nodes)
  const points = distributeNodes(radius, lengthForSide * nodeLen, nodeLen);
  const nodesCoordinate = {}; // For edges
  const nodesStyle = nodes.map(function (node, index) {
    const styling = {
      left: `${points[index].x}px`,
      top: `${points[index].y}px`,
    };
    nodesCoordinate[node] = points[index];
    return { styling, node };
  });
  // Prepare Edges (this will paint on the screen)
  const { edges, presented } = distributeEdges(graph, nodesCoordinate);
  const abslouteEdges = []; // A->B just with no B->A it will help on render them
  const keys = Object.keys(presented); // Filter one way

  keys.reduce(function (acc, curr) {
    if (isSameAsReverse(acc, curr)) {
      abslouteEdges.push(acc);
    }
    return curr;
  }, keys[0]);
  allEdges.current = presented;

  useEffect(() => {
    elementsCount.current = children.length; // This won't cause re-render
  });

  useLayoutEffect(() => {
    dashboardRef.current.style.setProperty("--height-dashboard", `${height}px`);
  }, [height]);

  if (
    children.length >= 3 &&
    children[0].type.name != "GraphFilter" &&
    children.at(-1).type.name != "GraphFilter"
  ) {
    throw new Error(
      "This isn't a valid layout. GroupFilter component must be either the first child or last child"
    );
  } else if (
    children.length <= 2 &&
    (children[0].type.name == "GraphFilter" ||
      children[1].type.name == "GraphFilter")
  ) {
    throw new Error(
      "This isn't a valid layout. GroupFilter component must be with Presentation component and Nodelist"
    );
  } else if (typeof children === "object" && !Array.isArray(children)) {
    throw new Error(
      "This isn't a valid layout. Graph component must hold at least Presentation component and Nodelist"
    );
  }
  return (
    <Context.Provider
      value={{
        graph,
        setGraph,
        path,
        setPath,
        solveFn,
        isSolving,
        setIsSolving,
        error,
        setError,
        abslouteEdges,
        allEdges,
        filter,
        setFilter,
        elementsCount,
        showDashboard,
        setShowDashboard,
        showSolve,
        setShowSolve,
        points,
        nodesCoordinate,
        nodesStyle,
        nodeSize,
        lengthForSide,
        edges,
        nodes,
        curSnapshot,
        setCurSnapshot,
      }}
    >
      <div ref={dashboardRef} className="dashboard">
        {children[0]}
        {showDashboard && <GraphDashboard />}
        {showSolve && <Solve />}
        {children.slice(1)}
      </div>
    </Context.Provider>
  );
}

// Really the graph distributed on outline of a circle
function Presentation() {
  const {
    graph,
    error,
    elementsCount,
    nodeSize,
    lengthForSide,
    filter,
    setError,
    nodes,
    curSnapshot,
    setCurSnapshot,
    path,
  } = useContext(Context);
  // To make the component more flexible
  const graphRef = useRef(null);
  // Get nodes count
  const nodeLen = nodes.length;
  // Maximum edges mustn't exceed n * (n-1)
  const maxEdges = Object.values(graph).reduce(
    (acc, cur) => (acc += cur.length),
    0
  );
  const isValid = isValidGraph(graph); // check if the graph is valid like (A -> B) and B isn't found
  // In our task the graph is undirected
  const notDirect = isDirect(graph, nodes);

  // Valdiation
  useLayoutEffect(() => {
    if (maxEdges > nodeLen * (nodeLen - 1)) {
      setError("Maximum edges mustn't exceed n * (n-1)");
      // for development
      // throw new Error("Maximum edges mustn't exceed n * (n-1)");
    } else if (!isValid) {
      setError("There is a missing node");
      // throw new Error("There is a missing node")
    } else if (!notDirect) {
      setError(
        "The graph either direct or there is a lack of nodes (there is a node connected to undefined node)"
      );
      // throw new Error(
      //   "The graph either direct or there is a lack of nodes (there is a node connected to undefined node)"
      // );
    } else {
      setError("");
    }
  }, [maxEdges, nodeLen, notDirect]);

  // passing the important info for css file by the css variabels
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.style.setProperty("--node-size", `${nodeSize}px`);
      graphRef.current.style.setProperty("--nodes-count", nodeLen);
      graphRef.current.style.setProperty(
        "--length-for-node",
        `${lengthForSide}px`
      );
    }
  });

  if (error)
    return (
      <div className="graph-all">
        <div className="graph-container" data-count={elementsCount.current}>
          <GraphError>{error}</GraphError>
        </div>

        <div className="graph-pagination">
          <PrevSnapshot dis={true} />
          <span>Snapshot {curSnapshot + 1}</span>
          <NextSnapshot dis={true} />
        </div>
      </div>
    );

  if (!nodeLen) {
    return (
      <div className="graph-all">
        <div
          ref={graphRef}
          className="graph-container"
          data-count={elementsCount.current}
        >
          <Empty>No graph yet</Empty>
        </div>

        <div className="graph-pagination">
          <PrevSnapshot dis={true} />
          <span>Snapshot {curSnapshot + 1}</span>
          <NextSnapshot dis={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="graph-all">
      <div
        ref={graphRef}
        className="graph-container"
        data-count={elementsCount.current}
      >
        <div className="nodes-container">
          <Nodes />

          {filter == "graph" && <Edges />}
        </div>
      </div>

      <div className="graph-pagination">
        <PrevSnapshot
          dis={curSnapshot == 0}
          handleSnapshot={() => setCurSnapshot((cur) => cur - 1)}
        />
        <span>
          Snapshot {curSnapshot + 1} / {path.length + 1}
        </span>
        <NextSnapshot
          dis={curSnapshot == path.length}
          handleSnapshot={() => setCurSnapshot((cur) => cur + 1)}
        />
      </div>
    </div>
  );
}

// This part responsible of taking nodes and etc...
function NodesList() {
  const [searchInput, setSearchInput] = useState("");
  const { abslouteEdges, elementsCount } = useContext(Context);
  let filteredRelations =
    searchInput != ""
      ? abslouteEdges.filter((relation) =>
          relation.startsWith(searchInput) ? relation : ""
        )
      : [];

  // Graph never existed yet
  if (!abslouteEdges.length) {
    return (
      <div className="weights" data-count={elementsCount.current}>
        <SearchNodes
          search={searchInput}
          setSearch={setSearchInput}
          dis={true}
        />
        <Empty>No edges yet</Empty>
      </div>
    );
  }

  // No search with graph existed
  if (searchInput == "" && abslouteEdges.length) {
    return (
      <div className="weights" data-count={elementsCount.current}>
        <SearchNodes search={searchInput} setSearch={setSearchInput} />
        {abslouteEdges.map((relation) => (
          <Relation key={relation} details={relation} />
        ))}
      </div>
    );
  }

  // Search with results
  if (searchInput != "" && filteredRelations.length) {
    return (
      <div className="weights" data-count={elementsCount.current}>
        <SearchNodes search={searchInput} setSearch={setSearchInput} />
        {filteredRelations.map((relation) => (
          <Relation key={relation} details={relation} />
        ))}
      </div>
    );
  }

  // Last one can include in if statment if there is more states...
  // Last state is search found but there is no results
  return (
    <div className="weights" data-count={elementsCount.current}>
      <SearchNodes search={searchInput} setSearch={setSearchInput} />
      {searchInput != "" && filteredRelations.length == 0 && (
        <GraphError additionalStyle={{ width: "80%", margin: "1rem auto 0" }}>
          There is no node starts with {searchInput}
        </GraphError>
      )}
    </div>
  );
}

// Filter for only nodes or node with edges
function GraphFilter() {
  const { filter, setFilter, elementsCount } = useContext(Context);

  function handleClick(e) {
    if (e.target.className.includes("graph-btn")) {
      if (!e.target.className.includes("active")) {
        if (filter == "graph") setFilter("nodes");
        else if (filter == "nodes") setFilter("graph");
      }
    }
  }

  return (
    <div
      className="graph-filter"
      data-count={elementsCount.current}
      onClick={handleClick}
    >
      <button className={`graph-btn ${filter == "graph" ? "active" : ""}`}>
        Graph
      </button>
      <button className={`graph-btn ${filter == "nodes" ? "active" : ""}`}>
        Nodes
      </button>
    </div>
  );
}

// Button responsible of show the create/edit the graph
function MutateGraph() {
  const {
    graph,
    showDashboard,
    setShowDashboard,
    path,
    setPath,
    showSolve,
    setShowSolve,
    setCurSnapshot,
  } = useContext(Context);

  // WARNING: this when the graph is taken by props
  // const [content, setContent] = useState("");
  // const initialRender = useRef(true);

  // useEffect(() => {
  //   // if (!initialRender.current) {
  //     // if (!abslouteEdges.length) setContent("Create Graph");
  //     // else setContent("Mutate Graph");
  //   // }
  //   // initialRender.current = false;
  // }, [abslouteEdges]);

  function handleShowDashboard() {
    if (!showDashboard) {
      setShowDashboard(true);
    }
  }

  function handleShowSolve() {
    if (!showSolve) {
      setShowSolve(true);
    }
  }

  function handleClearPath() {
    if (!path.length) return;
    setPath([]);
    // Navigate to snapshot 0 when the user currently in any snapshot
    setCurSnapshot(0);
  }

  return (
    <div className="mutate-graph">
      <button
        onClick={handleShowDashboard}
        disabled={showDashboard || showSolve}
      >
        {/* {content} */}
        {!Object.keys(graph).length ? "Create graph" : "Modify graph"}
      </button>
      <button
        className="traversal-btn"
        onClick={handleShowSolve}
        disabled={showDashboard || showSolve}
      >
        Traversal
      </button>
      <button
        className="clear-btn"
        onClick={handleClearPath}
        disabled={showDashboard || !path.length}
      >
        Clear path
      </button>
    </div>
  );
}

Graph.Presentation = Presentation;
Graph.NodesList = NodesList;
Graph.GraphFilter = GraphFilter;
Graph.MutateGraph = MutateGraph;

export default Graph;
