import { useMedia } from '@/hooks/useMedia';
import { DIMENSIONS } from '@/utils/GeneralConsts';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, headerHeight } from './dashboard-layout/header/Header';
import SideBar from './dashboard-layout/sidebar/SideBar';

const Layout = () => {
  const matches = useMedia(DIMENSIONS.MD);
  const [open, setOpen] = useState(!matches);
  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          //   backgroundImage: `url(/assets/bg_beach.png)`,
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      />
      <Header toggleDrawer={toggleDrawer} />
      <Box component='main' sx={{ display: 'flex' }}>
        <SideBar open={open} toggleDrawer={toggleDrawer} />
        <Box
          sx={{
            width: '100%',
            mt: `${headerHeight}px`,
            height: `calc(100vh - ${headerHeight}px)`,
            overflowX: 'hidden',
            boxSizing: 'border-box',
            p: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
