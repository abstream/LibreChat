import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { easings } from '@react-spring/web';
import { EModelEndpoint } from 'librechat-data-provider';
import { useSetRecoilState } from 'recoil';
import { useChatContext, useAgentsMapContext, useAssistantsMapContext } from '~/Providers';
import {
  useGetEndpointsQuery,
  useGetStartupConfig,
  useGetOmnexioChatModels,
} from '~/data-provider';
import { BirthdayIcon, TooltipAnchor, SplitText, Button } from '~/components';
import ConvoIcon from '~/components/Endpoints/ConvoIcon';
import { useLocalize, useAuthContext } from '~/hooks';
import { getIconEndpoint, getEntity } from '~/utils';
import { useSearchParams } from 'react-router-dom';
import store from '~/store';

const containerClassName =
  'shadow-stroke relative flex h-full items-center justify-center rounded-full bg-white dark:bg-presentation dark:text-white text-black dark:after:shadow-none ';

function getTextSizeClass(text: string | undefined | null) {
  if (!text) {
    return 'text-xl sm:text-2xl';
  }

  if (text.length < 40) {
    return 'text-2xl sm:text-4xl';
  }

  if (text.length < 70) {
    return 'text-xl sm:text-2xl';
  }

  return 'text-lg sm:text-md';
}

function getEndpointType(conversation: any, endpointsConfig: any) {
  let ep = conversation?.endpoint ?? '';

  if (
    [EModelEndpoint.chatGPTBrowser, EModelEndpoint.azureOpenAI, EModelEndpoint.gptPlugins].includes(
      ep as EModelEndpoint,
    )
  ) {
    ep = EModelEndpoint.openAI;
  }

  return getIconEndpoint({
    endpointsConfig,
    iconURL: conversation?.iconURL,
    endpoint: ep,
  });
}

function getEntityInfo(endpointType: string, agentsMap: any, assistantMap: any, conversation: any) {
  return getEntity({
    endpoint: endpointType,
    agentsMap,
    assistantMap,
    agent_id: conversation?.agent_id,
    assistant_id: conversation?.assistant_id,
  });
}

function findModelByName(models: any[], modelName: string) {
  if (!models || !modelName) {
    return null;
  }

  return models.find(
    (model) => model.label === modelName || model.name === modelName || model.id === modelName,
  );
}

function getModelDescription(selectedModel: any) {
  if (!selectedModel) {
    return '';
  }

  return selectedModel.description || selectedModel.shortDescription || '';
}

function getModelRelated(selectedModel: any) {
  if (!selectedModel) {
    return null;
  }
  if (!selectedModel.options?._related) {
    return null;
  }

  return selectedModel.options?._related;
}

function getModelImageUrl(selectedModel: any) {
  if (!selectedModel) {
    return '';
  }

  return selectedModel.imageUrl || '';
}

function getTimeBasedGreeting(localize: any) {
  const now = new Date();
  const hours = now.getHours();
  const dayOfWeek = now.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  if (hours >= 0 && hours < 5) {
    return localize('com_ui_late_night');
  }

  if (hours < 12) {
    return isWeekend ? localize('com_ui_weekend_morning') : localize('com_ui_good_morning');
  }

  if (hours < 17) {
    return localize('com_ui_good_afternoon');
  }

  return localize('com_ui_good_evening');
}

function getCustomWelcome(startupConfig: any, user: any) {
  const customWelcome = startupConfig?.interface?.customWelcome;

  if (typeof customWelcome !== 'string') {
    return null;
  }

  if (user?.name && customWelcome.includes('{{user.name}}')) {
    return customWelcome.replace(/{{user.name}}/g, user.name);
  }

  return customWelcome;
}

function calculateDynamicMargin(
  lineCount: number,
  description: string,
  textHasMultipleLines: boolean,
  contentHeight: number,
) {
  if (contentHeight > 200) {
    return 'mb-16';
  }

  if (contentHeight > 150) {
    return 'mb-12';
  }

  if (lineCount > 2 || (description && description.length > 100)) {
    return 'mb-10';
  }

  if (lineCount > 1 || (description && description.length > 0)) {
    return 'mb-6';
  }

  if (textHasMultipleLines) {
    return 'mb-4';
  }

  return 'mb-0';
}

function renderIcon(
  conversation: any,
  agentsMap: any,
  assistantMap: any,
  endpointsConfig: any,
  startupConfig: any,
  localize: any,
  textHasMultipleLines: boolean,
) {
  return (
    <div className={`relative size-10 justify-center ${textHasMultipleLines ? 'mb-2' : ''}`}>
      <ConvoIcon
        agentsMap={agentsMap}
        assistantMap={assistantMap}
        conversation={conversation}
        endpointsConfig={endpointsConfig}
        containerClassName={containerClassName}
        context="landing"
        className="h-2/3 w-2/3 text-black dark:text-white"
        size={41}
      />
      {startupConfig?.showBirthdayIcon && (
        <TooltipAnchor
          className="absolute bottom-[27px] right-2"
          description={localize('com_ui_happy_birthday')}
        >
          <BirthdayIcon />
        </TooltipAnchor>
      )}
    </div>
  );
}

