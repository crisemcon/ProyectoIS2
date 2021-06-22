import {
    //Avatar,
    //Box,
    Card,
    CardContent,
    Grid,
    Typography,
    CardHeader,
  } from '@material-ui/core';

  
  const SugerenciaSala = (props) => (
    <Card {...props} sx={{ height: '100%' }}>
        <CardHeader
        title={props.nombre}
        subheader={props.contagiados + " Contagiados"}
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
              variant="h5"
            >
              {props.sugerencia}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  
  export default SugerenciaSala;
  