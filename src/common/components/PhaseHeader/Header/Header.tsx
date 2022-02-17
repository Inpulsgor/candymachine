import { FC } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { PhaseCountdown } from "common/components";
import { toDate } from "common/utils/misc";
import { HeaderProps } from "./Header.types";
import styles from "./Header.styles";

const Header: FC<HeaderProps> = ({
  phaseName,
  desc,
  date,
  status,
  countdownEnable,
}) => {
  return (
    <>
      {countdownEnable === true && (
        <Grid container sx={styles.grid}>
          <Container sx={styles.container}>
            <PhaseCountdown
              date={toDate(date)}
              style={styles.countdown}
              status={status || "COMPLETE"}
            />
          </Container>
        </Grid>
      )}
      <Grid sx={styles.phaseNameBox} container alignItems="center">
        <Typography sx={styles.phaseName} variant="h3">
          {phaseName}
        </Typography>
      </Grid>
      {desc && (
        <Typography sx={styles.desc} variant="body1" color="textSecondary">
          {desc}
        </Typography>
      )}
    </>
  );
};

export default Header;
