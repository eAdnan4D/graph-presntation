function PrevSnapshot({ handleSnapshot, dis = false }) {
  return (
    <button className="snapshot" onClick={handleSnapshot} disabled={dis}>
      &lt;
    </button>
  );
}

export default PrevSnapshot;
