import { Button, Card, CardContent, Grid } from "@material-ui/core";
//import { indigo } from "@material-ui/core/colors";
//import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user";
import { useState } from "react";
import InformarContagioPupiloDialog from "./InformarContagioPupiloDialog";

const InformarContagio = (props) => {
  const { Rol } = useSelector(userSelector);

  const [openPupilo, setOpenPupilo] = useState(false);

  const handleClickOpenPupilo = () => {
    setOpenPupilo(true);
  };

  const handleClosePupilo = () => {
    setOpenPupilo(false);
  };

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Button fullWidth={true} variant="contained" color="secondary">
              Informar Contagio Propio
            </Button>
          </Grid>
          {Rol === "Apoderado" ? (
            <Grid item>
              <Button fullWidth={true} variant="contained" color="secondary" onClick={handleClickOpenPupilo}>
                Informar Contagio Pupilo
              </Button>
              <InformarContagioPupiloDialog open={openPupilo} onClose={handleClosePupilo} />
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InformarContagio;
