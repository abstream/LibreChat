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
import { useLocalize } from '~/hooks';
import { LocalStorageKeys } from 'librechat-data-provider';

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

type ProgressStage = {
  text: string;
  duration: number;
};

const getProgressStages = (searchValue: string | null): ProgressStage[] => {
  if (searchValue === 'fast') {
    return [
      { text: 'Understanding Question', duration: 1.5 },
      { text: 'Searching', duration: 3 },
      { text: 'Cleaning Data', duration: 1.5 },
      { text: 'Analysing', duration: 2.2 },
      { text: 'Summarizing', duration: 10 }, // fills remaining time
    ];
  }

  if (searchValue === 'deep') {
    return [
      { text: 'Understanding Question', duration: 2 },
      { text: 'Searching', duration: 15 },
      { text: 'Cleaning Data', duration: 4 },
      { text: 'Analysing', duration: 6 },
      { text: 'Reranking', duration: 3 },
      { text: 'Filtering', duration: 3 },
      { text: 'Analysing', duration: 5 },
      { text: 'Answering', duration: 30 }, // fills remaining time
    ];
  }

  return [];
};

const getTotalDuration = (stages: ProgressStage[]): number => {
  return stages.reduce((sum, stage) => sum + stage.duration, 0);
};

const GeneratingIndicator = memo(() => {
  const localize = useLocalize();
  const selectedModel = useRecoilValue(store.selectedModelState);
  const searchValue = localStorage.getItem(LocalStorageKeys.LAST_OMNEXIO_SEARCH_VALUE);
  const useStageProgress = searchValue === 'fast' || searchValue === 'deep';

  const progressConfig = selectedModel?.options?._progress;
  const shouldShowProgressBar = progressConfig?.show_progressbar ?? useStageProgress;
  const duration = progressConfig?.duration ?? 3;
  const text = progressConfig?.text ?? localize('com_ui_thinking');

  const stages = useMemo(() => getProgressStages(searchValue), [searchValue]);
  const totalDuration = useMemo(() => getTotalDuration(stages), [stages]);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!shouldShowProgressBar || !useStageProgress || stages.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 0.1;

        let accumulatedTime = 0;
        let newStageIndex = 0;

        for (let i = 0; i < stages.length; i++) {
          accumulatedTime += stages[i].duration;
          if (newTime < accumulatedTime) {
            newStageIndex = i;
            break;
          }
        }

        if (newStageIndex !== currentStageIndex) {
          setCurrentStageIndex(newStageIndex);
        }

        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [shouldShowProgressBar, useStageProgress, stages, currentStageIndex]);

  if (!shouldShowProgressBar) {
    return (
      <div className="absolute">
        <div className="inline-flex min-w-[120px] flex-col items-center gap-1 rounded-lg bg-blue-100 px-4 py-3 text-black">
          <span className="animate-pulse text-sm font-bold">{text}</span>
        </div>
      </div>
    );
  }

  if (!useStageProgress) {
    return (
      <div className="absolute">
        <div className="inline-flex min-w-[120px] flex-col items-center gap-1 rounded-lg bg-blue-100 px-4 py-3 text-black">
          <span className="animate-pulse text-sm font-bold">{text}</span>
          <ProgressBar duration={duration} />
        </div>
      </div>
    );
  }

  const currentStage = stages[currentStageIndex];
  const displayText = currentStage ? `${currentStage.text}...` : text;

  return (
    <div className="absolute">
      <div className="inline-flex min-w-[120px] flex-col items-center gap-1 rounded-lg bg-blue-100 px-4 py-3 text-black">
        <span className="animate-pulse text-sm font-bold">{displayText}</span>
        <ProgressBar duration={totalDuration} />
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
