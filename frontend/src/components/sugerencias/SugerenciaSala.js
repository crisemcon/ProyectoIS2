import {
  //Avatar,
  //Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import { red, blue, orange, green } from "@material-ui/core/colors";

const SugerenciaSala = (props) => {
  let color = blue[400];
  if (
    props.sugerencia === "Cerrar sala temporalmente" ||
    props.sugerencia ===
      "Es necesario solicitar cierre temporal del establecimiento"
  )
    color = red[400];
  if (
    props.sugerencia === "Considerar cerrar la sala temporalmente" ||
    props.sugerencia === "Considerar cierre temporal del establecimiento"
  )
    color = orange[400];
  if (
    props.sugerencia === "Continuar procedimientos usuales" ||
    props.sugerencia === "Continuar funcionamiento normal"
  )
    color = green[400];

  return (
    <Card {...props} sx={{ height: "100%" }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: color }}> </Avatar>}
        title={props.nombre}
        subheader={props.contagiados === 1 ? props.contagiados + " Contagiado" : props.contagiados + " Contagiados"}
      />
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textPrimary" variant="body1">
              {props.sugerencia}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SugerenciaSala;
