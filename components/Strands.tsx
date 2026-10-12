"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Vibe = "calm" | "bold" | "playful" | "luxe";
const VIBES: Vibe[] = ["calm", "bold", "playful", "luxe"];

function BakeryNav() {
  const LINKS = [
    ["Bread", "Fresh out of the oven at 7am.", "Sourdough, rye, and a rotating loaf of the week."],
    ["Pastry", "Pastries that go before noon.", "Order ahead and we'll hold a box with your name."],
    ["Visit", "Find us on Elm Street.", "Open Tuesday to Sunday, 7am to 3pm."],
  ];
  const [active, setActive] = useState(0);
  const [ind, setInd] = useState({ left: 0, width: 0 });
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const b = refs.current[active];
      const ul = listRef.current;
      if (!b || !ul) return;
      const r = b.getBoundingClientRect();
      setInd({ left: r.left - ul.getBoundingClientRect().left, width: r.width });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <div className="nav-demo">
      <nav>
        <span className="logo">Crumb &amp; Co.</span>
        <ul ref={listRef}>
          {LINKS.map(([label], i) => (
            <li key={label}>
              <button type="button" ref={(el) => void (refs.current[i] = el)} onClick={() => setActive(i)}>
                {label}
              </button>
            </li>
          ))}
          <span className="ind" style={ind} />
        </ul>
      </nav>
      <div className="body">
        {LINKS[active][1]}
        <small>{LINKS[active][2]}</small>
      </div>
    </div>
  );
}

function Candle() {
  const SCENTS = [
    { color: "#d9c7b0", name: "Cedar Hour", notes: "Cedarwood, smoke, a little vanilla.", price: "$34" },
    { color: "#8fa58a", name: "Fig Leaf", notes: "Green fig, crushed leaves, cream.", price: "$36" },
    { color: "#7a4a63", name: "Late Plum", notes: "Dark plum, clove, amber.", price: "$38" },
  ];
  const [i, setI] = useState(0);
  const s = SCENTS[i];
  return (
    <div className="candle">
      <div className="jar" style={{ background: s.color }} />
      <div>
        <h4>{s.name}</h4>
        <p>{s.notes}</p>
        <div className="swatches">
          {SCENTS.map((x, k) => (
            <button
              key={x.name}
              className="sw"
              type="button"
              aria-pressed={k === i}
              aria-label={x.name}
              style={{ background: x.color }}
              onClick={() => setI(k)}
            />
          ))}
        </div>
        <div className="price">{s.price} · 8 oz · 50 hr burn</div>
      </div>
    </div>
  );
}

