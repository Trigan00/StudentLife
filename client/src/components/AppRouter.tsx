import Home from '@/pages/Home';
// import NotFound from '@/pages/NotFound';
import TodoItemPage from '@/pages/TodoItemPage';
import TodoList from '@/pages/TodoList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './Layout';
import { useAuth } from '@/hooks/useAuth';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import { routes } from '@/utils/routesConsts';
import AuthLayout from '@/pages/auth/layout';
import { Box, Typography } from '@mui/material';
import { SITE_NAME } from '@/utils/GeneralConsts';

const AppRouter = () => {
  const { auth, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography color='primary' variant='h3'>
          {SITE_NAME}
        </Typography>
      </Box>
    );
  }

  return (
    <Router>
      {auth ? (
        <Routes>
          <Route path={routes.HOME_ROUTE} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='todos' element={<TodoList />} />
            <Route path='todos/:id' element={<TodoItemPage />} />
            <Route
              path={'*'}
              element={<Navigate to={routes.HOME_ROUTE} replace />}
            />
            {/* <Route path='*' element={<NotFound />} />  Не могу так как при авторизации редирект на Home не случается и путь остаеться signin это привеодит к Not found*/}
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route
              index
              element={<Navigate to={routes.LOGIN_ROUTE} replace />}
            />
            <Route path={routes.LOGIN_ROUTE} element={<SignIn />} />
            <Route path={routes.REGISTRATION_ROUTE} element={<SignUp />} />
            <Route
              path='*'
              element={<Navigate to={routes.LOGIN_ROUTE} replace />}
            />
          </Route>
        </Routes>
      )}
    </Router>
  );
};

export default AppRouter;
