'use client';

import { useCallback, useEffect, useState } from 'react';
import { Award, Eye, GraduationCap, ShieldCheck, X } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
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
  centered = false,
  onOpen,
}: Certificate & { featured?: boolean; centered?: boolean; onOpen: () => void }) {
  const [failed, setFailed] = useState(false);
  const isDegree = title === "Bachelor's Degree";
  const credentialType = isDegree ? 'Academic credential' : title.includes('Award') ? 'Achievement' : 'Professional certification';
  const CredentialIcon = isDegree ? GraduationCap : Award;

  return (
    <article
      className={`group surface-card relative flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-content-primary/30 hover:shadow-[0_28px_70px_-30px_rgba(14,165,233,0.32)] ${
        centered ? 'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-1rem)]' : ''
      } ${
        featured ? 'sm:min-h-[22rem]' : 'sm:min-h-[20rem]'
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className={`relative block overflow-hidden rounded-t-[1.75rem] border-b border-white/[0.06] bg-[#08090b] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content-primary ${
          featured ? 'aspect-[5/4] min-h-[220px] sm:min-h-[260px]' : 'aspect-[5/4] min-h-[200px] sm:min-h-[220px]'
        }`}
        aria-label={`Preview ${title} certificate`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(14,165,233,0.10),transparent_65%)]" />
        <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/65 px-3 py-1.5 backdrop-blur-md">
          <CredentialIcon className="h-3 w-3 text-content-primary" aria-hidden />
          <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-slate-300 sm:text-[9px]">{credentialType}</span>
        </div>
        {!failed ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`h-full w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-[1.025] ${
              featured ? 'p-5 pt-14 sm:p-6 sm:pt-16' : 'p-5 pt-14 sm:p-6 sm:pt-16'
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
        <span className="pointer-events-none absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:border-content-primary/30 group-hover:bg-content-primary group-hover:text-black">
          <Eye className="h-4 w-4" aria-hidden />
        </span>
      </button>

      <div className={`flex flex-1 flex-col ${featured ? 'p-6 sm:p-7' : 'p-5 sm:p-6'}`}>
        {issuer ? (
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-content-primary/90 sm:text-[10px]">
            {issuer}
          </p>
        ) : null}
        <h3 className={`mt-2 font-bold leading-snug text-white ${featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
          {title}
        </h3>
        {subtitle ? (
          <p className={`mt-2 flex-1 leading-relaxed text-slate-500 ${featured ? 'text-sm sm:text-base' : 'text-sm'}`}>{subtitle}</p>
        ) : null}
        <button type="button" onClick={onOpen} className="mt-5 inline-flex min-h-11 w-full items-center justify-between border-t border-white/[0.06] pt-4 text-left text-xs font-semibold text-slate-400 transition-colors hover:text-content-primary">
          <span>View credential</span>
          <Eye className="h-4 w-4" aria-hidden />
        </button>
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
          <img
            src={cert.imageSrc}
            alt={cert.imageAlt}
            className="mx-auto max-h-[min(75vh,720px)] w-full object-contain"
          />
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
      <div className="mx-auto max-w-6xl px-0 sm:px-6 md:px-8">
        <SectionHeader
          title="Certificates"
          gradient="& Awards"
          description="Professional certification, academic recognition, and degree credentials."
          accent="content"
        />

        <ScrollRevealGroup className="flex flex-col gap-8 sm:gap-10" stagger={0.14}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="rounded-full border border-content-primary/20 bg-content-primary/[0.06] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-content-primary">3 verified credentials</span>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">Tap any card to inspect</span>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {certificates.map((cert) => (
              <CertificateCard
                key={cert.id}
                {...cert}
                centered={cert.id === 'unimas-degree'}
                onOpen={() => setOpenCert(cert)}
              />
            ))}
          </div>
        </ScrollRevealGroup>
      </div>

      <CertificateLightbox cert={openCert} onClose={closeCert} />
    </section>
  );
}
