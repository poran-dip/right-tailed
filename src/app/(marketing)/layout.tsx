'use client';

import { ReactNode, useState } from 'react';
import {
  Navbar,
  Footer
} from '@/components/landing-page';
import SignInModal from '@/components/auth/SignInModal';
import SignUpModal from '@/components/auth/SignUpModal';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar setShowSignInDialog={() => setAuthModal('signin')} />

      {children}

      <Footer />

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
    </div>
  );
}
