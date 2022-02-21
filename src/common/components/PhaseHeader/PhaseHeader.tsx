import { FC } from 'react';
import Header from './Header/Header';
import { Phase, PhaseHeaderProps } from './PhaseHeader.types';
import {
  publicSaleSettings,
  whitelistSettings,
  welcomeSettings,
  mintPanic,
} from 'common/components/UserSettings/UserSettings';

const PhaseHeader: FC<PhaseHeaderProps> = ({ phase }) => {
  return (
    <>
      {phase === Phase.Panic && (
        <Header phaseName={mintPanic.title} desc={mintPanic.desc} />
      )}

      {phase === Phase.Welcome && (
        <Header
          phaseName={welcomeSettings.title}
          desc={welcomeSettings.desc}
          date={welcomeSettings.countdownTo}
          countdownEnable={welcomeSettings.countdownEnable}
        />
      )}

      {phase === Phase.WhiteListMint && (
        <>
          <Header
            phaseName={whitelistSettings.title}
            desc={whitelistSettings.desc}
            date={whitelistSettings.endDate}
            countdownEnable={whitelistSettings.countdown}
            status="WHITELIST LIVE"
          />
        </>
      )}

      {phase === Phase.PublicMint && (
        <>
          <Header
            phaseName={publicSaleSettings.title}
            desc={publicSaleSettings.desc}
            date={publicSaleSettings.endDate}
            countdownEnable={publicSaleSettings.countdown}
            status="LIVE"
          />
        </>
      )}
    </>
  );
};

export default PhaseHeader;
