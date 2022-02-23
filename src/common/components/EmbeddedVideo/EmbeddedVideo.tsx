import { FC, useRef, useEffect } from 'react';
import { CardMedia } from '@mui/material';
import { EmbeddedVideoProps } from './EmbeddedVideo.types';
import styles from './EmbeddedVideo.styles';

const EmbeddedVideo: FC<EmbeddedVideoProps> = ({
  videoLink,
  customStyles,
  fullScreen = true,
  videoTitle = 'embedded video',
  videoExpanded,
}) => {
  const videoRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!videoExpanded && videoRef.current) {
      videoRef.current.src = videoLink;
    }
  }, [videoExpanded, videoLink]);

  return (
    <CardMedia
      sx={customStyles ? customStyles : styles.default}
      allowFullScreen={fullScreen}
      title={videoTitle}
      src={videoLink}
      ref={videoRef}
      frameBorder={0}
      loading="lazy"
      component="iframe"
    />
  );
};

export default EmbeddedVideo;
