import { useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import Chip from '@material-ui/core/Chip';

import { useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux';
import { userSelector } from '../redux/user';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);

  const { EstadoColegio } = useSelector(
    userSelector
  );

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('RUT');
    localStorage.removeItem('password');
    navigate('/login', { replace: true });
  }

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        {
          EstadoColegio === 0 ? <Hidden lgDown><Chip variant="filled" label={"Estado Colegio: Abierto"} style={{backgroundColor:'#8392ea', color:'white'}}/></Hidden> : <Hidden lgDown><Chip variant="filled" label={"Estado Colegio: Cuarentena"} color="secondary"/></Hidden>
        }
        {
          EstadoColegio === 0 ? <Hidden lgUp><Chip variant="filled" size='small' label={"Abierto"} style={{backgroundColor:'#8392ea', color:'white'}}/></Hidden> : <Hidden lgUp><Chip variant="filled" size='small' label={"Cuarentena"} color="secondary"/></Hidden>
        }
        
        <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => logOut()}>
            <InputIcon />
          </IconButton>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
