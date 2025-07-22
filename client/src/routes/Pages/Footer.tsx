import React, { useEffect } from 'react';
import { useGetStartupConfig } from '~/data-provider';
import TagManager from 'react-gtm-module';

/**
 * Component for displaying the Privacy Policy page
 * @returns Privacy Policy React component
 */
export default function Footer() {
  const { data: config } = useGetStartupConfig();
  useEffect(() => {
    if (config?.analyticsGtmId != null && typeof window.google_tag_manager === 'undefined') {
      const tagManagerArgs = {
        gtmId: config.analyticsGtmId,
      };
      TagManager.initialize(tagManagerArgs);
    }
  }, [config?.analyticsGtmId]);

  return (
    <>
      <div className="align-end m-4 flex justify-center gap-2 pb-4" role="contentinfo">
        <a className="text-sm text-blue-500" href="/" rel="noreferrer">
          Home
        </a>
        <div className="border-r-[1px] border-gray-300 dark:border-gray-600"></div>
        <a className="text-sm text-blue-500" href="/pages/privacy-policy" rel="noreferrer">
          Privacy policy
        </a>
        <div className="border-r-[1px] border-gray-300 dark:border-gray-600"></div>
        <a className="text-sm text-blue-500" href="/pages/tos" rel="noreferrer">
          Terms of service
        </a>
        <div className="border-r-[1px] border-gray-300 dark:border-gray-600"></div>
        <a className="text-sm text-blue-500" href="/pages/contact-us" rel="noreferrer">
          Contact us
        </a>
      </div>
    </>
  );
}
