import { Theme } from '@mui/material';

const styles = {
  paper: {
    bgcolor: '#384457',
  },
  root: {
    display: 'flex',
    padding: (theme: Theme) => theme.spacing(0),
    '& > *': {
      margin: (theme: Theme) => theme.spacing(0.5),
      width: (theme: Theme) => theme.spacing(6),
      height: (theme: Theme) => theme.spacing(6),
      display: 'flex',
      flexDirection: 'column' as const,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#384457',
      color: 'custom.white',
      borderRadius: 1,
      fontSize: 12,
    },
  },
  done: {
    display: 'flex',
    margin: (theme: Theme) => theme.spacing(1),
    padding: (theme: Theme) => theme.spacing(1.5),
    flexDirection: 'column' as const,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: '#384457',
    color: 'custom.white',
    borderRadius: 1,
    fontWeight: 700,
    fontSize: 18,
  },
  item: {
    fontSize: 20,
  },
};

export default styles;
