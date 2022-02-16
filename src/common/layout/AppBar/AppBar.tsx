import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar as AppHeading,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { ReactComponent as Logo } from "assets/icons/logo.svg";
import { ROUTES } from "types/enum";
import styles from "./AppBar.styles";

const AppBar: FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate(ROUTES.HOME);

  return (
    <AppHeading sx={styles.header} position="static">
      <Toolbar sx={styles.toolbar}>
        <IconButton
          sx={styles.icon}
          onClick={handleClick}
          size="large"
          edge="start"
          color="inherit"
        >
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
