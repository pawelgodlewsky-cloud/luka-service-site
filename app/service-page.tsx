import type { Metadata } from "next";
import Link from "next/link";
import { servicePageBySlug, type ServicePageData } from "./service-pages";

const SITE_URL = "https://lukaservice.pl";

export function createServiceMetadata(page: ServicePageData): Metadata {
  const path = `/${page.slug}/`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
      locale: "pl_PL",
      url: path,
      siteName: "Luka Service",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${page.shortTitle} w Luka Service` }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: ["/og.png"],
    },
  };
}

function ServiceSchema({ page }: { page: ServicePageData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${page.slug}/#service`,
    name: page.shortTitle,
    serviceType: page.shortTitle,
    description: page.metaDescription,
    url: `${SITE_URL}/${page.slug}/`,
    areaServed: ["Warszawa", "Warszawa-Włochy", "Ursus", "Ochota"].map((name) => ({ "@type": "Place", name })),
    provider: {
      "@type": "AutoRepair",
      "@id": `${SITE_URL}/#warsztat`,
      name: "Luka Service",
      url: `${SITE_URL}/`,
      telephone: "+48690266302",
      image: `${SITE_URL}/hero-workshop.webp`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pianistów 10B",
        postalCode: "02-403",
        addressLocality: "Warszawa",
        addressRegion: "mazowieckie",
        addressCountry: "PL",
      },
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function ServicePage({ page }: { page: ServicePageData }) {
  const related = page.related.map((slug) => servicePageBySlug[slug]).filter(Boolean);

  return (
    <>
      <a className="skip-link" href="#main">Przejdź do treści</a>
      <header className="site-header service-site-header">
        <Link className="brand" href="/" aria-label="Luka Service, strona główna">
          <img className="brand__logo" src="/brand/luka-service-logo.png" alt="Luka Service" width="900" height="270" />
        </Link>
        <nav className="main-nav service-main-nav" aria-label="Nawigacja">
          <Link href="/#uslugi">Usługi</Link>
          <Link href="/#jak-pracujemy">Jak pracujemy</Link>
          <Link href="/#faq">Pytania</Link>
          <a href="#kontakt">Kontakt</a>
        </nav>
        <a className="header-phone" href="tel:+48690266302">+48 690 266 302</a>
        <a className="button button--copper header-cta" href="tel:+48690266302">Umów wizytę</a>
      </header>

      <main id="main" className="service-page">
        <section className="service-page-hero">
          <div className="service-page-hero__copy">
            <nav className="breadcrumbs" aria-label="Okruszki">
              <Link href="/">Strona główna</Link><span>/</span><span>{page.shortTitle}</span>
            </nav>
            <p className="eyebrow eyebrow--copper service-enter service-enter--1">{page.eyebrow}</p>
            <h1 className="service-enter service-enter--2">{page.title}</h1>
            <p className="service-page-hero__lead service-enter service-enter--3">{page.lead}</p>
            <div className="service-page-hero__actions service-enter service-enter--4">
              <a className="button button--copper" href="tel:+48690266302">Zadzwoń: 690 266 302</a>
              <a className="service-text-link" href="#zakres">Zobacz zakres usługi <i>↓</i></a>
            </div>
            <ul className="service-hero-facts service-enter service-enter--5" aria-label="Najważniejsze informacje">
              <li><span>01</span>Sprawdzenie przyczyny</li>
              <li><span>02</span>Koszt przed naprawą</li>
              <li><span>03</span>Warszawa Włochy</li>
            </ul>
          </div>
          <figure className="service-page-hero__visual service-enter service-enter--2">
            <img src={page.image} alt={page.imageAlt} width="1200" height="1400" fetchPriority="high" />
            <figcaption><span>LUKA / SERVICE</span><strong>{page.shortTitle}</strong><small>Pianistów 10B, Warszawa</small></figcaption>
          </figure>
        </section>

        <section className="service-local-strip" aria-label="Informacje o warsztacie">
          <div><small>Warsztat</small><strong>Pianistów 10B</strong></div>
          <div><small>Obsługiwany obszar</small><strong>Włochy, Ursus, Ochota</strong></div>
          <div><small>Zasada</small><strong>Najpierw ustalenia, potem naprawa</strong></div>
          <a href="https://www.google.com/maps/search/?api=1&query=Pianistów+10B+Warszawa" target="_blank" rel="noreferrer">Wyznacz trasę <i>↗</i></a>
        </section>

        <section className="service-intro">
          <div className="service-section-title">
            <p className="eyebrow eyebrow--copper">Podejście do naprawy</p>
            <h2>{page.introTitle}</h2>
          </div>
          <div className="service-prose">
            {page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="service-symptoms">
          <div className="service-symptoms__heading">
            <div>
              <p className="eyebrow eyebrow--copper">Sygnały z samochodu</p>
              <h2>{page.symptomsTitle}</h2>
            </div>
            <p>{page.symptomsLead}</p>
          </div>
          <div className="service-symptoms__grid">
            {page.symptoms.map((symptom, index) => (
              <article key={symptom.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{symptom.title}</h3>
                <p>{symptom.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="zakres" className="service-scope">
          <div className="service-scope__heading">
            <p className="eyebrow eyebrow--copper">Zakres usługi</p>
            <h2>{page.scopeTitle}</h2>
            <p>{page.scopeLead}</p>
            <a className="service-text-link" href="tel:+48690266302">Zapytaj o swoje auto <i>→</i></a>
          </div>
          <div className="service-scope__list">
            {page.scope.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="service-process">
          <div className="service-process__heading">
            <p className="eyebrow eyebrow--copper">Jak wygląda wizyta</p>
            <h2>Cztery kroki bez niejasnych ustaleń.</h2>
          </div>
          <div className="service-process__track">
            {page.process.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="service-estimate">
          <div className="service-estimate__copy">
            <p className="eyebrow eyebrow--copper">Wycena i decyzja</p>
            <h2>{page.estimateTitle}</h2>
            {page.estimate.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="service-estimate__card">
            <p>Przed rozpoczęciem</p>
            <h3>Wiesz, co robimy i dlaczego.</h3>
            <ul>{page.checklist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul>
            <a className="button button--copper" href="tel:+48690266302">Porozmawiaj z mechanikiem</a>
          </div>
        </section>

        <section className="service-faq">
          <div className="service-faq__heading">
            <p className="eyebrow eyebrow--copper">Przed wizytą</p>
            <h2>Najczęstsze pytania</h2>
            <p>Nie widzisz odpowiedzi dotyczącej swojego samochodu? Zadzwoń i opisz objawy. Powiemy, od czego najlepiej zacząć.</p>
          </div>
          <div className="faq-list">
            {page.faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="related-services" aria-labelledby="powiazane-uslugi">
          <div className="related-services__heading">
            <p className="eyebrow eyebrow--copper">Powiązane usługi</p>
            <h2 id="powiazane-uslugi">Sprawdź także</h2>
          </div>
          <div className="related-services__grid">
            {related.map((item, index) => (
              <a key={item.slug} href={`/${item.slug}/`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.shortTitle}</h3>
                <p>{item.lead}</p>
                <strong>Zobacz usługę <i>↗</i></strong>
              </a>
            ))}
          </div>
        </section>

        <section id="kontakt" className="service-final-cta">
          <div>
            <p className="eyebrow eyebrow--copper">Luka Service | Warszawa Włochy</p>
            <h2>Opowiedz, co dzieje się z autem.</h2>
            <p>Podaj markę, model, wersję silnika i opisz objawy. Ustalimy, czy potrzebne jest sprawdzenie w warsztacie i zaproponujemy możliwy termin.</p>
          </div>
          <div className="service-final-cta__actions">
            <a className="button button--copper" href="tel:+48690266302">+48 690 266 302</a>
            <a className="button button--glass" href="https://www.google.com/maps/search/?api=1&query=Pianistów+10B+Warszawa" target="_blank" rel="noreferrer">Pianistów 10B, Warszawa</a>
          </div>
        </section>
      </main>

      <footer className="site-footer service-page-footer">
        <Link href="/">© {new Date().getFullYear()} Luka Service</Link>
        <span>Warszawa Włochy | ul. Pianistów 10B</span>
        <a href="tel:+48690266302">+48 690 266 302</a>
      </footer>
      <nav className="mobile-actions" aria-label="Szybki kontakt">
        <a href="tel:+48690266302">Zadzwoń</a><a href="#kontakt">Umów wizytę</a>
      </nav>
      <ServiceSchema page={page} />
    </>
  );
}
