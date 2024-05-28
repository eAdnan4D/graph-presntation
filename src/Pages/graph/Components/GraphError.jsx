// Graph error message
function GraphError({ children, additionalStyle }) {
  return (
    <h3 style={additionalStyle} className="graph-err">
      {children}
    </h3>
  );
}

export default GraphError;
