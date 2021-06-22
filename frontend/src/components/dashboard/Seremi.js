import React from "react";
import {
  //Avatar,
  //Box,
  Card,
  CardContent,
  Grid,
  Button,
  CardHeader,
} from "@material-ui/core";

import Stack from '@material-ui/core/Stack';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';

import { useSelector, useDispatch } from "react-redux";
import {
  establecerCuarentena,
  levantarCuarentena,
  userSelector,
  clearAlertState,
} from "../../redux/user";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Seremi = (props) => {
  const { EstadoColegio, RUT, openAlert, severityAlert, alertMessage } = useSelector(userSelector);

  const dispatch = useDispatch();

  const handleClick = (opcion) => {
      if(opcion === 1) {
        dispatch(establecerCuarentena({RUT: RUT}));
      } else {
        dispatch(levantarCuarentena({RUT: RUT}));
      }
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log("cierraaaaa");
    dispatch(clearAlertState())
  };

  return (
    <Card {...props} sx={{ height: "100%" }}>
      <CardHeader
        title="SEREMI"
        subheader="Establecer medidas establecidas por el SEREMI de salud"
      />
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            {EstadoColegio === 0 ? (
              <Button fullWidth variant="contained" color="secondary" onClick={() => handleClick(1)}>
                Establecer cuarentena en el establecimiento
              </Button>
            ) : (
              <Button fullWidth variant="contained" color="secondary" onClick={() => handleClick(0)}>
                Levantar cuarentena en el establecimiento
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert
            onClose={handleCloseAlert}
            severity={severityAlert}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </Card>
  );
};

export default Seremi;
