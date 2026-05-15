'use client';

import { useCallback, useEffect, useState } from 'react';
import { ExternalLink, ShieldCheck, X } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { certificates, type Certificate } from '@/data/certificates';
import { getLenis } from '@/utils/lenisRef';

function CertificateCard({
  title,
  subtitle,
  issuer,
  imageSrc,
  imageAlt,
  featured = false,
  onOpen,
}: Certificate & { featured?: boolean; onOpen: () => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <article
      className={`group surface-card flex h-full flex-col overflow-hidden transition-all duration-500 hover:border-content-primary/25 hover:shadow-[0_24px_60px_-30px_rgba(129,140,248,0.35)] ${
        featured ? 'sm:min-h-[22rem]' : 'sm:min-h-[20rem]'
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className={`relative block overflow-hidden rounded-t-[1.75rem] border-b border-white/[0.06] bg-black/40 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-primary ${
          featured ? 'aspect-[5/4] min-h-[220px] sm:min-h-[260px]' : 'aspect-[5/4] min-h-[200px] sm:min-h-[220px]'
        }`}
        aria-label={`Preview ${title} certificate`}
      >
        {!failed ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02] ${
              featured ? 'p-4 sm:p-5' : 'p-3.5 sm:p-4'
            }`}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <ShieldCheck className="h-10 w-10 text-slate-600" aria-hidden />
            <span className="text-xs font-medium text-slate-500">Certificate preview unavailable</span>
          </div>
        )}
        <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/65 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          <ExternalLink className="h-4 w-4" aria-hidden />
        </span>
      </button>

      <div className={`flex flex-1 flex-col gap-2.5 ${featured ? 'p-6 sm:p-7' : 'p-5 sm:p-6'}`}>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-content-primary/90 sm:text-[11px]">
          {issuer}
        </p>
        <h3 className={`font-bold leading-snug text-white ${featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
          {title}
        </h3>
        <p className={`leading-relaxed text-slate-500 ${featured ? 'text-sm sm:text-base' : 'text-sm'}`}>{subtitle}</p>
      </div>
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
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
      <div className="relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
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
          <img
            src={cert.imageSrc}
            alt={cert.imageAlt}
            className="mx-auto max-h-[min(75vh,720px)] w-full object-contain"
          />
        </div>
        <div className="border-t border-white/10 px-5 py-4 text-sm text-slate-400">{cert.subtitle}</div>
      </div>
    </div>
  );
}

export function CertificatesSection() {
  const [openCert, setOpenCert] = useState<Certificate | null>(null);
  const closeCert = useCallback(() => setOpenCert(null), []);

  return (
    <section id="certificates" className="section-border section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          number="02 // CREDENTIALS"
          title="Certificates"
          gradient="& Awards"
          description="Professional certification, academic recognition, and degree credentials."
          accent="content"
        />

        <div className="mb-10 flex flex-wrap items-center gap-2">
          {certificates.map((cert) => (
            <span
              key={`badge-${cert.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
            >
              <ShieldCheck className="h-3 w-3 text-content-primary" aria-hidden />
              {cert.issuer.split(' ')[0]}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center gap-8 lg:gap-10">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {certificates.slice(0, 2).map((cert) => (
              <CertificateCard key={cert.id} {...cert} onOpen={() => setOpenCert(cert)} />
            ))}
          </div>
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <CertificateCard {...certificates[2]} featured onOpen={() => setOpenCert(certificates[2])} />
          </div>
        </div>
      </div>

      <CertificateLightbox cert={openCert} onClose={closeCert} />
    </section>
  );
}
