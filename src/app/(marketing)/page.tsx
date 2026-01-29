'use client';

import { useRef } from 'react';
import {
  HeroSection,
  FeaturesSection,
  WorkflowSection,
  BenefitsSection
} from '@/components/landing-page';
import { HeroHandle } from '@/components/landing-page/HeroSection';

export default function RightTailedLanding() {
  const heroRef = useRef<HeroHandle>(null);

  return (
    <>
      <HeroSection ref={heroRef} />
      <FeaturesSection onPrimaryCTA={() => heroRef.current?.focusExamSelector()} />
      <WorkflowSection onPrimaryCTA={() => heroRef.current?.focusExamSelector()} />
      <BenefitsSection onPrimaryCTA={() => heroRef.current?.focusExamSelector()} />
    </>
  );
}
