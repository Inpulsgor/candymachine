import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Accordion } from 'common/components';
import data from 'common/static/content.json';
import styles from './FAQs.styles';

const FAQs: FC = () => {
  const faqTitle = data.pages.home.faq.title;
  const faqContent = data.pages.home.faq.items;

  return (
    <Box sx={styles.faq}>
      <Typography sx={styles.title}>{faqTitle}</Typography>

      {faqContent.map(
        ({
          title,
          description,
          descriptionSecond,
          link,
          linkText,
          notice,
          id,
        }) => (
          <Accordion
            key={id}
            id={id}
            title={title}
            description={description}
            descriptionSecond={descriptionSecond}
            link={link}
            linkText={linkText}
            notice={notice}
          />
        ),
      )}
    </Box>
  );
};

export default FAQs;
