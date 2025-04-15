import { type FC } from 'react';
import { useRecoilValue } from 'recoil';
import { useGetConversationTags } from '~/data-provider';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import store from '~/store';
import { Gem } from 'lucide-react';

type PricingNavProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
  isSmallScreen: boolean;
};

const PricingNav: FC<BookmarkNavProps> = ({ tags, setTags, isSmallScreen }: BookmarkNavProps) => {
  const localize = useLocalize();
  const { data } = useGetConversationTags();
  const conversation = useRecoilValue(store.conversationByIndex(0));

  return (
    <div
      className={cn(
        'group relative mt-1 flex h-10 cursor-pointer items-center gap-3 rounded-lg border-border-medium px-3 py-2 text-text-primary transition-colors duration-200 focus-within:bg-surface-hover hover:bg-surface-hover',
        isSmallScreen === true ? 'mb-2 h-14 rounded-2xl' : '',
      )}
    >
      <Gem className="absolute left-3 h-4 w-4 text-text-secondary group-focus-within:text-text-primary group-hover:text-text-primary" />
      <div
        className="m-0 mr-0 w-full border-none bg-transparent p-0 pl-7 text-sm leading-tight placeholder-text-secondary placeholder-opacity-100 focus-visible:outline-none group-focus-within:placeholder-text-primary group-hover:placeholder-text-primary"
      >
        Pricing Plans
      </div>
    </div>
  );
};

export default PricingNav;
