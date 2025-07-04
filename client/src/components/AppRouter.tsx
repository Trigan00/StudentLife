import Home from '@/pages/HomePage';
// import NotFound from '@/pages/NotFound';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './Layout';
import { useAuth } from '@/hooks/useAuth';
import SignInPage from '@/pages/auth/SignInPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import { routes } from '@/utils/routesConsts';
import AuthLayout from '@/pages/auth/layout';
import { Box, Typography } from '@mui/material';
import { SITE_NAME } from '@/utils/GeneralConsts';
import TasksPage from '@/pages/TasksPage';
import ClassesPage from '@/pages/ClassesPage';
// import TaskPage from '@/pages/TaskPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SchedulePage from '@/pages/SchedulePage';
import ClassTasksPage from '@/pages/ClassTasksPage';
import CalendarPage from '@/pages/CalendarPage';
import ProfilePage from '@/pages/ProfilePage';
import ExamsPage from '@/pages/ExamsPage';
import QandAPage from '@/pages/QandAPage';

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
            <Route path={routes.TASKS_ROUTE} element={<TasksPage />} />
            <Route path={routes.CLASSES_ROUTE} element={<ClassesPage />} />
            <Route path={routes.SCHEDULE_ROUTE} element={<SchedulePage />} />
            <Route path={routes.CALENDAR_ROUTE} element={<CalendarPage />} />
            <Route
              path={routes.CLASS_TASKS_ROUTE}
              element={<ClassTasksPage />}
            />
            <Route path={routes.PROFILE_ROUTE} element={<ProfilePage />} />
            <Route path={routes.EXAMS_ROUTE} element={<ExamsPage />} />
            <Route path={routes.EXAMS_ROUTE + '/:id'} element={<QandAPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route
              index
              element={<Navigate to={routes.LOGIN_ROUTE} replace />}
            />
            <Route path={routes.LOGIN_ROUTE} element={<SignInPage />} />
            <Route path={routes.REGISTRATION_ROUTE} element={<SignUpPage />} />
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
