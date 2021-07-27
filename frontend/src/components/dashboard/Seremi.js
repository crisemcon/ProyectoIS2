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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Stack from "@material-ui/core/Stack";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/core/Alert";

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
  const { EstadoColegio, RUT, openAlert, severityAlert, alertMessage } =
    useSelector(userSelector);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const dispatch = useDispatch();

  const handleClick = (opcion) => {
    if (opcion === 1) {
      dispatch(establecerCuarentena({ RUT: RUT }));
      handleCloseDialog();
    } else {
      dispatch(levantarCuarentena({ RUT: RUT }));
      handleCloseDialog();
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearAlertState());
  };

  return (
    <Card {...props} sx={{ height: "100%" }}>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {EstadoColegio === 0 ? "Establecer cuarentena en el establecimiento" : "Levantar cuarentena en el establecimiento"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {EstadoColegio === 0 ? "¿Esta seguro de establecer cuarentena en el establecimiento?" : "¿Esta seguro de levantar la cuarentena en el establecimiento?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleCloseDialog()}>Cancelar</Button>
          <Button onClick={()=> {EstadoColegio === 0 ? handleClick(1) : handleClick(0)}} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <CardHeader
        title="SEREMI"
        subheader="Establecer medidas establecidas por el SEREMI de salud"
      />
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            {EstadoColegio === 0 ? (
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => handleClickOpenDialog()}
              >
                Establecer cuarentena en el establecimiento
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => handleClickOpenDialog()}
              >
                Levantar cuarentena en el establecimiento
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
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
