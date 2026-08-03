"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    code: "DIA",
    title: "Diagnostyka i sprawdzenie auta",
    text: "Kontrolka na desce, trudny rozruch, nierówna praca albo zakup używanego auta. Zaczynamy od sprawdzenia przyczyny, nie od wymiany części w ciemno.",
    href: "#diagnostyka",
  },
  {
    code: "SER",
    title: "Serwis i części eksploatacyjne",
    text: "Olej, filtry, płyny, hamulce, zawieszenie, rozrząd i DPF. Wykonujemy bieżący serwis oraz naprawy wynikające ze zużycia podzespołów.",
    href: "#obsluga-serwisowa",
  },
  {
    code: "MECH",
    title: "Mechanika i naprawa silnika",
    text: "Usuwamy usterki silnika, układu chłodzenia, wydechu, kierowniczego i napędu. Zakres prac dobieramy do stanu samochodu i ustalonej przyczyny.",
    href: "#mechanika",
  },
  {
    code: "MOB",
    title: "Pomoc z dojazdem",
    text: "Samochód nie odpala lub nie może bezpiecznie dojechać do warsztatu? Zadzwoń. Po krótkiej rozmowie ocenimy, czy możemy pomóc na miejscu.",
    href: "#kontakt",
  },
];

const commonRepairs = [
  {
    title: "Naprawa silnika i rozrządu",
    text: "Nierówna praca, wyciek oleju, przegrzewanie lub spadek mocy wymagają sprawdzenia, zanim zacznie się naprawa. Zajmujemy się między innymi rozrządem, uszczelnieniami, głowicą i remontami silnika.",
    href: "#naprawa-silnika",
  },
  {
    title: "Hamulce i elementy bezpieczeństwa",
    text: "Piszczenie, drgania kierownicy przy hamowaniu, dłuższa droga hamowania lub kontrolka to sygnały, których nie warto odkładać. Sprawdzamy układ i wymieniamy zużyte klocki, tarcze, szczęki oraz elementy hamulca postojowego.",
    href: "#obsluga-serwisowa",
  },
  {
    title: "Zawieszenie i układ kierowniczy",
    text: "Stuki na nierównościach, luzy i niepewne prowadzenie auta mogą mieć różne przyczyny. Sprawdzamy zawieszenie i układ kierowniczy, a następnie wskazujemy elementy, które faktycznie wymagają wymiany.",
    href: "#obsluga-serwisowa",
  },
  {
    title: "Olej, filtry i płyny eksploatacyjne",
    text: "Dobieramy olej i materiały do konkretnego samochodu. Wymieniamy olej silnikowy, filtry i płyny, a także olej w skrzyni biegów oraz dyferencjałach.",
    href: "#obsluga-serwisowa",
  },
  {
    title: "DPF, układ wydechowy i turbina",
    text: "Spadek mocy, dymienie i częste komunikaty o filtrze DPF mogą mieć kilka źródeł. Sprawdzamy układ przed podjęciem decyzji o czyszczeniu DPF, naprawie wydechu lub wymianie turbosprężarki.",
    href: "#obsluga-serwisowa",
  },
  {
    title: "Sprawdzenie samochodu przed zakupem",
    text: "Przed zakupem pomagamy ocenić stan samochodu i wychwycić usterki, które mogą oznaczać dodatkowe wydatki. Zakres sprawdzenia ustalamy przed wizytą.",
    href: "#diagnostyka",
  },
];

