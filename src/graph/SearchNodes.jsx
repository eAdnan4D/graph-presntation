import { useContext } from "react";
import { Context } from "./Graph";

// Resbonsible about searching for edges in the nodes list
function SearchNodes({ dis = false, setSearch, search }) {
  const { isSolving } = useContext(Context);

  function sanitize(e) {
    if (/\w/.test(e.target.value[e.target.value.length - 1])) {
      setSearch(e.target.value);
    }
  }

  return (
    <div className="search-nodes">
      <label htmlFor="search-relations">Search for node</label>
      <input
        disabled={dis || isSolving}
        id="search-relations"
        type="text"
        name="search-relations"
        value={search}
        onChange={sanitize}
        placeholder="Search for nodes by name"
      />
    </div>
  );
}

export default SearchNodes;
