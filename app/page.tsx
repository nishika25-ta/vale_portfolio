import type { Metadata } from 'next';
import styles from './makeover.module.css';

export const metadata: Metadata = {
  title: 'A little glow-up | Valentine Agam',
  description: 'Waittt. This portfolio is having a makeover. It will be ready shortly',
};

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="makeover-title">
        <div className={styles.copy}>
          <h1 id="makeover-title" className={styles.title}>Waittt<span>.</span></h1>
          <p className={styles.message}>This portfolio is having a makeover.<br />It will be ready shortly</p>
        </div>

        <figure className={styles.artwork}>
          {/* A generated illustration, served locally and sized to prevent layout shift. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/portfolio-spa-day.webp" width="1000" height="667" alt="A happy lavender browser wearing a towel and cucumber eye masks while a tiny orange cat gives it a makeover with a makeup brush." fetchPriority="high" />
        </figure>
      </section>

    </main>
  );
}
