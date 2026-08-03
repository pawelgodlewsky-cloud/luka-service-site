"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    code: "DIA",
    title: "Diagnostyka",
    text: "Od kontrolek i trudnego rozruchu po ABS/SRS, kluczyki i zawieszenie pneumatyczne.",
    href: "#diagnostyka",
  },
  {
    code: "SER",
    title: "Obsługa serwisowa",
    text: "Hamulce, filtry, DPF, rozrząd, zawieszenie, płyny i codzienna eksploatacja auta.",
    href: "#obsluga-serwisowa",
  },
  {
    code: "MECH",
    title: "Mechanika i silnik",
    text: "Naprawy silnika, chłodzenia, wydechu, układu kierowniczego i elementów napędu.",
    href: "#mechanika",
  },
  {
    code: "MOB",
    title: "Pomoc mobilna",
    text: "Samochód nie odpala? Po kontakcie sprawdzimy, czy możemy pomóc na miejscu.",
    href: "#kontakt",
  },
];

const serviceGroups = [
  {
    id: "diagnostyka",
    title: "Diagnostyka",
    intro: "Precyzyjne rozpoznanie problemu przed decyzją o naprawie.",
    items: [
      "Diagnostyka komputerowa",
      "Naprawa sterowników ABS",
      "Resetowanie modułów SRS po wypadku",
      "Programowanie kluczyków z chipem",
      "Naprawa ogrzewania postojowego",
      "Kasowanie inspekcji serwisowej",
      "Diagnostyka zawieszenia pneumatycznego i hydraulicznego",
      "Naprawa bloków zaworowych oraz sterowników zawieszenia",
      "Adaptacja modułów i czujników",
      "Kodowanie i programowanie sterowników",
      "Diagnostyka auta przed zakupem",
    ],
  },
  {
    id: "obsluga-serwisowa",
    title: "Obsługa serwisowa",
    intro: "Bieżący serwis, układy bezpieczeństwa i wymiana zużytych podzespołów.",
    items: [
      "Wymiana klocków, tarcz, szczęk i elementów hamulca postojowego",
      "Wymiana filtrów kabinowych i paliwa",
      "Wymiana pompy paliwa oraz elementów układu zasilania",
      "Czyszczenie filtra DPF",
      "Wymiana świec, cewek zapłonowych i wtryskiwaczy",
      "Wymiana alternatora i rozrusznika",
      "Wymiana turbosprężarki",
      "Naprawy zawieszenia: łączniki, tuleje, sworznie, amortyzatory i sprężyny",
      "Wymiana przegubów i łożysk",
      "Wymiana paska wielorowkowego i rozrządu",
      "Wymiana chłodnicy silnika i skraplacza klimatyzacji",
      "Wymiana i regeneracja przekładni kierowniczej",
      "Wymiana pompy wspomagania",
      "Wymiana płynów eksploatacyjnych",
      "Wymiana oleju silnikowego, w skrzyni biegów i dyferencjałach",
      "Naprawa układu wydechowego",
      "Wymiana wału napędowego i krzyżaka",
      "Endoskopia silnika i pomiar kompresji",
      "Wymiana pompy wody i pompy wysokiego ciśnienia",
      "Naprawa przewodów hamulcowych i układu chłodzenia",
      "Wymiana poduszek silnika i intercoolera",
      "Wymiana uszczelek i uszczelniaczy silnika",
    ],
  },
  {
    id: "mechanika",
    title: "Mechanika ogólna",
    intro: "Naprawy mechaniczne i prace wymagające bezpiecznego demontażu elementów auta.",
    items: [
      "Wymiana zderzaka",
      "Demontaż i montaż drzwi",
      "Naprawa zamka drzwi",
      "Wymiana podnośnika szyby",
      "Wymiana nagrzewnicy",
      "Demontaż i montaż deski rozdzielczej",
      "Montaż osłony silnika",
      "Wymiana szyby czołowej",
    ],
  },
  {
    id: "naprawa-silnika",
    title: "Naprawa silnika",
    intro: "Od uszczelnień i rozrządu po kompleksowe naprawy jednostki napędowej.",
    items: [
      "Kapitalny remont silnika",
      "Wymiana uszczelki pod głowicą",
      "Wymiana uszczelki kolektora i miski olejowej",
      "Wymiana rozrządu - pasek lub łańcuch",
      "Wymiana uszczelniaczy zaworowych",
      "Regeneracja głowicy silnika",
      "Regulacja zaworów",
      "Wymiana tylnego uszczelniacza wału korbowego",
      "Regulacja naciągu łańcucha rozrządu",
    ],
  },
];

