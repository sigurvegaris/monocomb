"use client";

import { useEffect, useState } from "react";

const STEPS = [
  {
    name: "Tangle",
    copy: "We look at everything that's bugging you and your customers: slow pages, broken mobile, the booking thing, the logo situation.",
  },
  {
    name: "Comb",
    copy: "We pick the strands that fit your business and design a site that feels like you, then build it on a solid backend.",
  },
  {
    name: "Launch",
    copy: "Fast, accessible, and found on search. We check it on every screen before it goes live.",
  },
  {
    name: "Keep tidy",
    copy: "Automations handle the busywork after launch: bookings, backups, updates, and reminders.",
  },
];

const ISSUES = [
  ["Speed", "Homepage takes 7 seconds to load on a phone"],
  ["Mobile", "Menu button covers the phone number"],
  ["Booking", "Customers DM on Instagram to book"],
  ["Content", "Last updated 2021, three old prices"],
  ["Search", "Doesn't show up for “barber near me”"],
];

const SCORES = [
  ["98", "Performance"],
  ["100", "Accessibility"],
  ["100", "SEO"],
  ["1.1s", "Load on 4G"],
];

const LOG = [
  ["09:02", "New booking → added to calendar, text sent"],
  ["12:00", "Menu price updated from spreadsheet"],
  ["18:30", "Reminder texts for tomorrow (6)"],
  ["02:00", "Nightly backup"],
  ["Mon", "Weekly report → owner's inbox"],
];

function Panel({ step }: { step: number }) {
  if (step === 0)
    return ISSUES.map(([tag, text]) => (
      <div className="issue" key={tag}>
        <span className="tag">{tag}</span>
        <span>{text}</span>
      </div>
    ));
  if (step === 1)
    return (
      <>
        <div className="wire">
          <div className="w6" />
          <div className="w4" />
          <div className="w2" />
          <div className="w3" />
          <div className="w3" />
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} />
          ))}
        </div>
        <p className="wire-note">Strands chosen: Barber booking, Before / after reveal, Bakery-style nav.</p>
      </>
    );
  if (step === 2)
    return (
      <>
        <div className="browser">
          <div className="browser-bar">
            <span className="live" />
            yourbusiness.com · live
          </div>
          <div className="scores">
            {SCORES.map(([v, l]) => (
              <div className="score" key={l}>
                <b>{v}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="wire-note">Sample targets, not a real client.</p>
      </>
    );
  return (
    <div className="log">
      {LOG.map(([t, text]) => (
        <div key={text}>
          <time>{t}</time>
          <span>{text}</span>
          <span className="ok">done</span>
        </div>
      ))}
    </div>
  );
}

export default function HowItWorks() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 4200);
    return () => clearInterval(id);
  }, [paused, step]);

  return (
    <section className="wrap band no-rule" id="how">
      <div className="how">
        <div>
          <span className="mono">How it works</span>
          <h2 className="how-title">
            From tangled to <em>tidy</em>, and it stays that way.
          </h2>
          <ol className="steps" role="tablist">
            {STEPS.map((s, i) => (
              <li key={s.name}>
                <button type="button" role="tab" aria-selected={i === step} onClick={() => setStep(i)}>
                  <span className="n">
                    0{i + 1} / 0{STEPS.length}
                  </span>
                  <b>{s.name}</b>
                  <span className="d">{s.copy}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="how-stage" aria-live="polite">
          <div className="how-bar">
            <span className="mono">
              Step 0{step + 1} · {STEPS[step].name}
            </span>
            <button className="ghost" type="button" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
              {paused ? "Play" : "Pause"}
            </button>
          </div>
          <div className="how-panel on" key={step}>
            <Panel step={step} />
          </div>
        </div>
      </div>
    </section>
  );
}
