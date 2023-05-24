import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export const useAuthPopup = () => {
  const session = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const onSignOut = () => {
    signOut({ redirect: false });
    onCloseMenu();
  };

  return {
    session,
    anchorEl,
    onOpenMenu,
    onCloseMenu,
    onSignOut,
  };
};

export default useAuthPopup;
