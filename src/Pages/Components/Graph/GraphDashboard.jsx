import { useContext, useEffect, useRef, useState } from "react";
import GraphDashboardBody from "./GraphDashboardBody";
import GraphDashboardHeader from "./GraphDashboardHeader";
import { Context } from "../../Parents/Graph";

// Really graph dashboard
function GraphDashboard() {
  const { setShowDashboard } = useContext(Context);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  function handleSearch(e) {
    if (/\w/.test(e.target.value[e.target.value.length - 1])) {
      setSearch(e.target.value);
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add("show-dashboard");
    }
  }, []);

  // Rise the dashboard then delete it
  function closeDashboar() {
    if (ref.current) {
      ref.current.classList.remove("show-dashboard");
      const timer = setTimeout(() => {
        setShowDashboard(!setShowDashboard);
        clearTimeout(timer);
      }, 1000);
    }
  }

  return (
    <div ref={ref} className={`graph-dashboard`}>
      <GraphDashboardHeader
        onClose={closeDashboar}
        onType={handleSearch}
        search={search}
      />
      <GraphDashboardBody filter={search} />
    </div>
  );
}

export default GraphDashboard;
