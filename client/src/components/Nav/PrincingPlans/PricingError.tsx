import { type FC, useState } from 'react';
import { useAuthContext } from '~/hooks';
import SubscriptionModal from './SubscriptionModal';
import GuestLogout from './GuestLogout';

interface PricingErrorProps {
  message: string;
}

const isGuestUser = (email?: string): boolean => {
  return email?.endsWith('@guest.local') ?? false;
};

const PricingError: FC<PricingErrorProps> = ({ message }) => {
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleLinkClick = () => {
    setIsModalOpen(true);
  };

  const isGuest = isGuestUser(user?.email);

  return (
    <>
      <button
        type="button"
        onClick={handleLinkClick}
        className="font-inherit cursor-pointer border-none bg-transparent p-0 text-blue-600 underline hover:text-blue-800"
      >
        {message}
      </button>

      {isGuest ? (
        <GuestLogout open={isModalOpen} onOpenChange={setIsModalOpen} />
      ) : (
        <SubscriptionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </>
  );
};

export default PricingError;
