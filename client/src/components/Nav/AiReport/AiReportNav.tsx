import { type FC } from 'react';
import { cn } from '~/utils';
import { useLocalize } from '~/hooks';
import { useNavigate } from 'react-router-dom';

type AiReportNavProps = {
  isSmallScreen: boolean;
};

const AiReportNav: FC<AiReportNavProps> = ({ isSmallScreen }: AiReportNavProps) => {
  const localize = useLocalize();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={cn(
          'group relative mt-1 flex h-10 cursor-pointer items-center gap-3 rounded-lg border-border-medium bg-[#2f7ff7] px-3 py-2 text-white transition-colors duration-200',
          isSmallScreen ? 'mb-2 h-14 rounded-2xl' : '',
        )}
        onClick={() => navigate('/c/new?endpoint=OmnexioReport&model=AI+Report')}
        role="button"
        tabIndex={0}
        aria-label={localize('com_ui_ai_report')}
      >
        <div className="absolute left-3 text-white group-focus-within:text-text-primary group-hover:text-text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <div className="m-0 mr-0 w-full border-none bg-transparent p-0 pl-7 text-sm leading-tight placeholder-text-secondary focus-visible:outline-none group-focus-within:placeholder-text-primary group-hover:placeholder-text-primary">
          {localize('com_ui_ai_report')}
        </div>
      </div>
    </>
  );
};

export default AiReportNav;
