import { getLenis } from '@/utils/lenisRef';
import { isMobileViewport } from '@/utils/isMobileViewport';

export function scrollToSection(appId: string, offset = -60): void {
  if (appId === 'resume') {
    window.open('/Valentine_Resume_2026_Data.pdf?v=aug-2026', '_blank');
    return;
  }
  const element = document.getElementById(appId);
  if (!element) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(element, { offset });
  } else {
    window.scrollTo({
      top: element.offsetTop + offset,
      behavior: isMobileViewport() ? 'auto' : 'smooth',
    });
  }
}
