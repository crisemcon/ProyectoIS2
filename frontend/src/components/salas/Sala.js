import {
    //Avatar,
    //Box,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';

  
  const TotalEstudiantes = (props) => (
    <Card {...props} sx={{ height: '100%' }}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Sala 104
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              XX Estudiantes
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  
  export default TotalEstudiantes;
  