function renderTitle(
  name: string,
  greetingText: string,
  user: any,
  handleLineCountChange: (count: number) => void,
) {
  if (name) {
    return (
      <div className="flex flex-col items-center gap-0 p-2">
        <SplitText
          key={`split-text-${name}`}
          text={name}
          className={`${getTextSizeClass(name)} font-medium text-text-primary`}
          delay={50}
          textAlign="center"
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing={easings.easeOutCubic}
          threshold={0}
          rootMargin="0px"
          onLineCountChange={handleLineCountChange}
        />
      </div>
    );
  }

  return (
    <SplitText
      key={`split-text-${greetingText}${user?.name ? '-user' : ''}`}
      text={greetingText}
      className={`${getTextSizeClass(greetingText)} font-medium text-text-primary`}
      delay={50}
      textAlign="center"
      animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
      animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
      easing={easings.easeOutCubic}
      threshold={0}
      rootMargin="0px"
      onLineCountChange={handleLineCountChange}
    />
  );
}

export default function Landing({ centerFormOnLanding }: { centerFormOnLanding: boolean }) {
  const [searchParams] = useSearchParams();
  const model = searchParams.get('model');
  const { conversation } = useChatContext();
  const agentsMap = useAgentsMapContext();
  const assistantMap = useAssistantsMapContext();
  const { data: startupConfig } = useGetStartupConfig();
  const { data: endpointsConfig } = useGetEndpointsQuery();
  const { data: omnexioModels } = useGetOmnexioChatModels();
  const { user } = useAuthContext();
  const localize = useLocalize();

  const setSelectedModel = useSetRecoilState(store.selectedModelState);

  const [textHasMultipleLines, setTextHasMultipleLines] = useState(false);
  const [lineCount, setLineCount] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const endpointType = useMemo(() => {
    return getEndpointType(conversation, endpointsConfig);
  }, [conversation?.endpoint, conversation?.iconURL, endpointsConfig]);

  const { entity, isAgent, isAssistant } = useMemo(() => {
    return getEntityInfo(endpointType, agentsMap, assistantMap, conversation);
  }, [endpointType, agentsMap, assistantMap, conversation?.agent_id, conversation?.assistant_id]);

  const selectedModel = useMemo(() => {
    return findModelByName(omnexioModels, model || '');
  }, [omnexioModels, model]);

  useEffect(() => {
    setSelectedModel(selectedModel);
  }, [selectedModel, setSelectedModel]);

  const name = entity?.name ?? '';
  const description = getModelDescription(selectedModel);
  const imageUrl = getModelImageUrl(selectedModel);
  const related = getModelRelated(selectedModel);

  const getGreeting = useCallback(() => {
    if (model) {
      return model;
    }

    const customWelcome = getCustomWelcome(startupConfig, user);
    if (customWelcome) {
      return customWelcome;
    }

    return getTimeBasedGreeting(localize);
  }, [localize, startupConfig?.interface?.customWelcome, user?.name, model]);

  const handleLineCountChange = useCallback((count: number) => {
    setTextHasMultipleLines(count > 1);
    setLineCount(count);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, [lineCount, description]);

  const getDynamicMargin = useMemo(() => {
    return calculateDynamicMargin(lineCount, description, textHasMultipleLines, contentHeight);
  }, [lineCount, description, textHasMultipleLines, contentHeight]);

  const greetingText = useMemo(() => {
    const greeting = getGreeting();
    const isCustomWelcome = typeof startupConfig?.interface?.customWelcome === 'string';

    if (isCustomWelcome) {
      return greeting;
    }

    return greeting + (user?.name ? ', ' + user.name : '');
  }, [getGreeting, startupConfig?.interface?.customWelcome, user?.name]);

  return (
    <div
      className={`flex h-full transform-gpu flex-col items-center justify-center pb-16 transition-all duration-200 ${centerFormOnLanding ? 'max-h-full max-w-3xl sm:max-h-0 xl:max-w-4xl' : 'max-h-full'} ${getDynamicMargin}`}
    >
      <div ref={contentRef} className="flex flex-col items-center gap-0 p-2">
        <div
          className={`flex ${textHasMultipleLines ? 'flex-col' : 'flex-col md:flex-row'} items-center justify-center gap-2`}
        >
          {imageUrl ? (
            <img src={imageUrl} width={40} height={40} alt={model || ''} />
          ) : (
            renderIcon(
              conversation,
              agentsMap,
              assistantMap,
              endpointsConfig,
              startupConfig,
              localize,
              textHasMultipleLines,
            )
          )}
          {renderTitle(
            (isAgent || isAssistant) && name ? name : '',
            greetingText,
            user,
            handleLineCountChange,
          )}
        </div>
        {description && (
          <div className="animate-fadeIn mt-4 max-w-md text-center text-sm font-normal text-text-primary">
            <div dangerouslySetInnerHTML={{ __html: description }} />
            {related && (
              <div className="mt-2">
                <b>Related:</b>
                {related.map((item: any, index: number) => (
                  <a
                    key={`${item.id}-${index}`}
                    className="ml-1 text-blue-500 underline"
                    href={item.secure_url}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
