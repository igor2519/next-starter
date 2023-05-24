import { menuItemClasses } from '@mui/material/MenuItem';

const styles = {
  container: { ml: 'auto' },
  menu: {
    width: 200,
    [`& .${menuItemClasses.root}.${menuItemClasses.disabled}`]: {
      opacity: 1,
    },
  },
} as const;

export default styles;
