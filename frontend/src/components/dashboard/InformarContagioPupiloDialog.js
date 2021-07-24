import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Avatar,
  //Box,
  Card,
  CardContent,
  Grid,
  //Typography,
  CardHeader,
  CardActions,
} from "@material-ui/core";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import CalendarPicker from "@material-ui/lab/CalendarPicker";
import axiosClient from "../../config/axios";
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/user';

const maxDate = new Date();

const InformarContagioPupiloDialog = (props) => {
  const [date, setDate] = React.useState(new Date());
  const [isLoading, setIsLoading] = React.useState(false);
  const [pupilos, setPupilos] = React.useState(null);

  const { RUT } = useSelector(userSelector);

  const fetchSugerencias = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get("/pupiloDeAp", {
        params: { RUT: RUT },
      });
      let data = await response.data;
      if (response.status === 200) {
        console.log("SUCCESS", data);
        setPupilos(data);
      } else {
        console.log("ERROR", data.error);
      }
      setIsLoading(false);
    } catch (e) {
      console.log("Error", e.response.data.error);
      setIsLoading(false);
    }
  };

  const informarContagio = async (RUT_Pup) => {
    try {
        setIsLoading(true);
        console.log(date.toISOString().substring(0, 10))
        const response = await axiosClient.post("/US1", { RUT: RUT, RUT_Alu: RUT_Pup, Fecha: date.toISOString().substring(0, 10) });
        let data = await response.data;
        if (response.status === 200) {
            console.log("SUCCESS", data)
            props.handleOpenAlert("success", "El contagio de su pupilo ha sido informado correctamente");     
        } else {
          console.log("ERROR", data.error);
          props.handleOpenAlert("error", data.error); 
        }
        setIsLoading(false);
        props.onClose();
      } catch (e) {
        //console.log(e);
        /*if(e.response.data.error === undefined){
          props.handleOpenAlert("error", "Error al conectar con el servidor"); 
        } else {
          props.handleOpenAlert("error", e.response.data.error); 
        }*/
        setIsLoading(false);
        props.onClose();
        props.handleOpenAlert("error", "Error al conectar con el servidor"); 
      }
  }

  useEffect(() => {
    fetchSugerencias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog {...props} open={props.open} onClose={props.onClose}>
      <DialogTitle>{"Informar Contagio Pupilo"}</DialogTitle>
      <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker
              date={date}
              maxDate={maxDate}
              onChange={(newDate) => setDate(newDate)}
            />
          </LocalizationProvider>
        <Grid container spacing={1}>
          {pupilos !== null ? 
            pupilos.map(pupilo => <Grid item lg={12} sm={12} xl={12} xs={12}>
              {/*lg={6} sm={6} xl={6} xs={12}*/}
              <Card>
                <CardContent>
                  <CardHeader
                    avatar={
                      <Avatar src="/static/images/avatars/defaultavatar.jpg" />
                    }
                    title={pupilo.Nombres + " " + pupilo.Apellidos}
                    subheader={pupilo.RUT}
                  />
                </CardContent>
                <CardActions disableSpacing>
                  <Button fullWidth={true} variant="contained" color="secondary" disabled={isLoading} onClick={() => informarContagio(pupilo.RUT)}>
                    Informar
                  </Button>
                </CardActions>
              </Card>
            </Grid> )
            : null
          }
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InformarContagioPupiloDialog;
