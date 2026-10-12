const PATHS = [
  {
    label: "Starting fresh",
    title: "I don't have a site yet.",
    points: [
      "A site built around what you sell",
      "Booking, ordering, or contact that just works",
      "Set up to be found on Google from day one",
    ],
    cta: "Start from scratch",
  },
  {
    label: "Comb it out",
    title: "My site is a mess.",
    points: [
      "We keep what works and rebuild what doesn't",
      "Faster, cleaner, and easy to update yourself",
      "Automations take the busywork off your plate",
    ],
    cta: "Fix my site",
  },
];

export default function Paths() {
  return (
    <section className="wrap band" id="paths">
      <div className="section-head flush">
        <span className="mono">Two ways in</span>
        <h2>
          Where are you <em>starting?</em>
        </h2>
      </div>
      <div className="paths">
        {PATHS.map((p) => (
          <article className="path" key={p.label}>
            <span className="mono">{p.label}</span>
            <h3>{p.title}</h3>
            <ul>
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <a className="cta" href="#call">
              {p.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
