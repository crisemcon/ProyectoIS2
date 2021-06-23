import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
// import LatestOrders from '../components/Sugerencias/LatestOrders';
// import LatestProducts from '../components/Sugerencias/LatestProducts';
import SugerenciaSala from "../components/sugerencias/SugerenciaSala";
import axiosClient from "../config/axios";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/user";
import CircularProgress from "@material-ui/core/CircularProgress";

const Sugerencias = (props) => {
  const { RUT } = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(true);
  const [contagiadosTotal, setContagiadosTotal] = useState(null);
  const [sugerencia, setSugerencia] = useState(null);
  const [contagiadosSalas, setContagiadosSalas] = useState(null);

  const fetchSugerencias = async () => {
    try {
      setIsLoading(true);
      //console.log(date.toISOString().substring(0, 10))
      const response = await axiosClient.get("/US3", {
        params: { RUT: RUT },
      });
      let data = await response.data;
      if (response.status === 200) {
        console.log("SUCCESS", data);
        setContagiadosTotal(data.ContagiadosTotal);
        setSugerencia(data.Sugerencia);
        setContagiadosSalas(data.ContagiadosSalas);
      } else {
        console.log("ERROR", data.error);
      }
      setIsLoading(false);
    } catch (e) {
      console.log("Error", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSugerencias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Sugerencias</title>
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
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Grid item lg={12} sm={12} xl={12} xs={12}>
                  <SugerenciaSala nombre="Colegio" contagiados={contagiadosTotal} sugerencia={sugerencia}/>
                </Grid>
                {
                  /*contagiadosSalas.map(sala => <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <SugerenciaSala />
                </Grid>)*/
                  Object.entries(contagiadosSalas).map((sala) => (
                    <Grid key={sala[0]} item lg={3} sm={6} xl={3} xs={12}>
                      <SugerenciaSala nombre={sala[0]} contagiados={sala[1].Contagiados} sugerencia={sala[1].Sugerencia} />
                    </Grid>
                  ))
                }
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Sugerencias;
