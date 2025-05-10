import debounce from 'lodash/debounce';
import React, { memo, useMemo, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { SearchIcon } from 'lucide-react';
import { Tools, Constants, LocalStorageKeys } from 'librechat-data-provider';
import { useLocalize, useCodeApiKeyForm } from '~/hooks';
import CheckboxButton from '~/components/ui/CheckboxButton';
import useLocalStorage from '~/hooks/useLocalStorageAlt';
import { useVerifyAgentToolAuth } from '~/data-provider';
import { ephemeralAgentByConvoId } from '~/store';

const storageCondition = (value: unknown, rawCurrentValue?: string | null) => {
  if (rawCurrentValue) {
    try {
      const currentValue = rawCurrentValue?.trim() ?? '';
      if (currentValue === 'true' && value === false) {
        return true;
      }
    } catch (e) {
      console.error(e);
    }
  }
  return value !== undefined && value !== null && value !== '' && value !== false;
};

function OmnexioSearch({ conversationId }: { conversationId?: string | null }) {
  const localize = useLocalize();
  const key = conversationId ?? Constants.NEW_CONVO;

  const canRunCode = true;
  const [ephemeralAgent, setEphemeralAgent] = useRecoilState(ephemeralAgentByConvoId(key));
  const isCodeToggleEnabled = useMemo(() => {
    return ephemeralAgent?.execute_code ?? false;
  }, [ephemeralAgent?.execute_code]);

  const { data } = useVerifyAgentToolAuth(
    { toolId: Tools.function },
    {
      retry: 1,
    },
  );
  const authType = useMemo(() => data?.message ?? false, [data?.message]);
  const isAuthenticated = useMemo(() => data?.authenticated ?? false, [data?.authenticated]);
  const { methods, onSubmit, isDialogOpen, setIsDialogOpen, handleRevokeApiKey } =
    useCodeApiKeyForm({});

  const setValue = useCallback(
    (isChecked: boolean) => {
      setEphemeralAgent((prev) => ({
        ...prev,
        execute_code: isChecked,
      }));
    },
    [setEphemeralAgent],
  );

  const [runCode, setRunCode] = useLocalStorage<boolean>(
    `${LocalStorageKeys.LAST_CODE_TOGGLE_}${key}`,
    isCodeToggleEnabled,
    setValue,
    storageCondition,
  );

  const handleChange = useCallback(
    (isChecked: boolean) => {
      if (!isAuthenticated) {
        setIsDialogOpen(true);
        return;
      }
      setRunCode(isChecked);
    },
    [setRunCode, setIsDialogOpen, isAuthenticated],
  );

  const debouncedChange = useMemo(
    () => debounce(handleChange, 50, { leading: true }),
    [handleChange],
  );

  if (!canRunCode) {
    return null;
  }

  return (
    <>
      <CheckboxButton
        className="max-w-fit"
        defaultChecked={runCode}
        setValue={debouncedChange}
        label={localize('com_omnexio_search')}
        isCheckedClassName="border-purple-600/40 bg-purple-500/10 hover:bg-purple-700/10"
        icon={<SearchIcon className="icon-md" />}
      />
    </>
  );
}

export default memo(OmnexioSearch);
