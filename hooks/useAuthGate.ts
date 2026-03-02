import { useState, useCallback } from 'react';
import useAuthStore from '@/store/auth';

/**
 * Hook that provides an auth gate for actions requiring authentication.
 *
 * Usage:
 * ```tsx
 * const { requireAuth, showAuthPrompt, authAction, dismissAuthPrompt } = useAuthGate();
 *
 * const handleCheckout = () => {
 *   if (!requireAuth('checkout')) return;
 *   router.push('/checkout');
 * };
 *
 * // Render the AuthPromptModal somewhere in the tree:
 * <AuthPromptModal
 *   visible={showAuthPrompt}
 *   onDismiss={dismissAuthPrompt}
 *   action={authAction}
 * />
 * ```
 */
export const useAuthGate = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [authAction, setAuthAction] = useState<string | undefined>();

  /**
   * Check if the user is authenticated before performing an action.
   * Returns `true` if authenticated (proceed with the action).
   * Returns `false` and shows the auth prompt if not authenticated.
   */
  const requireAuth = useCallback(
    (action?: string): boolean => {
      if (isAuthenticated) return true;
      setAuthAction(action);
      setShowAuthPrompt(true);
      return false;
    },
    [isAuthenticated],
  );

  const dismissAuthPrompt = useCallback(() => {
    setShowAuthPrompt(false);
    setAuthAction(undefined);
  }, []);

  return {
    isAuthenticated,
    showAuthPrompt,
    authAction,
    requireAuth,
    dismissAuthPrompt,
  };
};

export default useAuthGate;
