import React from "react";
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

const InformarContagioPupiloDialog = (props) => {
  return (
    <Dialog {...props} open={props.open} onClose={props.onClose}>
      <DialogTitle>{"Seleccione su pupilo contagiado"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item>
            {/*lg={6} sm={6} xl={6} xs={12}*/}
            <Card>
              <CardContent>
                <CardHeader
                  avatar={
                    <Avatar src="/static/images/avatars/defaultavatar.jpg" />
                  }
                  title="John Doe Eod Nhoj"
                  subheader="12345678-9"
                />
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  fullWidth={true}
                  variant="contained"
                  color="secondary"
                >
                  Informar
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
            {/*lg={6} sm={6} xl={6} xs={12}*/}
            <Card>
              <CardContent>
                <CardHeader
                  avatar={
                    <Avatar src="/static/images/avatars/defaultavatar.jpg" />
                  }
                  title="John Doe Eod Nhoj"
                  subheader="12345678-9"
                />
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  fullWidth={true}
                  variant="contained"
                  color="secondary"
                >
                  Informar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InformarContagioPupiloDialog;
