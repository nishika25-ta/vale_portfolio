export function scrollToSection(appId: string, offset = -60): void {
  if (appId === 'resume') {
    window.open('/Valentine_Resume_2026.pdf', '_blank');
    return;
  }
  const element = document.getElementById(appId);
  if (!element) return;
  if (window.lenis) {
    window.lenis.scrollTo(element, { offset });
  } else {
    window.scrollTo({ top: element.offsetTop + offset, behavior: 'smooth' });
  }
}
