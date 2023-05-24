import { AppBar, Toolbar } from '@mui/material';

import { AppLogo, NextLinkIconButton } from '@/client/components';

import { AuthPopup } from './components';
import styles from './styles';

const Header = () => {
  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar>
        <NextLinkIconButton href="/">
          <AppLogo />
        </NextLinkIconButton>
        <AuthPopup />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