const faqs = [
  ["Czy poznam koszt przed naprawą?", "Tak. Po sprawdzeniu auta przedstawiamy zakres prac i wycenę. Dodatkowe prace wykonujemy dopiero po akceptacji."],
  ["Czy mechanik może przyjechać do auta?", "Tak, po wcześniejszym kontakcie. Najpierw ustalamy objawy i lokalizację, aby ocenić, czy naprawa na miejscu jest możliwa."],
  ["Jak przygotować się do wizyty?", "Wystarczy podać model auta, opisać objawy i powiedzieć, kiedy problem występuje. Jeśli masz wcześniejsze wyniki diagnostyki, zabierz je ze sobą."],
  ["Czy wykonujecie diagnostykę przed zakupem?", "Tak. Zakres sprawdzenia i termin ustalamy telefonicznie przed wizytą."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": "https://lukaservice.pl/#warsztat",
  name: "Luka Service",
  url: "https://lukaservice.pl/",
  telephone: "+48690266302",
  image: "https://lukaservice.pl/hero-workshop.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pianistów 10B",
    postalCode: "02-403",
    addressLocality: "Warszawa",
    addressCountry: "PL",
  },
  areaServed: ["Warszawa-Włochy", "Ursus", "Ochota"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Usługi Luka Service",
    itemListElement: services.slice(0, 3).map((service) => ({
      "@type": "OfferCatalog",
      name: service.title,
    })),
  },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handleHeroPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    heroRef.current.style.setProperty("--pointer-x", `${x * 8}px`);
    heroRef.current.style.setProperty("--pointer-y", `${y * 5}px`);
  };

  return (
    <>
      <a className="skip-link" href="#main">Przejdź do treści</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Luka Service - strona główna">
          <img className="brand__logo" src="/brand/luka-service-logo.png" alt="" width="900" height="270" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
        <nav id="main-menu" className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Główna nawigacja">
          <a href="#uslugi" onClick={() => setMenuOpen(false)}>Usługi</a>
          <a href="#jak-pracujemy" onClick={() => setMenuOpen(false)}>Jak pracujemy</a>
          <a href="#wycena" onClick={() => setMenuOpen(false)}>Wycena</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>Pytania</a>
          <a href="#kontakt" onClick={() => setMenuOpen(false)}>Kontakt</a>
        </nav>
        <a className="header-phone" href="tel:+48690266302">+48 690 266 302</a>
        <a className="button button--copper header-cta" href="#kontakt">Umów wizytę</a>
      </header>

      <main id="main">
        <section
          id="top"
          ref={heroRef}
          className="hero"
          onPointerMove={handleHeroPointer}
          onPointerLeave={() => {
            heroRef.current?.style.setProperty("--pointer-x", "0px");
            heroRef.current?.style.setProperty("--pointer-y", "0px");
          }}
        >
          <img
            className="hero__image"
            src="/hero-workshop.webp"
            alt="Mechanik sprawdzający rodzinny samochód w nowoczesnym warsztacie"
            width="2200"
            height="1467"
            fetchPriority="high"
          />
          <div className="hero__shade" />
          <div className="hero__content">
            <p className="eyebrow hero-sequence hero-sequence--1">Mechanik samochodowy • Warszawa-Włochy</p>
            <h1 className="hero-sequence hero-sequence--2">Najpierw diagnoza.<br /><em>Potem uczciwa naprawa.</em></h1>
            <p className="hero__lead hero-sequence hero-sequence--3">
              Sprawdzamy samochód, wyjaśniamy przyczynę i podajemy koszt. Naprawę zaczynamy dopiero po Twojej akceptacji.
            </p>
            <div className="hero__actions hero-sequence hero-sequence--4">
              <a className="button button--copper" href="tel:+48690266302">Zadzwoń i umów termin</a>
              <a className="button button--glass" href="#uslugi">Sprawdź usługi</a>
            </div>
            <p className="hero__promise hero-sequence hero-sequence--5"><i /> Bez dodatkowych prac bez zgody klienta</p>
          </div>
          <div className="service-rail" aria-hidden="true">
            <span>PROCES / DIAGNOZA</span><i /><b />
          </div>
          <a className="scroll-cue" href="#uslugi" aria-label="Przewiń do usług"><span>Przewiń</span><i /></a>
        </section>

        <section className="trust-strip" aria-label="Najważniejsze informacje">
          <div><span className="trust-strip__icon">✓</span><strong>Jasna wycena</strong><small>przed rozpoczęciem pracy</small></div>
          <div><span className="trust-strip__icon">◇</span><strong>Gwarancja</strong><small>na usługę i zastosowane części</small></div>
          <div><span className="trust-strip__icon">↗</span><strong>Pomoc mobilna</strong><small>po wcześniejszym kontakcie</small></div>
          <div><span className="trust-strip__icon">L</span><strong>Warszawa-Włochy</strong><small>Pianistów 10B</small></div>
        </section>

        <section id="uslugi" className="section services-section">
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow eyebrow--copper">Z czym możemy pomóc</p><h2>Usługi nazwane tak,<br />jak szuka ich kierowca.</h2></div>
            <p>Najpierw wybierz obszar. Pełny zakres każdej kategorii znajdziesz niżej - bez ukrywania usług i bez ściany drobnego tekstu na pierwszym ekranie.</p>
          </div>
          <div className="service-cards">
            {services.map((service, index) => (
              <a key={service.code} href={service.href} className={`service-card ${index === 0 ? "service-card--featured" : ""}`} data-reveal style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}>
                <span className="service-card__code">{service.code}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="service-card__link">Poznaj zakres <i>↗</i></span>
              </a>
            ))}
          </div>
        </section>

        <section id="jak-pracujemy" className="process-section">
          <div className="process-copy" data-reveal>
            <p className="eyebrow eyebrow--copper">Jak pracujemy</p>
            <h2>Jedna jasna ścieżka.<br />Od objawu do odbioru.</h2>
            <p>Porządek obsługi jest częścią usługi. Wiesz, co dzieje się z samochodem, zanim podejmiesz decyzję o naprawie.</p>
          </div>
          <div className="process-track" data-reveal>
            <span className="process-track__line"><i /></span>
            {[
              ["01", "Diagnoza", "Sprawdzamy objawy i szukamy przyczyny."],
              ["02", "Wycena", "Otrzymujesz zakres, koszt i możliwe warianty."],
              ["03", "Naprawa", "Zaczynamy dopiero po Twojej akceptacji."],
              ["04", "Kontrola", "Weryfikujemy efekt przed wydaniem auta."],
            ].map(([number, title, text]) => (
              <article key={number} className="process-step">
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="wycena" className="estimate-section">
          <div className="estimate-photo" data-reveal>
            <img src="/transparent-process.webp" alt="Mechanik omawiający z klientem zakres naprawy" width="1700" height="1133" loading="lazy" />
            <div className="estimate-photo__caption"><p className="eyebrow eyebrow--copper">Transparentność</p><h2>Pokazujemy, co znaleźliśmy i dlaczego proponujemy naprawę.</h2></div>
          </div>
          <div className="estimate-copy" data-reveal>
            <p className="eyebrow eyebrow--copper">Przykładowa wycena</p>
            <h2>Pełna informacja przed rozpoczęciem pracy.</h2>
            <p>Zamiast branżowego żargonu - konkret: co wymaga naprawy, co jest pilne, ile może potrwać praca i od czego zależy koszt.</p>
            <div className="estimate-card">
              <div className="estimate-card__head"><strong>Układ hamulcowy</strong><span>Do akceptacji</span></div>
              <div><span>Oględziny i dokumentacja</span><strong>w zakresie</strong></div>
              <div><span>Zalecane prace</span><strong>opisane osobno</strong></div>
              <div><span>Przewidywany termin</span><strong>po sprawdzeniu</strong></div>
              <div><span>Koszt</span><strong>przed naprawą</strong></div>
            </div>
            <ul className="estimate-promises">
              <li><span>01</span>Bez dodatkowych prac bez zgody</li>
              <li><span>02</span>Warianty części dopasowane do budżetu</li>
              <li><span>03</span>Kontrola i dokumentacja po naprawie</li>
            </ul>
          </div>
        </section>

        <section className="section full-offer" aria-labelledby="pelna-oferta">
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow eyebrow--copper">Pełna oferta</p><h2 id="pelna-oferta">Zachowujemy wszystkie usługi z pierwotnej strony.</h2></div>
            <p>Rozwijane kategorie utrzymują porządek na stronie, a jednocześnie dają Google i klientowi pełny obraz rzeczywistej oferty.</p>
          </div>
          <div className="offer-accordions">
            {serviceGroups.map((group, index) => (
              <details id={group.id} key={group.id} className="offer-group" data-reveal open={index === 0}>
                <summary>
                  <span className="offer-group__number">{String(index + 1).padStart(2, "0")}</span>
                  <span><strong>{group.title}</strong><small>{group.intro}</small></span>
                  <i aria-hidden="true">+</i>
                </summary>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </details>
            ))}
          </div>
        </section>

        <section id="faq" className="faq-section">
          <div data-reveal><p className="eyebrow eyebrow--copper">Przed wizytą</p><h2>Krótko i konkretnie.</h2></div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question} data-reveal>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="kontakt" className="contact-section">
          <div className="contact-copy" data-reveal>
            <a className="brand brand--light" href="#top" aria-label="Luka Service - wróć na górę">
              <img className="brand__logo" src="/brand/luka-service-logo-reverse.png" alt="" width="900" height="270" loading="lazy" />
            </a>
            <p className="eyebrow eyebrow--copper">Kontakt i lokalizacja</p>
            <h2>Opisz objawy.<br />My zaproponujemy kolejny krok.</h2>
            <p>Podaj model samochodu i powiedz, kiedy pojawia się problem. Ustalimy możliwy termin i właściwy zakres sprawdzenia auta.</p>
            <div className="contact-actions">
              <a className="button button--copper" href="tel:+48690266302">+48 690 266 302</a>
              <a className="button button--glass" href="https://www.google.com/maps/search/?api=1&query=Pianistów+10B+Warszawa" target="_blank" rel="noreferrer">Wyznacz trasę</a>
            </div>
            <dl className="contact-data">
              <div><dt>Warsztat</dt><dd>Pianistów 10B<br />02-403 Warszawa</dd></div>
              <div><dt>Dojazd mechanika</dt><dd>Po wcześniejszym kontakcie</dd></div>
            </dl>
          </div>
          <a className="map-panel" href="https://www.google.com/maps/search/?api=1&query=Pianistów+10B+Warszawa" target="_blank" rel="noreferrer" aria-label="Otwórz lokalizację Luka Service w Mapach Google" data-reveal>
            <span className="map-grid" /><span className="map-orbit" /><span className="map-pin"><i>L</i></span>
            <span className="map-label"><strong>Luka Service</strong><small>Warszawa-Włochy • Pianistów 10B</small></span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Luka Service</span>
        <span>Warszawa-Włochy • Pianistów 10B</span>
        <a href="tel:+48690266302">+48 690 266 302</a>
      </footer>

      <nav className="mobile-actions" aria-label="Szybki kontakt">
        <a href="tel:+48690266302">Zadzwoń</a><a href="#kontakt">Umów wizytę</a>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
