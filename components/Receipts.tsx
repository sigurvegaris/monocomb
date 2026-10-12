// Placeholder until real client results are ready.
const RECEIPTS = [
  { figure: "+00%", label: "Online bookings after relaunch" },
  { figure: "0.0s", label: "Page load, down from 0.0s" },
  { figure: "“…”", label: "A short quote from a happy client" },
];

export default function Receipts() {
  return (
    <section className="wrap band" id="receipts">
      <div className="section-head flush">
        <span className="mono">Receipts</span>
        <h2>Results from real clients.</h2>
        <p>Client results are on the way.</p>
      </div>
      <div className="receipts">
        {RECEIPTS.map((r) => (
          <div className="receipt" key={r.label}>
            <b>{r.figure}</b>
            <span>{r.label}</span>
            <span className="mono">Client name</span>
          </div>
        ))}
      </div>
    </section>
  );
}
