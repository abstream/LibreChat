import { useLocalize } from '~/hooks';
import TagManager from 'react-gtm-module';
import { TStartupConfig } from 'librechat-data-provider';
import React from 'react';

function Footer({ startupConfig }: { startupConfig: TStartupConfig | null | undefined }) {
  const localize = useLocalize();
  if (!startupConfig) {
    return null;
  }
  const privacyPolicy = startupConfig.interface?.privacyPolicy;
  const termsOfService = startupConfig.interface?.termsOfService;

  if (startupConfig?.analyticsGtmId != null && typeof window.google_tag_manager === 'undefined') {
    const tagManagerArgs = {
      gtmId: startupConfig.analyticsGtmId,
    };
    TagManager.initialize(tagManagerArgs);
  }

  const privacyPolicyRender = privacyPolicy?.externalUrl && (
    <a
      className="text-sm text-blue-500"
      href={privacyPolicy.externalUrl}
      target={privacyPolicy.openNewTab ? '_blank' : undefined}
      rel="noreferrer"
    >
      {localize('com_ui_privacy_policy')}
    </a>
  );

  const termsOfServiceRender = termsOfService?.externalUrl && (
    <a
      className="text-sm text-blue-500"
      href={termsOfService.externalUrl}
      target={termsOfService.openNewTab ? '_blank' : undefined}
      rel="noreferrer"
    >
      {localize('com_ui_terms_of_service')}
    </a>
  );

  return (
    <div className="align-end m-4 flex justify-center gap-2" role="contentinfo">
      <a className="text-sm text-blue-500" href="/" rel="noreferrer">
        Home
      </a>
      <div className="border-r-[1px] border-gray-300 dark:border-gray-600"></div>
      {privacyPolicyRender}
      {privacyPolicyRender && termsOfServiceRender && (
        <div className="border-r-[1px] border-gray-300 dark:border-gray-600" />
      )}
      {termsOfServiceRender}
      <div className="border-r-[1px] border-gray-300 dark:border-gray-600" />
      <a className="text-sm text-blue-500" href="/pages/contact-us">
        {localize('com_ui_contact_us')}
      </a>
    </div>
  );
}

export default Footer;
