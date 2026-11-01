'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, ShieldCheck, X } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { certificates, type Certificate } from '@/data/certificates';
import { getLenis } from '@/utils/lenisRef';

function CertificateCard({ title, subtitle, issuer, imageSrc, imageAlt, onOpen }: Certificate & { onOpen: () => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="min-w-0">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${title} credential`}
        className="group flex h-full w-full flex-col text-left focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-content-primary"
      >
        <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#111416] p-5 transition-colors group-hover:border-white/25 sm:p-6">
          {imageSrc && !failed ? (
            <img src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-full w-full object-contain shadow-black/20 transition-transform duration-500 group-hover:scale-[1.035]" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-center text-slate-500">
              <ShieldCheck className="h-8 w-8" strokeWidth={1.5} aria-hidden />
              <span className="text-xs">Preview unavailable</span>
            </div>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col pt-5">
          <p className="text-xs leading-relaxed text-slate-500">{issuer}</p>
          <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-slate-100 transition-colors group-hover:text-white">{title}</h3>
          <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">{subtitle}</p>
          <span className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-medium text-slate-300">
            View credential <ArrowUpRight className="h-4 w-4 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </button>
    </article>
  );
}

function CertificateLightbox({ cert, onClose }: { cert: Certificate | null; onClose: () => void }) {
  useEffect(() => {
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cert, onClose]);

  useEffect(() => {
    if (!cert) return;
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    getLenis()?.stop();
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      getLenis()?.start();
    };
  }, [cert]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-lightbox-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[94dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl sm:max-h-[min(92vh,900px)] sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-content-primary/90">
              {cert.issuer}
            </span>
            <h2 id="cert-lightbox-title" className="text-lg font-bold tracking-tight text-white md:text-xl">
              {cert.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto bg-black/40 p-4 md:p-6">
          {cert.imageSrc ? (
            <img
              src={cert.imageSrc}
              alt={cert.imageAlt}
              className="mx-auto max-h-[min(75vh,720px)] w-full object-contain"
            />
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
              <ShieldCheck className="h-12 w-12 text-content-primary/60" aria-hidden />
              <p className="text-sm font-medium text-slate-400">Credential image not included in this portfolio.</p>
            </div>
          )}
        </div>
        <div className="border-t border-white/10 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 text-sm text-slate-400 sm:px-5 sm:pb-4">{cert.subtitle}</div>
      </div>
    </div>
  );
}

export function CertificatesSection() {
  const [openCert, setOpenCert] = useState<Certificate | null>(null);
  const closeCert = useCallback(() => setOpenCert(null), []);

  return (
    <section id="certificates" className="section-border section-pad">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <SectionHeader
          title="Certificates"
          gradient="& Awards"
          accent="content"
        />

        <ScrollRevealGroup className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" animation="fade-up" stagger={0.1}>
          {certificates.map(cert => (
            <CertificateCard key={cert.id} {...cert} onOpen={() => setOpenCert(cert)} />
          ))}
        </ScrollRevealGroup>
      </div>

      <CertificateLightbox cert={openCert} onClose={closeCert} />
    </section>
  );
}
