import { useRef, useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import * as Tabs from '@radix-ui/react-tabs';
import { ArrowLeft, ChevronLeft, ChevronRight, RefreshCw, X } from 'lucide-react';
import type { SandpackPreviewRef, CodeEditorRef } from '@codesandbox/sandpack-react';
import useArtifacts from '~/hooks/Artifacts/useArtifacts';
import DownloadArtifact from './DownloadArtifact';
import { useEditorContext } from '~/Providers';
import ArtifactTabs from './ArtifactTabs';
import { CopyCodeButton } from './Code';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import store from '~/store';
import artifacts from '~/components/Chat/Input/Artifacts';

export default function Artifacts() {
  const localize = useLocalize();
  const { isMutating } = useEditorContext();
  const editorRef = useRef<CodeEditorRef>();
  const previewRef = useRef<SandpackPreviewRef>();
  const [isVisible, setIsVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const setArtifactsVisible = useSetRecoilState(store.artifactsVisibility);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const {
    activeTab,
    setActiveTab,
    currentIndex,
    cycleArtifact,
    currentArtifact,
    orderedArtifactIds,
  } = useArtifacts();

  if (currentArtifact === null || currentArtifact === undefined) {
    return null;
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    const client = previewRef.current?.getClient();
    if (client != null) {
      client.dispatch({ type: 'refresh' });
    }
    setTimeout(() => setIsRefreshing(false), 750);
  };

  const closeArtifacts = () => {
    setIsVisible(false);
    setTimeout(() => setArtifactsVisible(false), 300);
  };

  const downloadPDF = async () => {
    const url = currentArtifact.content?.trim();
    console.log(url);
    //TODO url: https://cdn.omnexio.ai/data/reports/20251023/f37a899aafba5881d0c04970825c3c6eeccff01c.html
    //TODO create PDF and download
  };

  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab} asChild>
      {/* Main Parent */}
      <div className="flex h-full w-full items-center justify-center">
        {/* Main Container */}
        <div
          className={cn(
            `flex h-full w-full flex-col overflow-hidden border border-border-medium bg-surface-primary text-xl text-text-primary shadow-xl transition-all duration-500 ease-in-out`,
            isVisible ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-sm',
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-medium bg-surface-primary-alt p-2">
            <div className="flex items-center">
              <button className="mr-2 text-text-secondary" onClick={closeArtifacts}>
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h3 className="truncate text-sm text-text-primary">{currentArtifact.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-between gap-1 text-xs"
                onClick={downloadPDF}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-lucide="download"
                  className="lucide lucide-download"
                >
                  <path d="M12 15V3"></path>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <path d="m7 10 5 5 5-5"></path>
                </svg>
                <span>PDF</span>
              </button>
              <button className="text-text-secondary" onClick={closeArtifacts}>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Content */}
          <ArtifactTabs
            artifact={currentArtifact}
            editorRef={editorRef as React.MutableRefObject<CodeEditorRef>}
            previewRef={previewRef as React.MutableRefObject<SandpackPreviewRef>}
          />
          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border-medium bg-surface-primary-alt p-2 text-sm text-text-secondary">
            <div className="flex items-center">
              <button onClick={() => cycleArtifact('prev')} className="mr-2 text-text-secondary">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs">{`${currentIndex + 1} / ${
                orderedArtifactIds.length
              }`}</span>
              <button onClick={() => cycleArtifact('next')} className="ml-2 text-text-secondary">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Tabs.Root>
  );
}
