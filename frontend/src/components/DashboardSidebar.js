import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  //Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  //AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  //Lock as LockIcon,
  //Settings as SettingsIcon,
  //ShoppingBag as ShoppingBagIcon,
  //User as UserIcon,
  //UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Box as BoxIcon,
  Sun as SunIcon
} from 'react-feather';
import NavItem from './NavItem';

import { useSelector } from 'react-redux';
import { userSelector } from '../redux/user';

const user = {
  avatar: '/static/images/avatars/defaultavatar.jpg',
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/personas',
    icon: UsersIcon,
    title: 'Personas'
  },
  {
    href: '/app/salas',
    icon: BoxIcon,
    title: 'Salas'
  },
  {
    href: '/app/sugerencias',
    icon: SunIcon,
    title: 'Sugerencias'
  }
  /*{
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Products'
  },*/
  /*{
    href: '/app/account',
    icon: UserIcon,
    title: 'Cuenta'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Ajustes'
  },*/
  /*{
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  }*/
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  const { Nombres, Apellidos, Rol} = useSelector(
    userSelector
  );

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {Nombres +" "+ Apellidos}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {Rol}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {/*items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))*/}
          <NavItem
              href={items[0].href}
              key={items[0].title}
              title={items[0].title}
              icon={items[0].icon}
            />
          {
            Rol === "Administrador" ? 
            <NavItem
              href={items[1].href}
              key={items[1].title}
              title={items[1].title}
              icon={items[1].icon}
            /> : null
          }
          {
            Rol === "Administrador" ? 
            <NavItem
              href={items[3].href}
              key={items[3].title}
              title={items[3].title}
              icon={items[3].icon}
            /> : null
          }
          <NavItem
              href={items[2].href}
              key={items[2].title}
              title={items[2].title}
              icon={items[2].icon}
            />
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
