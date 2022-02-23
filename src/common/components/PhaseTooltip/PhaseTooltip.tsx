import { FC, useState, useEffect } from 'react';
import { Typography, Tooltip, Button } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import { PhaseTooltipProps } from './PhaseTooltip.types';
import styles from './PhaseTooltip.styles';
import { phases, Phase } from 'common/static/phases';
import { toDate } from 'common/utils/misc';
import { date } from 'common/components/UserSettings/UserSettings';

const PhaseTooltip: FC<PhaseTooltipProps> = () => {
  const [currentPhase, setcurrentPhase] = useState<Phase>();
  const [phaseOverlap, setPhaseOverlap] = useState(false);
  const current = new Date().getTime();

  useEffect(() => {
    const phaseElement = phases.filter(phase => {
      const startDate = toDate(phase.startDate)?.getTime();
      const endDate = toDate(phase?.endDate)?.getTime();

      if (startDate && endDate && current) {
        if (current >= startDate && current <= endDate) return phase;
      }
    });

    if (phaseElement?.length > 1) {
      const phaseNums = phaseElement.map(element => element.phase);

      if (phaseNums.includes(2) && phaseNums.includes(3)) {
        setPhaseOverlap(true);
        setcurrentPhase(phaseElement.pop());
        return;
      }
    }

    if (phaseElement?.length === 1) {
      return setcurrentPhase(phaseElement[0]);
    }

    if (!phaseElement?.length) return setcurrentPhase(phases[0]);
  }, [current, currentPhase]);

  return (
    <Tooltip
      arrow
      sx={styles.tooltip}
      title={
        <>
          <Typography sx={styles.tooltipText} variant="body2" component="p">
            {currentPhase && currentPhase.description}{' '}
          </Typography>
          <Typography sx={styles.tooltipText} variant="body2" component="span">
            {currentPhase && currentPhase.duration}{' '}
          </Typography>
          <Typography sx={styles.tooltipText} variant="body2" component="span">
            - {currentPhase && currentPhase.starts}
          </Typography>
        </>
      }
      placement="top"
    >
      <Button sx={styles.tooltipBtn} variant="outlined" color="info">
        <Typography sx={styles.tooltipBtnText} variant="body2">
          Phase {phaseOverlap ? '2 & 3' : currentPhase?.phase}
        </Typography>
        <InfoIcon sx={styles.tooltipIcon} />
      </Button>
    </Tooltip>
  );
};

export default PhaseTooltip;
