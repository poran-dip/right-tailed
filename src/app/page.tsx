'use client';

import { useRef, useState } from 'react';
import {
  Navbar,
  Footer,
  HeroSection,
  FeaturesSection,
  WorkflowSection,
  BenefitsSection
} from '@/components/landing-page';
import { HeroHandle } from '@/components/landing-page/HeroSection';
import SignInModal from '@/components/auth/SignInModal';
import SignUpModal from '@/components/auth/SignUpModal';

export default function RightTailedLanding() {
  const heroRef = useRef<HeroHandle>(null);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      <Navbar setShowSignInDialog={() => setAuthModal('signin')} />

      <HeroSection ref={heroRef} />
      <FeaturesSection onPrimaryCTA={() => heroRef.current?.focusExamSelector()} />
      <WorkflowSection onPrimaryCTA={() => heroRef.current?.focusExamSelector()} />
      <BenefitsSection onPrimaryCTA={() => heroRef.current?.focusExamSelector()} />

      {authModal === 'signin' && (
        <SignInModal
          onClose={() => setAuthModal(null)}
          onSwitchToSignUp={() => setAuthModal('signup')}
        />
      )}

      {authModal === 'signup' && (
        <SignUpModal
          onClose={() => setAuthModal(null)}
          onSwitchToSignIn={() => setAuthModal('signin')}
        />
      )}

      <Footer />
    </div>
  );
}
