import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { PageWrapper } from "common/layout";
import styles from "./NotFound.styles";

const NotFound: FC = () => {
  return (
    <PageWrapper>
      <Box sx={styles.wrapper}>
        <Typography sx={styles.title} variant="h2">
          Sorry, this page does not exist
        </Typography>
        <Typography sx={styles.text}>
          You will be redirected to home page in 5 seconds
        </Typography>
      </Box>
    </PageWrapper>
  );
};

export default NotFound;
