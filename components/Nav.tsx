export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap top">
        <a className="word" href="#hero">
          mono<i>comb</i>
        </a>
        <nav className="nav-links" aria-label="Main">
          <a href="#how">How it works</a>
          <a href="#paths">Services</a>
          <a href="#strands">Strands</a>
          <a href="#receipts">Work</a>
        </nav>
        <div className="nav-right">
          <a className="cta" href="#call">
            Book a 15-min call
          </a>
        </div>
      </div>
    </header>
  );
}
