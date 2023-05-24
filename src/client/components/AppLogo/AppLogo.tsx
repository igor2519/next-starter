import { Icon } from '@mui/material';
import Image from 'next/image';

import logoSvg from '@/public/logo.svg';
import { envUtil } from '@/shared/utils';

import type { IconProps } from '@mui/material';

const AppLogo = ({ fontSize = 'large', sx, ...props }: IconProps) => {
  const { appName } = envUtil.getEnv();
  return (
    <Icon {...props} sx={{ display: 'flex', position: 'relative', ...sx }} fontSize={fontSize}>
      <Image src={logoSvg} layout="fill" alt={appName} />
    </Icon>
  );
};

export default AppLogo;
