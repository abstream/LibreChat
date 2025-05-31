import { type FC } from 'react';
import { OGDialog, OGDialogContent, OGDialogHeader, OGDialogTitle, Button } from '~/components';
import { useAuthContext, useLocalize } from '~/hooks';

interface GuestLogoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GuestLogout: FC<GuestLogoutProps> = ({ open, onOpenChange }) => {
  const localize = useLocalize();
  const { logout } = useAuthContext();

  const handleSignOut = () => {
    logout();
  };

  return (
    <OGDialog open={open} onOpenChange={onOpenChange}>
      <OGDialogContent className="w-11/12 max-w-md">
        <OGDialogHeader>
          <OGDialogTitle className="text-lg font-medium leading-6 text-text-primary">
            {localize('com_nav_guest_messages_limit_title')}
          </OGDialogTitle>
        </OGDialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-text-secondary">
            <strong>{localize('com_nav_guest_messages_limit_header')}:</strong>
            <br />
            <p>{localize('com_nav_guest_messages_limit_message')}</p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {localize('com_ui_cancel')}
            </Button>
            <Button
              onClick={handleSignOut}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {localize('com_auth_sign_in')}
            </Button>
          </div>
        </div>
      </OGDialogContent>
    </OGDialog>
  );
};

export default GuestLogout;
