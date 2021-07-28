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
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from '@material-ui/core/FormGroup';

const maxDate = new Date();

const InformarContagioDialog = (props) => {
  const [date, setDate] = React.useState(new Date());
  const [isLoading, setIsLoading] = React.useState(false);
  const [pcr, setPcr] = React.useState("null");
  const [ce, setCe] = React.useState(false);

  const { RUT } = useSelector(userSelector);

  const informarContagio = async () => {
    try {
      setIsLoading(true);
      //console.log(date.toISOString().substring(0, 10))
      const response = await axiosClient.post("/US2", {
        RUT: RUT,
        Fecha: date.toISOString().substring(0, 10),
        resultado: pcr,
        CE: ce === true ? "1" : "0"
      });
      let data = await response.data;
      if (response.status === 200) {
        console.log("SUCCESS", data);
        props.handleOpenAlert(
          "success",
          "El contagio ha sido informado correctamente"
        );
      } else {
        console.log("ERROR", data.error);
        props.handleOpenAlert("error", data.error);
      }
      setIsLoading(false);
      props.onClose();
    } catch (e) {
      //console.log("Error", e.response.data.error);
      /*if(e.response.data.error === undefined){
          props.handleOpenAlert("error", "Error al conectar con el servidor"); 
        } else {
          props.handleOpenAlert("error", e.response.data.error); 
        }*/
      props.handleOpenAlert("error", "Error al conectar con el servidor");
      setIsLoading(false);
      props.onClose();
    }
  };

  const handlePcrChange = (event) => {
    setPcr(event.target.value);
  };
  const handleCeChange = (event) => {
    setCe(event.target.checked);
  };

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
          <FormControl sx={{ mb: 2 }} component="fieldset">
            <FormLabel component="legend">Resultado PCR</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={pcr}
              onChange={handlePcrChange}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Positivo"
              />
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="Negativo"
              />
              <FormControlLabel
                value="null"
                control={<Radio />}
                label="Desconocido"
              />
            </RadioGroup>
          </FormControl>
          <FormGroup sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox
                checked={ce}
                onChange={handleCeChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />}
              label="Contacto estrecho con grupo familiar"
            />
          </FormGroup>
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
