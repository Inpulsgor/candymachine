import { FC } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
} from '@mui/material';

import external from 'common/static/external.json';
import { Wallet, PhaseTooltip } from 'common/components';
import { MintCardProps } from './MintCard.types';
import { ReactComponent as DiamondIcon } from 'assets/icons/diamond.svg';
import video from 'assets/video.mp4';
import styles from './MintCard.styles';

const MintCard: FC<MintCardProps> = () => {
  return (
    <Card sx={styles.card}>
      <Box sx={styles.mediaBox}>
        <CardMedia
          sx={styles.media}
          component="video"
          src={video}
          autoPlay
          muted
          loop
          preload="auto"
          playsInline
        />
      </Box>

      <CardContent sx={styles.contentBox}>
        <Box sx={styles.titleBox}>
          <Typography sx={styles.title} variant="h2" component="span">
            Time to Mint!
          </Typography>
          <DiamondIcon width="26" />
        </Box>

        <PhaseTooltip />
      </CardContent>

      <Wallet />

      <CardContent sx={styles.contentBoxSecond}>
        <Typography sx={styles.description} variant="body2" component="p">
          If you have any issues please reach out to a member of the team on{' '}
          <Link
            href={external.links.discord}
            target="_blank"
            rel="noopener"
            color="inherit"
            variant="body2"
          >
            Discord
          </Link>
          . We’ll be happy to help.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MintCard;
