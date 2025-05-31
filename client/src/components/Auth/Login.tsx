import { useOutletContext, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import { useAuthContext } from '~/hooks/AuthContext';
import type { TLoginLayoutContext } from '~/common';
import { ErrorMessage } from '~/components/Auth/ErrorMessage';
import { getLoginError } from '~/utils';
import { useLocalize } from '~/hooks';
import LoginForm from './LoginForm';
import SocialButton from '~/components/Auth/SocialButton';
import { OpenIDIcon } from '~/components';
import { useCreateGuest } from '~/data-provider';
import { Turnstile } from '@marsidev/react-turnstile';
import { ThemeContext } from '~/hooks';
import { useContext } from 'react';

const VISITED_STORAGE_KEY = 'appTitle';

function Login() {
  const localize = useLocalize();
  const { theme } = useContext(ThemeContext);
  const { error, setError, login } = useAuthContext();
  const { startupConfig } = useOutletContext<TLoginLayoutContext>();
  const createGuest = useCreateGuest();

  const [searchParams, setSearchParams] = useSearchParams();
  const [hasAutoLoginAttempted, setHasAutoLoginAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [captchaValidated, setCaptchaValidated] = useState(false);

  const disableAutoRedirect = searchParams.get('redirect') === 'false';
  const [isAutoRedirectDisabled, setIsAutoRedirectDisabled] = useState(disableAutoRedirect);

  const validTheme = theme === 'dark' ? 'dark' : 'light';

  // Check if user has visited before
  const hasVisitedBefore = useCallback(() => {
    try {
      return !!localStorage.getItem(VISITED_STORAGE_KEY);
    } catch (error) {
      console.warn('Unable to access localStorage:', error);
      return true;
    }
  }, []);

  // Check if captcha is required
  const requiresCaptcha = useCallback(() => {
    return Boolean(startupConfig?.turnstile?.siteKey);
  }, [startupConfig?.turnstile?.siteKey]);

  // Create guest user with proper credentials handling
  const createGuestUser = useCallback(() => {
    createGuest.mutate(
      {},
      {
        onSuccess: (guest: { username: string; password: string }) => {
          if (guest) {
            const guestCredentials = {
              email: guest.username,
              password: guest.password,
            };
            login(guestCredentials);
          } else {
            console.error('No guest user');
          }
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      },
    );
  }, [createGuest, login]);

  // Auto guest login logic with captcha validation
  const attemptAutoGuestLogin = useCallback(() => {
    if (hasVisitedBefore() || hasAutoLoginAttempted) {
      setIsLoading(false);
      return;
    }

    // If captcha is required, wait for validation
    if (requiresCaptcha()) {
      // Don't hide loading yet, wait for captcha
      return;
    }

    setHasAutoLoginAttempted(true);
    createGuestUser();
  }, [hasVisitedBefore, requiresCaptcha, createGuestUser, hasAutoLoginAttempted]);

  // Handle successful captcha validation
  const handleCaptchaSuccess = useCallback(() => {
    if (captchaValidated) {
      return;
    }
    setCaptchaValidated(true);

    // Create guest if auto-login was attempted but waiting for captcha
    if (hasVisitedBefore() || hasAutoLoginAttempted) {
      setIsLoading(false);
      return;
    }

    setHasAutoLoginAttempted(true);
    createGuestUser();
  }, [captchaValidated, hasAutoLoginAttempted, hasVisitedBefore, createGuestUser]);

  // Handle captcha error/expiry
  const handleCaptchaError = useCallback(() => {
    setCaptchaValidated(false);
    if (!hasVisitedBefore() && !hasAutoLoginAttempted) {
      setIsLoading(false);
    }
  }, [hasVisitedBefore, hasAutoLoginAttempted]);

  // Handle URL parameter cleanup
  useEffect(() => {
    if (disableAutoRedirect) {
      setIsAutoRedirectDisabled(true);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('redirect');
      setSearchParams(newParams, { replace: true });
    }
  }, [disableAutoRedirect, searchParams, setSearchParams]);

  // Attempt auto guest login when component mounts
  useEffect(() => {
    attemptAutoGuestLogin();
  }, [attemptAutoGuestLogin]);

  // Auto-redirect logic for OpenID
  const shouldAutoRedirect =
    startupConfig?.openidLoginEnabled &&
    startupConfig?.openidAutoRedirect &&
    startupConfig?.serverDomain &&
    !isAutoRedirectDisabled &&
    hasVisitedBefore();

  useEffect(() => {
    if (shouldAutoRedirect) {
      window.location.href = `${startupConfig.serverDomain}/oauth/openid`;
    }
  }, [shouldAutoRedirect, startupConfig]);

  const renderCaptcha = () => (
    <div className="my-4 flex justify-center">
      {startupConfig?.turnstile!.siteKey && (
        <Turnstile
          siteKey={startupConfig.turnstile!.siteKey}
          options={{
            ...startupConfig.turnstile!.options,
            theme: validTheme,
          }}
          onSuccess={handleCaptchaSuccess}
          onError={handleCaptchaError}
          onExpire={handleCaptchaError}
        />
      )}
    </div>
  );

  // Loading screen component
  const LoadingScreen = () => (
    <div className="fixed inset-0 z-50 ml-2 mr-2 flex flex-col items-center justify-center bg-surface-primary">
      <img
        src="/assets/omnexio-logo.png"
        alt="Omnexio Logo"
        className="mb-8 h-24 w-auto animate-pulse"
      />
      <p className="mb-8 text-lg font-semibold text-text-primary">
        {localize('com_ui_loading') || 'Loading...'}
      </p>
      {requiresCaptcha() && !hasVisitedBefore() && renderCaptcha()}
    </div>
  );

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Render auto-redirect UI
  if (shouldAutoRedirect) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-lg font-semibold">
          {localize('com_ui_redirecting_to_provider', { 0: startupConfig.openidLabel })}
        </p>
        <div className="mt-4">
          <SocialButton
            key="openid"
            enabled={startupConfig.openidLoginEnabled}
            serverDomain={startupConfig.serverDomain}
            oauthPath="openid"
            Icon={() =>
              startupConfig.openidImageUrl ? (
                <img src={startupConfig.openidImageUrl} alt="OpenID Logo" className="h-5 w-5" />
              ) : (
                <OpenIDIcon />
              )
            }
            label={startupConfig.openidLabel}
            id="openid"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {error != null && <ErrorMessage>{localize(getLoginError(error))}</ErrorMessage>}
      {startupConfig?.emailLoginEnabled === true && (
        <LoginForm
          onSubmit={login}
          startupConfig={startupConfig}
          error={error}
          setError={setError}
          onCaptchaSuccess={handleCaptchaSuccess}
        />
      )}
      {startupConfig?.registrationEnabled === true && (
        <p className="my-4 text-center text-sm font-light text-gray-700 dark:text-white">
          {' '}
          {localize('com_auth_no_account')}{' '}
          <a
            href="/register"
            className="inline-flex p-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {localize('com_auth_sign_up')}
          </a>
        </p>
      )}
    </>
  );
}

export default Login;
