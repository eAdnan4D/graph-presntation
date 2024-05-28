import { useContext } from "react";
import { Context } from "../Graph";

function SolveBtn({ parentRef, wantedNodes, start }) {
  const { solveFn, setPath, isSolving, setIsSolving, setShowSolve } =
    useContext(Context);
  const nodes = Object.keys(wantedNodes);

  async function handleSolve() {
    setIsSolving(true);
    const path = await solveFn();
    setIsSolving(false);
    setPath(path);

    if (parentRef.current) {
      parentRef.current.classList.remove("show-dashboard");
    }

    const timer = setTimeout(() => {
      setShowSolve(false); // Rise the solve interface
      clearTimeout(timer);
    }, 1000);
  }

  return (
    <div className="solve-btn-container">
      <button
        onClick={handleSolve}
        className="solve-btn"
        disabled={!nodes.length || isSolving}
      >
        Find shortest path
      </button>
      ;
    </div>
  );
}

export default SolveBtn;
