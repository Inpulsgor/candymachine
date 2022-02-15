import { FC } from "react";
import { Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { ReactComponent as Logo } from "assets/icons/logo.svg";
import styles from "./AppBasement.styles";

const AppBasement: FC = () => {
  return (
    <Box sx={styles.footer} component="footer">
      <Toolbar sx={styles.toolbar}>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <Logo width="40" />
        </IconButton>
        <Typography sx={styles.copyright} variant="body2">
          Diamond Hands NFT, a collaboration between Cryptonary and DC LLC. All
          rights reserved.
        </Typography>
        <Button>
          <Typography sx={styles.terms} variant="body2">
            Terms {"&"} Conditions
          </Typography>
        </Button>
      </Toolbar>
    </Box>
  );
};

export default AppBasement;
