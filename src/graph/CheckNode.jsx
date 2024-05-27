import { useContext } from "react";
import { Context } from "./Graph";

function CheckNode({ node, dis, onCheck, val }) {
  const { isSolving } = useContext(Context);
  function handleCheck(e) {
    if (e.target.checked) {
      onCheck(function (state) {
        return { ...state, [node]: 1 };
      });
    } else {
      onCheck(function (state) {
        const keys = [];
        // Make the output "a": 1 ...etc
        Object.keys(state).forEach((val) => {
          val != node ? keys.push([val, 1]) : null;
        });
        // [["a", 1], ["v", 2]] => {a: 1, v: 2}
        return Object.fromEntries(keys);
      });
    }
  }

  return (
    <div>
      <label htmlFor={`check-${node}`}>Node {node}</label>
      <input
        type="checkbox"
        onChange={handleCheck}
        name={`check-${node}`}
        id={`check-${node}`}
        disabled={dis || isSolving}
        value={val}
      />
    </div>
  );
}

export default CheckNode;
