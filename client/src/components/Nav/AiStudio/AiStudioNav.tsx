import { type FC } from 'react';
import { cn } from '~/utils';
import { Gem } from 'lucide-react';
import { useLocalize } from '~/hooks';
import { useNavigate } from 'react-router-dom';

type PricingNavProps = {
  isSmallScreen: boolean;
};

const PricingNav: FC<PricingNavProps> = ({ isSmallScreen }: PricingNavProps) => {
  const localize = useLocalize();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={cn(
          'group relative mt-1 flex h-10 cursor-pointer items-center gap-3 rounded-lg border-border-medium bg-[#2f7ff7] px-3 py-2 text-white transition-colors duration-200',
          isSmallScreen ? 'mb-2 h-14 rounded-2xl' : '',
        )}
        onClick={() => navigate('/c/new?section=ai-studio')}
        role="button"
        tabIndex={0}
        aria-label={localize('com_ui_pricing_plans')}
      >
        <div className="absolute left-3 text-white group-focus-within:text-text-primary group-hover:text-text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"></path>
            <path d="M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z"></path>
            <path d="M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z"></path>
            <path d="M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"></path>
          </svg>
        </div>
        <div className="m-0 mr-0 w-full border-none bg-transparent p-0 pl-7 text-sm leading-tight placeholder-text-secondary focus-visible:outline-none group-focus-within:placeholder-text-primary group-hover:placeholder-text-primary">
          {localize('com_ui_ai_studio')}
        </div>
      </div>
    </>
  );
};

export default PricingNav;
