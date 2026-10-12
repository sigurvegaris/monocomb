"use client";

import { useState } from "react";

const EMAIL = "hello@monocomb.com";

export default function Close() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <section className="wrap band" id="call">
      <div className="close">
        <div>
          <span className="mono">Let&apos;s get to work</span>
          <h2>
            Let&apos;s comb it <em>out.</em>
          </h2>
          <p className="close-copy">
            Book a 15-minute call. Tell us what&apos;s tangled and we&apos;ll tell you what we&apos;d do. No
            pressure.
          </p>
          <div className="close-row">
            <a className="cta" href={`mailto:${EMAIL}?subject=15-minute%20call`}>
              Email to book
            </a>
            <button className="ghost" type="button" onClick={copy}>
              {copied ? "Copied" : "Copy email"}
            </button>
            <span className="mail">{EMAIL}</span>
          </div>
        </div>
        {/* Victor's hand-drawn comb character goes here. */}
        <div className="mascot-slot">Comb character goes here</div>
      </div>
    </section>
  );
}
