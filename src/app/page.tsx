'use client'

import { useRef, useState } from 'react';
import { Navbar, Footer, SignInDialog, HeroSection, FeaturesSection, WorkflowSection, BenefitsSection } from '@/components/landing-page';
import { HeroHandle } from '@/components/landing-page/HeroSection';

export default function RightTailedLanding() {
  const heroRef = useRef<HeroHandle>(null);
  const [showSignInDialog, setShowSignInDialog] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar setShowSignInDialog={setShowSignInDialog} />
      <HeroSection ref={heroRef} />
      <FeaturesSection onPrimaryCTA={() => heroRef.current?.focusExamSelector()} />
      <WorkflowSection onPrimaryCTA={() => heroRef.current?.focusExamSelector()} />
      <BenefitsSection onPrimaryCTA={() => heroRef.current?.focusExamSelector()} />

      {showSignInDialog && 
        <SignInDialog onClose={() => setShowSignInDialog(false)} />
      }

      <Footer />
    </div>
  );
}
