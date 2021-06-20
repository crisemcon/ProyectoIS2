import React from 'react';
import { Button, Card, CardContent, Grid } from "@material-ui/core";
//import { indigo } from "@material-ui/core/colors";
//import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user";
import { useState } from "react";
import InformarContagioPupiloDialog from "./InformarContagioPupiloDialog";
import InformarContagioDialog from "./InformarContagioDialog";

import Stack from '@material-ui/core/Stack';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InformarContagio = (props) => {
  const { Rol } = useSelector(userSelector);

  const [severityAlert, setSeverityAlert] = React.useState(null);
  const [msgAlert, setMsgAlert] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openPupilo, setOpenPupilo] = useState(false);
  const [openPropio, setOpenPropio] = useState(false);

  const handleOpenAlert = (severity, message) => {
    setMsgAlert(message);
    setSeverityAlert(severity);
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
    setMsgAlert("");
    setSeverityAlert("");
  };

  const handleClickOpenPupilo = () => {
    setOpenPupilo(true);
  };

  const handleClosePupilo = () => {
    setOpenPupilo(false);
  };

  const handleClickOpenPropio = () => {
    setOpenPropio(true);
  };

  const handleClosePropio = () => {
    setOpenPropio(false);
  };

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleClickOpenPropio}
            >
              Informar Contagio Propio
            </Button>
            <InformarContagioDialog
              open={openPropio}
              onClose={handleClosePropio}
              handleOpenAlert={handleOpenAlert}
            />
          </Grid>
          {Rol === "Apoderado" ? (
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleClickOpenPupilo}
              >
                Informar Contagio Pupilo
              </Button>
              <InformarContagioPupiloDialog
                open={openPupilo}
                onClose={handleClosePupilo}
              />
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert
            onClose={handleCloseAlert}
            severity={severityAlert}
            sx={{ width: "100%" }}
          >
            {msgAlert}
          </Alert>
        </Snackbar>
      </Stack>
    </Card>
  );
};

export default InformarContagio;
