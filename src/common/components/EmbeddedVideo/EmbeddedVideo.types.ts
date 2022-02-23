interface CustomStyles {
  [key: string]: string | number;
}

export interface EmbeddedVideoProps {
  videoLink: string;
  customStyles?: CustomStyles;
  fullScreen?: boolean;
  videoExpanded?: boolean;
  videoTitle?: string;
}
