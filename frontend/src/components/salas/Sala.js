import {
    //Avatar,
    //Box,
    Card,
    CardContent,
    Grid,
    Typography,
    CardActionArea,
    CardHeader,
    Avatar,
  } from '@material-ui/core';
  import { red, green } from '@material-ui/core/colors';

  
  const TotalEstudiantes = (props) => (
    <Card {...props} sx={{ height: '100%' }}>
      <CardActionArea onClick={() => props.setSelectedSala(props.nombre)}>
      <CardHeader
        avatar={
          <Avatar sx={props.contagiados !== 0 ? { bgcolor: red[400] } : { bgcolor: green[400] }} >
            {" "}
          </Avatar>
        }
        title={props.nombre}
        subheader={props.contagiados === 1 ? props.contagiados + " Contagiado" : props.contagiados + " Contagiados"}
      />
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="body1"
            >
              {props.profesores === 1 ? props.profesores + " Profesor" :props.profesores + " Profesores"}
            </Typography>
            <Typography
              color="textPrimary"
              variant="body1"
            >
              {props.alumnos === 1 ? props.alumnos + " Alumno" :props.alumnos + " Estudiantes"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      </CardActionArea>
    </Card>
  );
  
  export default TotalEstudiantes;
  