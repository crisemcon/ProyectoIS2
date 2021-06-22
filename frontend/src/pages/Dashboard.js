import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import Contagios from "../components/dashboard/Contagios";
// import LatestOrders from '../components/dashboard/LatestOrders';
// import LatestProducts from '../components/dashboard/LatestProducts';
import ContagiosChart from "../components/dashboard/ContagiosChart";
import EstudiantesVacunados from "../components/dashboard/EstudiantesVacunados";
import TotalEstudiantes from "../components/dashboard/TotalEstudiantes";
import InformarContagio from "../components/dashboard/InformarContagio";
import EstadoColegio from "../components/dashboard/EstadoColegio";
import Seremi from "../components/dashboard/Seremi";

import { useSelector } from "react-redux";
import { userSelector } from "../redux/user";

const Dashboard = () => {
  const { Rol } = useSelector(userSelector);

  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            {Rol === "Administrador" ? <Grid item lg={12} sm={12} xl={12} xs={12}> <Seremi /> </Grid>  : null}
            {Rol !== "Alumno" ? (
              <>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <Contagios />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <TotalEstudiantes />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <EstudiantesVacunados />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <InformarContagio sx={{ height: "100%" }} />
                </Grid>{" "}
              </>
            ) : (
              <>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <Contagios />
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <TotalEstudiantes />
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <EstudiantesVacunados />
                </Grid>
              </>
            )}

            <Grid item lg={8} md={12} xl={9} xs={12}>
              <ContagiosChart />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <EstadoColegio sx={{ height: "100%" }} />
            </Grid>
            {/*
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
          */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
