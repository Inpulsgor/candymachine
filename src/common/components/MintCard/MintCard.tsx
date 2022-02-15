import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

import { Wallet } from "common/components";
import { ReactComponent as DiamondIcon } from "assets/icons/diamond.svg";
import { MintCardProps } from "./MintCard.types";
import styles from "./MintCard.styles";

const MintCard: FC<MintCardProps> = () => {
  const { connected } = useWallet();
  const walletConnected = connected ? "connected" : "not connected";

  return (
    <Card sx={styles.card}>
      <Box sx={styles.mediaBox}>
        <CardMedia
          sx={styles.media}
          component="img"
          height="230"
          width="200"
          image="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png"
          alt="avatar"
        />
      </Box>

      <CardContent sx={styles.contentBox}>
        <Box sx={styles.titleBox}>
          <Typography sx={styles.title} variant="h2" component="span">
            Time to Mint!
          </Typography>
          <DiamondIcon width="26" />
        </Box>

        <Tooltip
          sx={styles.tooltip}
          title={<Typography variant="body2">Some tooltip</Typography>}
          placement="top"
        >
          <Button sx={styles.tooltipBtn} variant="outlined" color="info">
            <Typography sx={styles.tooltipText} variant="body2">
              Phase 1
            </Typography>
            <InfoIcon sx={styles.tooltipIcon} />
          </Button>
        </Tooltip>
      </CardContent>

      <CardActions sx={styles.actionsBox}>
        <Wallet />
      </CardActions>

      <CardContent sx={styles.contentBoxSecond}>
        <Typography sx={styles.walletText} variant="body1" component="span">
          Wallet
        </Typography>
        <Typography
          sx={connected ? styles.connected : styles.notConnected}
          variant="body1"
          component="span"
        >
          {walletConnected}
        </Typography>
        <Typography sx={styles.description} variant="body2" component="p">
          If you have any issues please reach out to a member of the team on
          Discord. We’ll be happy to help.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MintCard;
