const styles = {
  item: {
    bgcolor: 'success.main',
    marginBottom: '8px',
    borderRadius: '4px',
    '&.Mui-expanded': {
      mt: '0',
      mb: '8px',
    },
  },
  icon: { color: 'custom.white' },
  title: {},
  description: { color: '#A2A2A2' },
  descriptionSecond: { color: '#A2A2A2', mt: '16px' },
  notice: { color: '#A2A2A2' },
  link: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'fit-content',
    color: '#A2A2A2',
    border: '1px solid #404040',
    mt: '16px',
    padding: '12px 16px',
    borderRadius: '4px',
  },
  linkText: {
    ml: '6px',
  },
  detailsExpanded: {
    paddingTop: '0',
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingBottom: '24px',
  },
  details: {
    paddingLeft: '24px',
    paddingRight: '24px',
  },
};

export default styles;
