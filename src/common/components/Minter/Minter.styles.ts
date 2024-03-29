import { Theme } from '@mui/material';

const styles = {
  actionsBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'success.main',
    padding: '32px',
    width: '100%',
    borderRadius: '6px',
    mb: '16px',
  },
  walletBtn: {
    background: 'linear-gradient(90deg, #FBC7D4 0%, #9796F0 100%), #4AAF47',
    padding: '20px 0',
  },
  walletBtnText: { fontWeight: 600, color: '#151315', textTransform: 'none' },
  contentBoxSecond: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
    mb: '48px',
  },
  walletText: {},
  notConnected: {
    color: '#FF9999',
  },
  connected: {
    color: '#4AAF47',
  },
  stats: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    margin: '0 0 10px',
  },
  claim: {
    bgcolor: '#414141',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '30px',
    textAlign: 'center',
    borderRadius: '10px',
  },
};

export default styles;
