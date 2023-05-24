const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    '& > main': {
      flexGrow: 1,
    },
  },
} as const;
export default styles;
