import React, { memo, useMemo, useRef, useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import supersub from 'remark-supersub';
import rehypeKatex from 'rehype-katex';
import { useRecoilValue } from 'recoil';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkDirective from 'remark-directive';
import type { Pluggable } from 'unified';
import { Citation, CompositeCitation, HighlightedText } from '~/components/Web/Citation';
import { Artifact, artifactPlugin } from '~/components/Artifacts/Artifact';
import { ArtifactProvider, CodeBlockProvider } from '~/Providers';
import MarkdownErrorBoundary from './MarkdownErrorBoundary';
import { langSubset, preprocessLaTeX } from '~/utils';
import { unicodeCitation } from '~/components/Web';
import { code, a, p } from './MarkdownComponents';
import store from '~/store';

type TProgressBarProps = {
  duration: number;
};

const ProgressBar = memo(({ duration }: TProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalMs = 100;
    const increment = (intervalMs / (duration * 1000)) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-1 rounded-full bg-blue-500 transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});

const GeneratingIndicator = memo(() => {
  const localize = useLocalize();
  const selectedModel = useRecoilValue(store.selectedModelState);

  const progressConfig = selectedModel?.options?._progress;
  const shouldShowProgressBar = progressConfig?.show_progressbar ?? false;
  const duration = progressConfig?.duration ?? 3;
  const text = progressConfig?.text ?? localize('com_ui_thinking');

  if (!shouldShowProgressBar) {
    return (
      <div className="absolute">
        <div className="inline-flex min-w-[120px] flex-col items-center gap-1 rounded-lg bg-gray-100 px-4 py-3 text-gray-600">
          <span className="animate-pulse text-sm">{text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute">
      <div className="inline-flex min-w-[120px] flex-col items-center gap-1 rounded-lg bg-gray-100 px-4 py-3 text-gray-600">
        <span className="animate-pulse text-sm">{text}</span>
        <ProgressBar duration={duration} />
      </div>
    </div>
  );
});

type TContentProps = {
  content: string;
  isLatestMessage: boolean;
};

const Markdown = memo(({ content = '', isLatestMessage }: TContentProps) => {
  const localize = useLocalize();
  const LaTeXParsing = useRecoilValue<boolean>(store.LaTeXParsing);
  const isInitializing = content === '';

  const currentContent = useMemo(() => {
    if (isInitializing) {
      return '';
    }
    return LaTeXParsing ? preprocessLaTeX(content) : content;
  }, [content, LaTeXParsing, isInitializing]);

  const rehypePlugins = useMemo(
    () => [
      [rehypeKatex],
      [
        rehypeHighlight,
        {
          detect: true,
          ignoreMissing: true,
          subset: langSubset,
        },
      ],
    ],
    [],
  );

  const remarkPlugins: Pluggable[] = [
    supersub,
    remarkGfm,
    remarkDirective,
    artifactPlugin,
    [remarkMath, { singleDollarTextMath: false }],
    unicodeCitation,
  ];

  if (isInitializing) {
    return <GeneratingIndicator />;
  }

  return (
    <MarkdownErrorBoundary content={content} codeExecution={true}>
      <ArtifactProvider>
        <CodeBlockProvider>
          <ReactMarkdown
            /** @ts-ignore */
            remarkPlugins={remarkPlugins}
            /* @ts-ignore */
            rehypePlugins={rehypePlugins}
            components={
              {
                code,
                a,
                p,
                artifact: Artifact,
                citation: Citation,
                'highlighted-text': HighlightedText,
                'composite-citation': CompositeCitation,
              } as {
                [nodeType: string]: React.ElementType;
              }
            }
          >
            {currentContent}
          </ReactMarkdown>
        </CodeBlockProvider>
      </ArtifactProvider>
    </MarkdownErrorBoundary>
  );
});

export default Markdown;
