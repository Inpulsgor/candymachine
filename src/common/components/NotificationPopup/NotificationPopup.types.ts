import { AlertState } from 'common/components/Minter/Minter.types';

export interface NotificationPopupProps {
  alertState: AlertState;
  onAlertClose: () => void;
}
