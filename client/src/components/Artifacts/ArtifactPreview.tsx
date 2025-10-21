import React, { memo, useMemo, useState, useEffect } from 'react';
import {
  SandpackPreview,
  SandpackProvider,
  SandpackProviderProps,
} from '@codesandbox/sandpack-react/unstyled';
import type { SandpackPreviewRef } from '@codesandbox/sandpack-react/unstyled';
import type { TStartupConfig } from 'librechat-data-provider';
import type { ArtifactFiles } from '~/common';
import { sharedFiles, sharedOptions } from '~/utils/artifacts';

// Helper function to check if a string is a URL
const isValidURL = (string: string): boolean => {
  try {
    const url = new URL(string.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

export const ArtifactPreview = memo(function ({
  files,
  fileKey,
  template,
  sharedProps,
  previewRef,
  currentCode,
  startupConfig,
}: {
  files: ArtifactFiles;
  fileKey: string;
  template: SandpackProviderProps['template'];
  sharedProps: Partial<SandpackProviderProps>;
  previewRef: React.MutableRefObject<SandpackPreviewRef>;
  currentCode?: string;
  startupConfig?: TStartupConfig;
}) {
  const [fetchedContent, setFetchedContent] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchURLContent = async () => {
      // Check if index.html exists and contains a URL
      const indexHtml = files['index.html'] || currentCode;

      if (!indexHtml) return;

      const trimmedContent = indexHtml.trim();

      // If the content is a URL, fetch it
      if (isValidURL(trimmedContent)) {
        setIsLoading(true);
        try {
          const response = await fetch(trimmedContent);
          const content = await response.text();
          setFetchedContent({ 'index.html': content });
        } catch (error) {
          console.error('Failed to fetch URL content:', error);
          setFetchedContent({
            'index.html': `<div style="padding: 20px; color: red;">Failed to load content from URL: ${trimmedContent}</div>`,
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        // If not a URL, clear any previously fetched content
        setFetchedContent({});
      }
    };

    fetchURLContent();
  }, [files, currentCode]);

  const artifactFiles = useMemo(() => {
    if (Object.keys(files).length === 0) {
      return files;
    }

    const code = currentCode ?? '';

    const updatedFiles = {
      ...files,
      ...(code && fileKey ? { [fileKey]: { code } } : {}),
    };

    // Replace with fetched content if available
    if (fetchedContent['index.html']) {
      updatedFiles['index.html'] = { code: fetchedContent['index.html'] };
    }

    return updatedFiles;
  }, [currentCode, files, fileKey, fetchedContent]);

  const options: typeof sharedOptions = useMemo(() => {
    if (!startupConfig) {
      return sharedOptions;
    }
    const _options: typeof sharedOptions = {
      ...sharedOptions,
      bundlerURL: template === 'static' ? startupConfig.staticBundlerURL : startupConfig.bundlerURL,
    };

    return _options;
  }, [startupConfig, template]);

  if (Object.keys(artifactFiles).length === 0) {
    return null;
  }

  // Show loading state while fetching
  if (isLoading) {
    return <div>Loading content from URL...</div>;
  }

  return (
    <SandpackProvider
      files={{
        ...artifactFiles,
        ...sharedFiles,
      }}
      options={options}
      {...sharedProps}
      template={template}
    >
      <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton={false}
        tabIndex={0}
        ref={previewRef}
      />
    </SandpackProvider>
  );
});
