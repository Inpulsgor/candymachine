import { FC } from "react";
import {
  Link,
  Typography,
  Accordion as AccordionItem,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { AccordionProps } from "./Accordion.types";
import { ReactComponent as PlayIcon } from "assets/icons/play.svg";
import styles from "./Accordion.styles";

const Accordion: FC<AccordionProps> = ({
  title,
  description,
  link,
  linkText,
  notice,
}) => {
  return (
    <AccordionItem sx={styles.item}>
      <AccordionSummary expandIcon={<AddIcon sx={styles.icon} />}>
        <Typography variant="body1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {description && (
          <Typography sx={styles.description} variant="body2">
            {description}
          </Typography>
        )}
        {notice && (
          <Typography sx={styles.notice} variant="body2">
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
