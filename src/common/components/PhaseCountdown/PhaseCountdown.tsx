import { FC, useState } from 'react';
import Countdown from 'react-countdown';
import { Paper, Box } from '@mui/material';
import { CountdownRender, PhaseCountdownProps } from './PhaseCountdown.types';
import styles from './PhaseCountdown.styles';

const PhaseCountdown: FC<PhaseCountdownProps> = ({
  date,
  status,
  style,
  start,
  end,
  onComplete,
}) => {
  const [isFixed, setIsFixed] = useState(
    start && end && date ? start.getTime() - Date.now() < 0 : false,
  );

  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRender) => {
    hours += days * 24;

    if (completed) {
      return status ? (
        <Box sx={styles.done} component="span">
          {status}
        </Box>
      ) : null;
    } else {
      return (
        <Box sx={styles.root} style={style}>
          {isFixed && (
            <Paper sx={styles.paper} elevation={0}>
              <Box sx={styles.item} component="span">
                +
              </Box>
            </Paper>
          )}
          <Paper sx={styles.paper} elevation={0}>
            <Box sx={styles.item} component="span">
              {hours < 10 ? `0${hours}` : hours}
            </Box>
            <Box component="span">hrs</Box>
          </Paper>
          <Paper sx={styles.paper} elevation={0}>
            <Box sx={styles.item} component="span">
              {minutes < 10 ? `0${minutes}` : minutes}
            </Box>
            <Box component="span">mins</Box>
          </Paper>
          <Paper sx={styles.paper} elevation={0}>
            <Box sx={styles.item} component="span">
              {seconds < 10 ? `0${seconds}` : seconds}
            </Box>
            <Box component="span">secs</Box>
          </Paper>
        </Box>
      );
    }
  };

  if (date && start && end) {
    if (isFixed) {
      <Countdown
        date={start}
        now={() => end.getTime()}
        onComplete={() => setIsFixed(false)}
        renderer={renderCountdown}
      />;
    }
  }

  if (date) {
    return (
      <Countdown
        date={date}
        onComplete={onComplete}
        renderer={renderCountdown}
      />
    );
  } else {
    return null;
  }
};

export default PhaseCountdown;
