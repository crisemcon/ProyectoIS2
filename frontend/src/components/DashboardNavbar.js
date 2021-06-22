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
//import axiosClient from '../config/axios';

import { useSelector } from 'react-redux';
import { userSelector } from '../redux/user';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  //const [estadoColegio, setEstadoColegio] = useState(null);

  const { EstadoColegio } = useSelector(
    userSelector
  );

  const navigate = useNavigate();

  /*const fetchEstadoColegio = async () => {
    try {
      const response = await axiosClient.get("/US4");
      let data = await response.data;
      if (response.status === 200) {
        //console.log("SUCCESS", data);
        if(data.Estado_Colegio === 0){
          setEstadoColegio("Abierto");
        } else {
          setEstadoColegio("Cuarentena");
        }
      } else {
        console.log("ERROR", data.error);
      }
    } catch (e) {
      console.log("Error", e.response.data.error);
    }
  }

  useEffect(() => {
    fetchEstadoColegio();
  }, [])*/

  const logOut = () => {
    localStorage.removeItem('RUT');
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
          EstadoColegio === 0 ? <Chip variant="filled" label={"Estado Colegio: Abierto"} color="secondary"/> : <Chip variant="filled" label={"Estado Colegio: Cuarentena"} color="secondary"/>
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
