function NextSnapshot({ handleSnapshot, dis = false }) {
  return (
    <button className="snapshot" onClick={handleSnapshot} disabled={dis}>
      &gt;
    </button>
  );
}

export default NextSnapshot;