const serviceGroups = [
  {
    id: "diagnostyka",
    title: "Diagnostyka samochodowa",
    intro: "Sprawdzenie objawów i podzespołów przed ustaleniem zakresu naprawy.",
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
    title: "Serwis i naprawy eksploatacyjne",
    intro: "Bieżąca obsługa auta, układy bezpieczeństwa i wymiana zużytych części.",
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
    intro: "Naprawy mechaniczne oraz demontaż i montaż elementów samochodu.",
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
    intro: "Uszczelnienia, rozrząd, głowica i kompleksowe naprawy jednostki napędowej.",
    items: [
      "Kapitalny remont silnika",
      "Wymiana uszczelki pod głowicą",
      "Wymiana uszczelki kolektora i miski olejowej",
      "Wymiana rozrządu: pasek lub łańcuch",
      "Wymiana uszczelniaczy zaworowych",
      "Regeneracja głowicy silnika",
      "Regulacja zaworów",
      "Wymiana tylnego uszczelniacza wału korbowego",
      "Regulacja naciągu łańcucha rozrządu",
    ],
  },
];

const faqs = [
  ["Czy poznam koszt przed rozpoczęciem naprawy?", "Tak. Najpierw sprawdzamy samochód, a potem omawiamy przyczynę usterki, potrzebne części, zakres pracy i przewidywany koszt. Naprawę rozpoczynamy po Twojej akceptacji."],
  ["Czy można wycenić naprawę przez telefon?", "Przez telefon możemy wstępnie ustalić, czego dotyczy problem i jaki powinien być pierwszy krok. Dokładna wycena jest możliwa po sprawdzeniu auta, ponieważ podobne objawy mogą mieć różne przyczyny."],
  ["Co się dzieje, jeśli podczas naprawy wyjdzie dodatkowa usterka?", "Zatrzymujemy prace i kontaktujemy się z Tobą. Wyjaśniamy, co zostało wykryte, podajemy koszt i czekamy na decyzję. Nie rozszerzamy zlecenia bez zgody."],
  ["Czy mechanik może przyjechać do samochodu?", "Taką możliwość ustalamy indywidualnie. Podczas rozmowy pytamy o objawy, model auta i lokalizację. Na tej podstawie oceniamy, czy możemy pomóc na miejscu, czy samochód powinien trafić do warsztatu."],
  ["Jak przygotować się do wizyty w warsztacie?", "Podaj markę, model, rocznik i silnik samochodu. Opisz, kiedy pojawia się problem, czy auto było ostatnio naprawiane i jakie kontrolki się świecą. Jeśli masz wyniki wcześniejszej diagnostyki lub historię serwisową, zabierz je ze sobą."],
  ["Czy sprawdzacie samochody przed zakupem?", "Tak. Pomagamy ocenić stan auta i wskazujemy usterki, które mogą wymagać dalszej diagnostyki lub naprawy. Zakres sprawdzenia oraz termin ustalamy telefonicznie przed wizytą."],
  ["Czy trzeba wcześniej umówić wizytę?", "Najlepiej zadzwonić przed przyjazdem. Dzięki temu możemy zebrać podstawowe informacje o samochodzie, zaplanować czas na sprawdzenie i podać najbliższy możliwy termin."],
  ["Czy obsługujecie kierowców z Ursusa i Ochoty?", "Tak. Warsztat znajduje się przy ul. Pianistów 10B na warszawskich Włochach. Dojeżdżają do nas również kierowcy z Ursusa, Ochoty i pobliskich dzielnic."],
  ["Kiedy warto sprawdzić rozrząd?", "Rozrząd należy kontrolować zgodnie z zaleceniami producenta. Umów sprawdzenie także wtedy, gdy nie znasz historii serwisowej auta, słyszysz niepokojące odgłosy albo zbliża się termin lub przebieg przewidziany do wymiany."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": "https://lukaservice.pl/#warsztat",
  name: "Luka Service",
  url: "https://lukaservice.pl/",
  telephone: "+48690266302",
  image: "https://lukaservice.pl/hero-workshop.webp",
  description: "Luka Service to warsztat samochodowy na warszawskich Włochach. Wykonujemy diagnostykę, serwis okresowy, naprawy mechaniczne i naprawy silnika. Zakres prac i koszt ustalamy przed naprawą.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pianistów 10B",
    postalCode: "02-403",
    addressLocality: "Warszawa",
    addressRegion: "mazowieckie",
    addressCountry: "PL",
  },
  areaServed: ["Warszawa", "Warszawa-Włochy", "Ursus", "Ochota"].map((name) => ({
    "@type": "Place",
    name,
  })),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+48690266302",
    contactType: "rezerwacja wizyty",
    areaServed: "PL",
    availableLanguage: "pl",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Usługi Luka Service",
    itemListElement: commonRepairs.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        serviceType: service.title,
        areaServed: "Warszawa",
      },
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
            <p className="eyebrow hero-sequence hero-sequence--1">Luka Service • Warszawa, ul. Pianistów 10B</p>
            <h1 className="hero-sequence hero-sequence--2"><span>Mechanik samochodowy na warszawskich Włochach</span>Najpierw sprawdzamy.<br /><em>Potem naprawiamy.</em></h1>
            <p className="hero__lead hero-sequence hero-sequence--3">
              Powiedz, co dzieje się z autem. Sprawdzimy przyczynę, omówimy potrzebne prace i podamy koszt. Zaczniemy po Twojej akceptacji.
            </p>
            <div className="hero__actions hero-sequence hero-sequence--4">
              <a className="button button--copper" href="tel:+48690266302">Zadzwoń i umów termin</a>
              <a className="button button--glass" href="#uslugi">Sprawdź usługi</a>
            </div>
            <p className="hero__promise hero-sequence hero-sequence--5"><i /> Nie doliczamy dodatkowych prac bez kontaktu</p>
          </div>
          <div className="service-rail" aria-hidden="true">
            <span>PROCES / DIAGNOZA</span><i /><b />
          </div>
          <a className="scroll-cue" href="#uslugi" aria-label="Przewiń do usług"><span>Przewiń</span><i /></a>
        </section>

        <section className="trust-strip" aria-label="Najważniejsze informacje">
          <div><span className="trust-strip__icon">✓</span><strong>Koszt do akceptacji</strong><small>zanim rozpoczniemy naprawę</small></div>
          <div><span className="trust-strip__icon">◇</span><strong>Gwarancja</strong><small>na wykonaną usługę i części</small></div>
          <div><span className="trust-strip__icon">↗</span><strong>Pomoc z dojazdem</strong><small>dostępność ustalamy telefonicznie</small></div>
          <div><span className="trust-strip__icon">L</span><strong>Warszawa Włochy</strong><small>ul. Pianistów 10B</small></div>
        </section>

        <section className="section local-intro" aria-labelledby="warsztat-wlochy">
          <div className="local-intro__copy" data-reveal>
            <p className="eyebrow eyebrow--copper">Warsztat samochodowy na warszawskich Włochach</p>
            <h2 id="warsztat-wlochy">Serwis i naprawy samochodów przy ul. Pianistów.</h2>
            <p>
              W Luka Service zajmujemy się codziennymi sprawami, takimi jak wymiana oleju, filtrów, hamulców i elementów zawieszenia. Wykonujemy też diagnostykę samochodową, naprawy silnika, rozrządu, układu chłodzenia, wydechu i napędu.
            </p>
            <p>
              Warsztat znajduje się przy ul. Pianistów 10B na warszawskich Włochach, blisko Ursusa i Ochoty. Gdy samochód nie odpala, zadzwoń i opisz sytuację. Powiemy, czy możemy dojechać i pomóc na miejscu.
            </p>
          </div>
          <dl className="local-intro__facts" data-reveal>
            <div><dt>Adres warsztatu</dt><dd>Pianistów 10B<br />02-403 Warszawa</dd></div>
            <div><dt>Jak zaczynamy</dt><dd>Od rozmowy, sprawdzenia auta i ustalenia kosztu</dd></div>
            <div><dt>Skąd do nas dojedziesz</dt><dd>Warszawa Włochy, Ursus, Ochota i okolice</dd></div>
            <div><dt>Kontakt</dt><dd><a href="tel:+48690266302">+48 690 266 302</a></dd></div>
          </dl>
        </section>

        <section id="uslugi" className="section services-section">
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow eyebrow--copper">Zakres usług</p><h2>W czym możemy pomóc?</h2></div>
            <p>Wybierz rodzaj usługi, żeby przejść do szczegółowego zakresu prac. Jeśli nie wiesz, do której kategorii pasuje usterka, zadzwoń i opisz objawy.</p>
          </div>
          <div className="service-cards">
            {services.map((service, index) => (
              <a key={service.code} href={service.href} className="service-card" data-reveal style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}>
                <span className="service-card__code">{service.code}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="service-card__link">Zobacz zakres <i>↗</i></span>
              </a>
            ))}
          </div>
        </section>

        <section className="section repair-index" aria-labelledby="najczestsze-naprawy">
          <div className="repair-index__heading" data-reveal>
            <div><p className="eyebrow eyebrow--copper">Najczęstsze naprawy</p><h2 id="najczestsze-naprawy">Od zwykłego serwisu po poważniejszą naprawę.</h2></div>
            <p>Objaw nie zawsze wskazuje jedną konkretną część. Dlatego przed wyceną sprawdzamy samochód i ustalamy, co rzeczywiście wymaga naprawy.</p>
          </div>
          <div className="repair-index__grid">
            {commonRepairs.map((repair, index) => (
              <article key={repair.title} data-reveal style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{repair.title}</h3>
                <p>{repair.text}</p>
                <a href={repair.href}>Sprawdź zakres prac <i>→</i></a>
              </article>
            ))}
          </div>
          <div className="repair-index__cta" data-reveal>
            <p><strong>Nie musisz znać nazwy usterki.</strong> Powiedz, co słyszysz, widzisz lub czujesz podczas jazdy.</p>
            <a className="button button--copper" href="tel:+48690266302">Zadzwoń do warsztatu</a>
          </div>
        </section>

        <section id="jak-pracujemy" className="process-section">
          <div className="process-copy" data-reveal>
            <p className="eyebrow eyebrow--copper">Jak pracujemy</p>
            <h2>Wiesz, co dzieje się z autem na każdym etapie.</h2>
            <p>Nie zaczynamy od wymiany przypadkowych części. Najpierw zbieramy informacje, sprawdzamy samochód i uzgadniamy z Tobą dalsze działania.</p>
          </div>
          <div className="process-track" data-reveal>
            <span className="process-track__line"><i /></span>
            {[
              ["01", "Rozmowa i sprawdzenie", "Pytamy o objawy, oglądamy auto i szukamy źródła problemu."],
              ["02", "Zakres i koszt", "Mówimy, co trzeba zrobić, jakie są warianty i ile będzie kosztować naprawa."],
              ["03", "Naprawa", "Pracę rozpoczynamy po akceptacji ustalonego zakresu."],
              ["04", "Kontrola i odbiór", "Sprawdzamy efekt naprawy i wyjaśniamy, co zostało wykonane."],
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
            <div className="estimate-photo__caption"><p className="eyebrow eyebrow--copper">Bez niespodzianek przy odbiorze</p><h2>Wyjaśniamy, co znaleźliśmy i co warto z tym zrobić.</h2></div>
          </div>
          <div className="estimate-copy" data-reveal>
            <p className="eyebrow eyebrow--copper">Wycena naprawy</p>
            <h2>Najpierw ustalenia. Potem klucze idą w ruch.</h2>
            <p>
              Po sprawdzeniu samochodu mówimy, skąd bierze się problem i jakie może mieć skutki. Oddzielamy rzeczy pilne od tych, które mogą poczekać. Przed rozpoczęciem naprawy znasz potrzebne części, przewidywany termin odbioru i koszt.
            </p>
            <div className="estimate-card">
              <div className="estimate-card__head"><strong>Ustalenia przed naprawą</strong><span>Do akceptacji</span></div>
              <div><span>Co jest uszkodzone</span><strong>przyczyna i możliwe skutki</strong></div>
              <div><span>Co trzeba zrobić</span><strong>prace pilne i te, które mogą poczekać</strong></div>
              <div><span>Jakich części użyjemy</span><strong>dostępne warianty i różnice między nimi</strong></div>
              <div><span>Kiedy auto będzie gotowe</span><strong>przewidywany termin odbioru</strong></div>
              <div><span>Ile zapłacisz</span><strong>koszt zaakceptowany przed naprawą</strong></div>
            </div>
            <p className="estimate-copy__note"><strong>A jeśli po demontażu znajdziemy kolejną usterkę?</strong> Zatrzymamy pracę i zadzwonimy. Wyjaśnimy, co się zmieniło, podamy nowy koszt i poczekamy na Twoją decyzję.</p>
            <ul className="estimate-promises">
              <li><span>01</span>Nie rozszerzamy zlecenia bez Twojej zgody</li>
              <li><span>02</span>Mówimy wprost, co jest pilne, a co może poczekać</li>
              <li><span>03</span>Przed wydaniem auta sprawdzamy wykonaną pracę</li>
            </ul>
            <a className="estimate-copy__link" href="tel:+48690266302">Umów termin sprawdzenia auta <i>→</i></a>
          </div>
        </section>

        <section className="section full-offer" aria-labelledby="pelna-oferta">
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow eyebrow--copper">Pełny zakres usług</p><h2 id="pelna-oferta">Sprawdź, jakie naprawy wykonujemy.</h2></div>
            <p>Rozwiń wybraną kategorię, aby zobaczyć listę usług dostępnych w Luka Service. Nie znalazłeś swojej usterki? Zadzwoń, opisz objawy i zapytaj o możliwość naprawy.</p>
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
          <div data-reveal><p className="eyebrow eyebrow--copper">Przed wizytą</p><h2>O co najczęściej pytają kierowcy?</h2></div>
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
            <h2>Zadzwoń i powiedz, co dzieje się z autem.</h2>
            <p>Podaj markę i model samochodu, opisz objawy oraz moment, w którym się pojawiają. Ustalimy, od jakiego sprawdzenia zacząć i zaproponujemy możliwy termin.</p>
            <div className="contact-actions">
              <a className="button button--copper" href="tel:+48690266302">+48 690 266 302</a>
              <a className="button button--glass" href="https://www.google.com/maps/search/?api=1&query=Pianistów+10B+Warszawa" target="_blank" rel="noreferrer">Wyznacz trasę</a>
            </div>
            <dl className="contact-data">
              <div><dt>Warsztat</dt><dd>Pianistów 10B<br />02-403 Warszawa</dd></div>
              <div><dt>Pomoc z dojazdem</dt><dd>Dostępność ustalamy telefonicznie</dd></div>
            </dl>
          </div>
          <a className="map-panel" href="https://www.google.com/maps/search/?api=1&query=Pianistów+10B+Warszawa" target="_blank" rel="noreferrer" aria-label="Otwórz lokalizację Luka Service w Mapach Google" data-reveal>
            <span className="map-grid" /><span className="map-orbit" /><span className="map-pin"><i>L</i></span>
            <span className="map-label"><strong>Luka Service</strong><small>Warszawa Włochy • ul. Pianistów 10B</small></span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Luka Service</span>
        <span>Warszawa Włochy • ul. Pianistów 10B</span>
        <a href="tel:+48690266302">+48 690 266 302</a>
      </footer>

      <nav className="mobile-actions" aria-label="Szybki kontakt">
        <a href="tel:+48690266302">Zadzwoń</a><a href="#kontakt">Umów wizytę</a>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
