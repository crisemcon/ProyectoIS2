import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Box, Container, Typography } from "@material-ui/core";
import ListaAlumnos from "../components/alumnos/ListaAlumnos";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/user";
import axiosClient from "../config/axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const Alumnos = () => {
    const { RUT } = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(true);
  const [contagiados, setContagiados] = useState(null);
  const [sanos, setSanos] = useState(null);

  const fetchAlumnos = async () => {
    try {
      setIsLoading(true);
      //console.log(date.toISOString().substring(0, 10))
      const response = await axiosClient.post("/US5", { RUT: RUT },
      );
      let data = await response.data;
      if (response.status === 200) {
        console.log("SUCCESS", data);
        setContagiados(data.alumnos_contagiados);
        setSanos(data.alumnos_sanos);
      } else {
        console.log("ERROR", data.error);
      }
      setIsLoading(false);
    } catch (e) {
      console.log("Error", e.response.data.error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Mis Alumnos</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Typography variant="h3" component="h2">
            Alumnos Contagiados
          </Typography>
          {isLoading ? (
              <CircularProgress />
            ) : <Box sx={{ pt: 3 }}>
            <ListaAlumnos alumnos={contagiados} />
          </Box>}
          
          <Typography mt={2} variant="h3" component="h2">
            Alumnos Sanos
          </Typography>
          {isLoading ? (
              <CircularProgress />
            ) :
          <Box sx={{ pt: 3 }}>
            <ListaAlumnos alumnos={sanos} />
          </Box> }
        </Container>
      </Box>
    </>
  );
};

export default Alumnos;
