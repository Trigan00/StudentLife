import {
  Button,
  Divider,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import { MyDrawer } from './MyDrawer';
import { useMedia } from '@/hooks/useMedia';
import { DIMENSIONS, COLORS } from '@/utils/GeneralConsts';
import { Link } from 'react-router-dom';
import { routes } from '@/utils/routesConsts';

interface ISideBar {
  open: boolean;
  toggleDrawer: () => void;
}

export default function SideBar({ open, toggleDrawer }: ISideBar) {
  const matches = useMedia(DIMENSIONS.MD);

  const onClickHandler = () => {
    matches && toggleDrawer();
  };

  return (
    <MyDrawer open={open} onClose={onClickHandler}>
      <Button variant='contained'>Button</Button>
      <List sx={{ p: ' 0 15px' }} component='nav'>
        <ListItemButton
          sx={{ mb: 1, p: '10px 0' }}
          onClick={onClickHandler}
          component={Link}
          to={routes.HOME_ROUTE}
        >
          <Typography
            fontSize={14}
            fontWeight={500}
            pl={1}
            color={COLORS.textBlack}
          >
            {'Дашборд'}
          </Typography>
        </ListItemButton>
        <Divider />
        {/* <MainListItems onClickHandler={onClickHandler} /> */}
      </List>
    </MyDrawer>
  );
}
