import { useForm } from 'react-hook-form';
import React, { useState, useEffect, useContext } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import type { TLoginUser, TStartupConfig } from 'librechat-data-provider';
import type { TAuthContext } from '~/common';
import { useResendVerificationEmail, useGetStartupConfig } from '~/data-provider';
import { ThemeContext, useLocalize } from '~/hooks';
import { Spinner, Button } from '~/components';

type TLoginFormProps = {
  onSubmit: (data: TLoginUser) => void;
  startupConfig: TStartupConfig;
  error: Pick<TAuthContext, 'error'>['error'];
  setError: Pick<TAuthContext, 'setError'>['setError'];
  onCaptchaSuccess?: () => void;
};

const LoginForm: React.FC<TLoginFormProps> = ({
  onSubmit,
  startupConfig,
  error,
  setError,
  onCaptchaSuccess,
}) => {
  const localize = useLocalize();
  const { theme } = useContext(ThemeContext);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginUser>();
  const [showResendLink, setShowResendLink] = useState<boolean>(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const { data: config } = useGetStartupConfig();
  const useUsernameLogin = config?.ldap?.username;
  const validTheme = theme === 'dark' ? 'dark' : 'light';
  const requireCaptcha = Boolean(startupConfig.turnstile?.siteKey);

  useEffect(() => {
    if (error && error.includes('422') && !showResendLink) {
      setShowResendLink(true);
    }
  }, [error, showResendLink]);

  const resendLinkMutation = useResendVerificationEmail({
    onMutate: () => {
      setError(undefined);
      setShowResendLink(false);
    },
  });

  // Handle turnstile success with callback
  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);
    onCaptchaSuccess?.();
  };

  // Handle turnstile error/expiry
  const handleTurnstileError = () => {
    setTurnstileToken(null);
  };

  if (!startupConfig) {
    return null;
  }

  const renderError = (fieldName: string) => {
    const errorMessage = errors[fieldName]?.message;
    return errorMessage ? (
      <span role="alert" className="mt-1 text-sm text-red-500 dark:text-red-900">
        {String(errorMessage)}
      </span>
    ) : null;
  };

  const handleResendEmail = () => {
    const email = getValues('email');
    if (!email) {
      return setShowResendLink(false);
    }
    resendLinkMutation.mutate({ email });
  };

  const renderResendLink = () => (
    <div className="mt-2 rounded-md border border-blue-500 bg-blue-500/10 px-3 py-2 text-sm text-gray-600 dark:text-gray-200">
      {localize('com_auth_email_verification_resend_prompt')}
      <button
        type="button"
        className="ml-2 text-blue-600 hover:underline"
        onClick={handleResendEmail}
        disabled={resendLinkMutation.isLoading}
      >
        {localize('com_auth_email_resend_link')}
      </button>
    </div>
  );

  const renderEmailField = () => (
    <div className="mb-4">
      <div className="relative">
        <input
          type="text"
          id="email"
          autoComplete={useUsernameLogin ? 'username' : 'email'}
          aria-label={localize('com_auth_email')}
          {...register('email', {
            required: localize('com_auth_email_required'),
            maxLength: { value: 120, message: localize('com_auth_email_max_length') },
            pattern: {
              value: useUsernameLogin ? /\S+/ : /\S+@\S+\.\S+/,
              message: localize('com_auth_email_pattern'),
            },
          })}
          aria-invalid={!!errors.email}
          className="webkit-dark-styles transition-color peer w-full rounded-2xl border border-border-light bg-surface-primary px-3.5 pb-2.5 pt-3 text-text-primary duration-200 focus:border-blue-500 focus:outline-none"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className="absolute start-3 top-1.5 z-10 origin-[0] -translate-y-4 scale-75 transform bg-surface-primary px-2 text-sm text-text-secondary-alt duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1.5 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          {useUsernameLogin
            ? localize('com_auth_username').replace(/ \(.*$/, '')
            : localize('com_auth_email_address')}
        </label>
      </div>
      {renderError('email')}
    </div>
  );

  const renderPasswordField = () => (
    <div className="mb-2">
      <div className="relative">
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          aria-label={localize('com_auth_password')}
          {...register('password', {
            required: localize('com_auth_password_required'),
            minLength: { value: 8, message: localize('com_auth_password_min_length') },
            maxLength: { value: 128, message: localize('com_auth_password_max_length') },
          })}
          aria-invalid={!!errors.password}
          className="webkit-dark-styles transition-color peer w-full rounded-2xl border border-border-light bg-surface-primary px-3.5 pb-2.5 pt-3 text-text-primary duration-200 focus:border-blue-500 focus:outline-none"
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="absolute start-3 top-1.5 z-10 origin-[0] -translate-y-4 scale-75 transform bg-surface-primary px-2 text-sm text-text-secondary-alt duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1.5 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          {localize('com_auth_password')}
        </label>
      </div>
      {renderError('password')}
    </div>
  );

  const renderCaptcha = () => (
    <div className="my-4 flex justify-center">
      <Turnstile
        siteKey={startupConfig.turnstile!.siteKey}
        options={{
          ...startupConfig.turnstile!.options,
          theme: validTheme,
        }}
        onSuccess={handleTurnstileSuccess}
        onError={handleTurnstileError}
        onExpire={handleTurnstileError}
      />
    </div>
  );

  return (
    <>
      {showResendLink && renderResendLink()}
      <form
        className="mt-6"
        aria-label="Login form"
        method="POST"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        {renderEmailField()}
        {renderPasswordField()}

        {startupConfig.passwordResetEnabled && (
          <a
            href="/forgot-password"
            className="inline-flex p-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {localize('com_auth_password_forgot')}
          </a>
        )}

        {requireCaptcha && renderCaptcha()}

        <div className="mt-6">
          <Button
            aria-label={localize('com_auth_continue')}
            data-testid="login-button"
            type="submit"
            disabled={(requireCaptcha && !turnstileToken) || isSubmitting}
            variant="submit"
            className="h-12 w-full rounded-2xl"
          >
            {isSubmitting ? <Spinner /> : localize('com_auth_continue')}
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
