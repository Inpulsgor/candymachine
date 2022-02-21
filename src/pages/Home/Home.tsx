import { FC } from 'react';
import { Box } from '@mui/material';
import { PageWrapper } from 'common/layout';
import { MintCard, FAQs } from 'common/components';
import styles from './Home.styles';

const Home: FC = () => {
  return (
    <PageWrapper>
      <Box sx={styles.cardWrapper} component="section">
        <MintCard />
      </Box>
      <Box sx={styles.faqsWrapper} component="section">
        <FAQs />
      </Box>
    </PageWrapper>
  );
};

export default Home;
