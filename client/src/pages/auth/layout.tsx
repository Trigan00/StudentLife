import { MyCard } from '@/components/UI/MyCard';
import bgGradient from '@/helpers/bgGardient';
import { SITE_NAME } from '@/utils/GeneralConsts';
import { Link, Typography, Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='#'>
        {SITE_NAME}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function AuthLayout() {
  // const theme = useTheme();

  return (
    <Box
      component='main'
      sx={{
        ...bgGradient({
          startColor: '#fafbff',
          endColor: '#f2f6ff',
        }),
        height: '100vh',
      }}
    >
      <Stack alignItems='center' justifyContent='center' sx={{ height: 1 }}>
        <MyCard
          variant='shadowed'
          sx={{
            boxSizing: 'border-box',
            p: {
              xs: 3,
              md: 5,
            },
            width: '100%',
            maxWidth: '505px',
          }}
        >
          <Outlet />
        </MyCard>
        <Copyright sx={{ mt: 3 }} />
      </Stack>
    </Box>
  );
}
