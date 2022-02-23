import { FC, useState } from 'react';
import {
  Typography,
  Accordion as AccordionItem,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { EmbeddedVideo } from 'common/components';
import { AccordionProps } from './Accordion.types';
import styles from './Accordion.styles';

const Accordion: FC<AccordionProps> = ({
  title,
  description,
  descriptionSecond,
  link,
  notice,
  id,
}) => {
  const [expanded, setExpanded] = useState<number>(0);

  const handleChange = (itemID: number) => {
    expanded === itemID ? setExpanded(0) : setExpanded(itemID);
  };

  return (
    <AccordionItem sx={styles.item} onChange={() => handleChange(id)}>
      <AccordionSummary
        expandIcon={
          expanded === id ? (
            <RemoveIcon sx={styles.icon} />
          ) : (
            <AddIcon sx={styles.icon} />
          )
        }
      >
        <Typography variant="body1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={expanded === id ? styles.detailsExpanded : styles.details}
      >
        {description && (
          <Typography sx={styles.description} variant="body2" component="p">
            {description}
          </Typography>
        )}
        {descriptionSecond && (
          <Typography
            sx={styles.descriptionSecond}
            variant="body2"
            component="p"
          >
            {descriptionSecond}
          </Typography>
        )}
        {notice && (
          <Typography
            sx={{ ...styles.notice, mt: description ? '16px' : '0' }}
            variant="body2"
          >
            {notice}
          </Typography>
        )}
        {link && (
          <EmbeddedVideo
            videoLink={link}
            videoTitle="Mint process video guide"
            videoExpanded={Boolean(expanded)}
          />
        )}
      </AccordionDetails>
    </AccordionItem>
  );
};

export default Accordion;
