const alignCenter = {
  display: 'flex',
  alignItems: 'center',
};

const styles = {
  card: {
    ...alignCenter,
    flexDirection: 'column',
    bgcolor: 'transparent',
    boxShadow: 'none',
    maxWidth: 540,
    width: '100%',
    paddingTop: '10px',
  },
  mediaBox: {
    position: 'relative' as const,
    border: '3px solid #191819',
    borderRadius: '10px',
    maxWidth: 540,
    zIndex: 100,
    mb: '48px',
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: 'auto',
    maxHeight: '230px',
    bgcolor: 'custom.black',
    zIndex: 50,
  },
  contentBox: {
    ...alignCenter,
    justifyContent: 'space-between',
    width: '100%',
    padding: 0,
    mb: '48px',
  },
  titleBox: {
    ...alignCenter,
    justifyContent: 'center',
  },
  title: {
    mr: '14px',
  },
  tooltip: {},
  tooltipText: {
    fontSize: '14px',
    fontWeight: 500,
  },
  tooltipBtn: {
    borderColor: '#404040',
    bgcolor: '#151315',
    padding: '6px 10px',
  },
  tooltipBtnText: {
    textTransform: 'none',
    mr: '6px',
  },
  tooltipIcon: {
    width: '14px',
    color: '#A2A2A2',
  },
  actionsBox: {
    bgcolor: 'success.main',
    padding: '32px',
    width: '100%',
    borderRadius: '6px',
    mb: '16px',
  },
  contentBoxSecond: { display: 'flex', flexWrap: 'wrap', padding: 0 },
  walletText: { display: 'block', width: '50%' },
  notConnected: {
    display: 'block',
    width: '50%',
    textAlign: 'right',
    color: '#FF9999',
  },
  connected: {
    display: 'block',
    width: '50%',
    textAlign: 'right',
    color: '#81c784',
  },
  description: {
    textAlign: 'center',
    padding: '0 30px',
  },
};

export default styles;
