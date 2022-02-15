import { FC } from "react";
import {
  AppBar as AppHeading,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { ReactComponent as Logo } from "assets/icons/logo.svg";
import styles from "./AppBar.styles";

const AppBar: FC = () => {
  return (
    <AppHeading sx={styles.header} position="static">
      <Toolbar sx={styles.toolbar}>
        <IconButton size="large" edge="start" color="inherit">
          <Logo width="40" />
        </IconButton>
        <Button color="inherit">
          <Typography variant="h3">FAQs</Typography>
        </Button>
      </Toolbar>
    </AppHeading>
  );
};

export default AppBar;
