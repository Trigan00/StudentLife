'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { COLORS, SITE_NAME } from '@/utils/GeneralConsts';
import { routes } from '@/utils/routesConsts';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

export const headerHeight: number = 74;

interface IHeader {
  toggleDrawer: () => void;
}

export function Header({ toggleDrawer }: IHeader) {
  const { auth } = useAuth();

  return (
    <AppBar
      position='absolute' //absolute || static
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '12px',
        height: headerHeight,
        boxShadow: 'none',
        borderBottom: `1px solid ${COLORS.border};`,
        background: COLORS.transparent,
      }}
    >
      <Toolbar disableGutters>
        <Box
          sx={{
            display: 'flex',
            boxSizing: 'border-box',
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            color='primary'
            sx={{
              ml: '45px',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '24px',
              cursor: 'pointer',
            }}
            component={Link}
            to={routes.HOME_ROUTE}
          >
            {SITE_NAME}
          </Typography>
        </Box>
      </Toolbar>
      <Avatar
        component={Link}
        to={routes.PROFILE_ROUTE}
        sx={{ cursor: 'pointer', textDecoration: 'none' }}
      >
        {auth?.username[0].toUpperCase()}
      </Avatar>
    </AppBar>
  );
}
