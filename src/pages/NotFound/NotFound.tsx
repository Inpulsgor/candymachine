import { FC, useEffect, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'common/layout';
import { ROUTES } from 'types/enum';
import styles from './NotFound.styles';

const NotFound: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate(ROUTES.HOME), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content="Page doesn't exist" />
      </Helmet>

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
    </>
  );
};

export default NotFound;
