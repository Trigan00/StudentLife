import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { MyDrawer } from './MyDrawer';
import { useMedia } from '@/hooks/useMedia';
import { DIMENSIONS } from '@/utils/GeneralConsts';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '@/utils/routesConsts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskIcon from '@mui/icons-material/Task';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import TimerIcon from '@mui/icons-material/Timer';

interface ISideBar {
  open: boolean;
  toggleDrawer: () => void;
}

export default function SideBar({ open, toggleDrawer }: ISideBar) {
  const matches = useMedia(DIMENSIONS.MD);
  const [isActivitiesOpen, SetActivitiesOpen] = useState(true);
  const location = useLocation();

  const onClickHandler = () => {
    matches && toggleDrawer();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <MyDrawer open={open} onClose={onClickHandler}>
      <List sx={{ p: ' 0 15px', flexGrow: 1, mt: 3 }} component='nav'>
        <ListItemButton
          onClick={onClickHandler}
          component={Link}
          to={routes.HOME_ROUTE}
          selected={isActive(routes.HOME_ROUTE)}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Typography fontSize='1.1rem'>Дашборд</Typography>}
          />
        </ListItemButton>
        <ListItemButton onClick={() => SetActivitiesOpen((prev) => !prev)}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Typography fontSize='1.1rem'>Мероприятия</Typography>}
          />
          {isActivitiesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isActivitiesOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton
              onClick={onClickHandler}
              sx={{ pl: 4 }}
              component={Link}
              to={routes.TASKS_ROUTE}
              selected={isActive(routes.TASKS_ROUTE)}
            >
              <ListItemIcon>
                <TaskIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography fontSize='1.1rem'>Задачи</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              onClick={onClickHandler}
              sx={{ pl: 4 }}
              component={Link}
              to={routes.CLASSES_ROUTE}
              selected={isActive(routes.CLASSES_ROUTE)}
            >
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography fontSize='1.1rem'>Занятия</Typography>}
              />
            </ListItemButton>
            <ListItemButton
              onClick={onClickHandler}
              sx={{ pl: 4 }}
              component={Link}
              to={routes.EXAMS_ROUTE}
              selected={isActive(routes.EXAMS_ROUTE)}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography fontSize='1.1rem'>Экзамены</Typography>}
              />
            </ListItemButton>
          </List>
        </Collapse>
        {/* <Divider />  */}
      </List>
      <List>
        <ListItemButton
          onClick={onClickHandler}
          // component={Link}
          // to={routes.HOME_ROUTE}
          // selected={isActive(routes.HOME_ROUTE)}
        >
          <ListItemIcon>
            <TimerIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Typography fontSize='1.1rem'>Таймер</Typography>}
          />
        </ListItemButton>
      </List>
    </MyDrawer>
  );
}
