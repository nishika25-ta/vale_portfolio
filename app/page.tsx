import type { Metadata } from 'next';
import styles from './makeover.module.css';

export const metadata: Metadata = {
  title: 'A little glow-up | Valentine Agam',
  description: 'Waittt. This portfolio is having a makeover. It will be ready shortly',
};

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.wordmark} href="/" aria-label="Valentine Agam home">valentine<span aria-hidden="true">✳</span></a>
        <span className={styles.status}><span aria-hidden="true" /> A LITTLE GLOW-UP IN PROGRESS</span>
      </header>

      <section className={styles.hero} aria-labelledby="makeover-title">
        <div className={styles.copy}>
          <span className={styles.eyebrow}>PLEASE EXCUSE THE CUCUMBERS</span>
          <h1 id="makeover-title" className={styles.title}>Waittt<span>.</span></h1>
          <p className={styles.message}>This portfolio is having a makeover.<br />It will be ready shortly</p>
          <p className={styles.aside}>A little polish. A little personality.<br />An unnecessarily thorough skincare routine.</p>
          <a className={styles.contact} href="https://www.linkedin.com/in/valentine-a-a278a7254" target="_blank" rel="noopener noreferrer">Say hello in the meantime <span aria-hidden="true">↗</span></a>
          <div className={styles.note}><span aria-hidden="true">✧</span> Same human. Fresh coat of pixels.</div>
        </div>

        <figure className={styles.artwork}>
          <span className={styles.sticker}>self-care,<br /><em>but make it a website.</em></span>
          {/* A generated illustration, served locally and sized to prevent layout shift. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/portfolio-spa-day.webp" width="1200" height="800" alt="A happy lavender browser wearing a towel and cucumber eye masks while a tiny orange cat gives it a makeover with a makeup brush." fetchPriority="high" />
          <figcaption>Our very qualified team is on it. <span aria-hidden="true">🐾</span></figcaption>
        </figure>
      </section>

      <footer className={styles.footer}><span>VALENTINE AGAM · PORTFOLIO</span><span>Back soon. Looking cuter.</span><span aria-hidden="true">✳ &nbsp; MADE WITH A LITTLE EXTRA CARE</span></footer>
    </main>
  );
}