function Booking() {
  const DAYS: [string, number][] = [
    ["Tue", 14],
    ["Wed", 15],
    ["Thu", 16],
    ["Fri", 17],
    ["Sat", 18],
  ];
  const TIMES = ["10:00", "11:30", "1:00", "2:30", "4:00", "5:30"];
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<number | null>(null);
  return (
    <>
      <div className="days">
        {DAYS.map(([d, n], i) => (
          <button
            key={d}
            type="button"
            className="day"
            aria-pressed={i === day}
            onClick={() => {
              setDay(i);
              setSlot(null);
            }}
          >
            <span>{d}</span>
            <b>{n}</b>
          </button>
        ))}
      </div>
      <div className="slots">
        {TIMES.map((t, i) => (
          <button
            key={t}
            type="button"
            className="slot"
            aria-pressed={i === slot}
            disabled={(i * 7 + day * 3) % 5 === 0}
            onClick={() => setSlot(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="confirm">
        {slot === null
          ? "Pick a time with Dre."
          : `Booked: ${DAYS[day][0]} Oct ${DAYS[day][1]} at ${TIMES[slot]} with Dre. See you then.`}
      </div>
    </>
  );
}

function Menu() {
  const ITEMS: [string, string[], string][] = [
    ["Charred leeks, romesco", ["v"], "$12"],
    ["Grilled hanger steak", ["gf"], "$29"],
    ["Crispy potatoes, aioli", ["v", "gf"], "$9"],
    ["Fried chicken sandwich", [], "$16"],
    ["Ricotta gnocchi, brown butter", ["v"], "$21"],
  ];
  const FILTERS = [
    ["all", "Everything"],
    ["v", "Vegetarian"],
    ["gf", "Gluten free"],
  ];
  const [f, setF] = useState("all");
  return (
    <>
      <div className="filters diet" role="group" aria-label="Diet filter">
        {FILTERS.map(([k, label]) => (
          <button key={k} className="chip" type="button" aria-pressed={f === k} onClick={() => setF(k)}>
            {label}
          </button>
        ))}
      </div>
      <ul className="menu-list">
        {ITEMS.map(([name, tags, price]) => (
          <li key={name} className={f !== "all" && !tags.includes(f) ? "off" : undefined}>
            <span>
              {name}
              {tags.length > 0 && <span className="tags">{tags.map((t) => t.toUpperCase()).join(" · ")}</span>}
            </span>
            <span>{price}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function BeforeAfter() {
  const [v, setV] = useState(50);
  return (
    <>
      <div className="ba">
        <div className="pane after">
          <h5>Green Hollow Landscaping</h5>
          <p>Design, build, and care for gardens that last.</p>
        </div>
        <div className="pane before" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>
          <h5>WELCOME TO OUR WEBSITE!!!</h5>
          <p>click here for services (under construction)</p>
        </div>
        <div className="handle" style={{ left: `${v}%` }} />
      </div>
      <label className="mono ba-label" htmlFor="baRange">
        Drag to compare
      </label>
      <input id="baRange" type="range" min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)} />
    </>
  );
}

const STRANDS: { name: string; title: string; kind: string; vibes: Vibe[]; blurb: string; demo: ReactNode }[] = [
  { name: "Bakery navigation", title: "Bakery navigation", kind: "Nav · Calm", vibes: ["calm", "playful"], blurb: "Warm, simple, gets people to the counter.", demo: <BakeryNav /> },
  { name: "Candle product showcase", title: "Product showcase", kind: "Shop · Luxe", vibes: ["luxe", "calm"], blurb: "Lets the product be the hero.", demo: <Candle /> },
  { name: "Barber booking", title: "Barber booking", kind: "Booking · Bold", vibes: ["bold", "playful"], blurb: "Two taps from “I need a cut” to booked.", demo: <Booking /> },
  { name: "Restaurant menu with filters", title: "Menu with filters", kind: "Menu · Calm", vibes: ["calm"], blurb: "Guests find their dish without asking.", demo: <Menu /> },
  { name: "Before / after reveal", title: "Before / after reveal", kind: "Case study · Bold", vibes: ["bold", "luxe"], blurb: "Shows the transformation in one gesture.", demo: <BeforeAfter /> },
];

export default function Strands() {
  const [vibe, setVibe] = useState<Vibe | "all">("all");
  const [picked, setPicked] = useState<string[]>([]);
  const [briefOpen, setBriefOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggle = (name: string) =>
    setPicked((p) => (p.includes(name) ? p.filter((n) => n !== name) : [...p, name]));

  const brief = `Hi Victor,\n\nI'd like a website that feels clean and easy to use. These are the strands I liked on your site:\n\n${picked
    .map((n) => "• " + n)
    .join("\n")}\n\nAbout my business:\n\nWhat's messy about my current site (if I have one):\n`;

  function copyBrief() {
    navigator.clipboard.writeText(brief).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <>
      <main className="wrap band" id="strands">
        <div className="section-head flush">
          <span className="mono">The strands</span>
          <h2>
            Pick the pieces that feel like <em>you.</em>
          </h2>
          <p>
            Every strand is a live piece of a website, not a screenshot. Play with them, add the ones you like to your
            comb, and send the collection as the start of your brief.
          </p>
        </div>
        <div className="filters" role="group" aria-label="Filter by vibe">
          {(["all", ...VIBES] as const).map((v) => (
            <button key={v} className="chip" type="button" aria-pressed={vibe === v} onClick={() => setVibe(v)}>
              {v === "all" ? "All" : v[0].toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid">
          {STRANDS.map((s) => {
            const on = picked.includes(s.name);
            return (
              <article className="strand" key={s.name} hidden={vibe !== "all" && !s.vibes.includes(vibe)}>
                <div className="strand-head">
                  <h3>{s.title}</h3>
                  <span className="mono">{s.kind}</span>
                </div>
                <div className="stage">{s.demo}</div>
                <div className="strand-foot">
                  <p>{s.blurb}</p>
                  <button className="add" type="button" aria-pressed={on} onClick={() => toggle(s.name)}>
                    {on ? "In your comb" : "Add to my comb"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <div className={`tray${picked.length ? " show" : ""}`} aria-live="polite">
        <div className="tray-in">
          <span className="mono">Your comb · {picked.length}</span>
          <span className="tray-list">{picked.join(", ")}</span>
          <button type="button" onClick={() => setBriefOpen((o) => !o)}>
            Turn into a brief
          </button>
          <div className={`brief${briefOpen && picked.length ? " open" : ""}`}>
            <pre>{brief}</pre>
            <div className="brief-actions">
              <button type="button" onClick={copyBrief}>
                {copied ? "Copied" : "Copy brief"}
              </button>
              <a href={`mailto:hello@monocomb.com?subject=My%20comb&body=${encodeURIComponent(brief)}`}>
                Email it to hello@monocomb.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
