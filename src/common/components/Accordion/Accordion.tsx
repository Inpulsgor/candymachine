import { FC, useState } from 'react';
import {
  Link,
  Typography,
  Accordion as AccordionItem,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { AccordionProps } from './Accordion.types';
import { ReactComponent as PlayIcon } from 'assets/icons/play.svg';
import styles from './Accordion.styles';

const Accordion: FC<AccordionProps> = ({
  title,
  description,
  descriptionSecond,
  link,
  linkText,
  notice,
  id,
}) => {
  const [expanded, setExpanded] = useState<number>(0);

  const handleChange = (value: number) => {
    expanded === value ? setExpanded(0) : setExpanded(value);
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
          <Typography sx={styles.description} variant="body2">
            {description}
          </Typography>
        )}
        {descriptionSecond && (
          <Typography sx={styles.descriptionSecond} variant="body2">
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
          <Link sx={styles.link} href={link}>
            <PlayIcon />
            <Typography sx={styles.linkText}>{linkText}</Typography>
          </Link>
        )}
      </AccordionDetails>
    </AccordionItem>
  );
};

export default Accordion;
