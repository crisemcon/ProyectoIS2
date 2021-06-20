import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
// import LatestOrders from '../components/Salas/LatestOrders';
// import LatestProducts from '../components/Salas/LatestProducts';
import ListaPersonasResults from "../components/customer/ListaPersonasResults";
import customers from "../__mocks__/customers";
import Sala from "../components/salas/Sala";

const Salas = () => (
  <>
    <Helmet>
      <title>Salas</title>
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
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Sala />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Sala />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Sala />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Sala />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ pt: 3 }}>
              <ListaPersonasResults customers={customers} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Salas;
