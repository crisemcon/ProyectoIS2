import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  //Box,
  Grid,
  //Typography,
} from "@material-ui/core";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import CalendarPicker from "@material-ui/lab/CalendarPicker";
import axiosClient from "../../config/axios";
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/user';

const maxDate = new Date();

const InformarContagioDialog = (props) => {
  const [date, setDate] = React.useState(new Date());
  const [isLoading, setIsLoading] = React.useState(false);

  const { RUT } = useSelector(
    userSelector
  );

  const informarContagio = async () => {
    try {
        setIsLoading(true);
        //console.log(date.toISOString().substring(0, 10))
        const response = await axiosClient.post("/US2", { RUT: RUT, Fecha: date.toISOString().substring(0, 10) });
        let data = await response.data;
        if (response.status === 200) {
            console.log("SUCCESS", data)
            props.handleOpenAlert("success", "El contagio ha sido informado correctamente");     
        } else {
          console.log("ERROR", data.error);
          props.handleOpenAlert("error", data.error); 
        }
        setIsLoading(false);
        props.onClose();
      } catch (e) {
        console.log("Error", e.response.data.error);
        setIsLoading(false);
        props.onClose();
        props.handleOpenAlert("error", e.response.data.error); 
      }
  }

  return (
    <Dialog {...props} open={props.open} onClose={props.onClose}>
      <DialogTitle>{"Informar Contagio Propio"}</DialogTitle>
      <DialogContent>
        <Grid container>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker
              date={date}
              maxDate={maxDate}
              onChange={(newDate) => setDate(newDate)}
            />
          </LocalizationProvider>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              onClick={() => informarContagio()}
            >
              Informar
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InformarContagioDialog;
