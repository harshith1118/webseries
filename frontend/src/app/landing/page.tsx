'use client';

import MobileLanding from '@/components/landing/MobileLanding';
import DesktopLanding from '@/components/landing/DesktopLanding';

export default function LandingPage() {
  return (
    <>
      <div className="md:hidden">
        <MobileLanding />
      </div>
      <div className="hidden md:block">
        <DesktopLanding />
      </div>
    </>
  );
}
