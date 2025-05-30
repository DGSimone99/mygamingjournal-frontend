function StatCard({ label, value, icon }) {
  return (
    <div className="bg-primary p-3 rounded-3 text-center border border-secondary shadow-sm flex-fill pointer-card">
      <div className="fs-4 mb-2 text-primary">{icon}</div>
      <h5>{value}</h5>
      <p className="mb-0">{label}</p>
    </div>
  );
}

export default StatCard;
