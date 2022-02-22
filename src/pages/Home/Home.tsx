import { FC } from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'common/layout';
import { MintCard, FAQs } from 'common/components';
import styles from './Home.styles';

const Home: FC = () => {
  return (
    <>
      <Helmet>
        <title>Diamond Hands by CPro</title>
        <meta
          name="description"
          content="Diamond Hands is a collection of 5,000 generative NFTs. Discover your own digital rarity. Be a part of the journey."
        />
      </Helmet>

      <PageWrapper>
        <Box sx={styles.cardWrapper} component="section">
          <MintCard />
        </Box>
        <Box sx={styles.faqsWrapper} component="section">
          <FAQs />
        </Box>
      </PageWrapper>
    </>
  );
};

export default Home;
