import { FC } from "react";
import { Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { ReactComponent as Logo } from "assets/icons/logo.svg";
import data from "common/static/content.json";
import styles from "./AppBasement.styles";

const { copy, terms } = data.pages.footer;

const AppBasement: FC = () => {
  return (
    <Box sx={styles.footer} component="footer">
      <Toolbar sx={styles.toolbar}>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <Logo width="40" />
        </IconButton>
        <Typography sx={styles.copyright} variant="body2">
          {copy}
        </Typography>
        <Button>
          <Typography sx={styles.terms} variant="body2">
            {terms}
          </Typography>
        </Button>
      </Toolbar>
    </Box>
  );
};

export default AppBasement;
