import { FC } from 'react';
import { Container } from '@mui/material';
import styles from './PageWrapper.styles';

const PageWrapper: FC = ({ children }) => (
  <Container sx={styles.container} maxWidth="xl">
    {children}
  </Container>
);

export default PageWrapper;
