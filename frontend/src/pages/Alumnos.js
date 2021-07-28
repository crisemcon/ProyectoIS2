import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Typography,
  Grid,
  CardActions,
} from "@material-ui/core";
import ListaAlumnos from "../components/alumnos/ListaAlumnos";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/user";
import axiosClient from "../config/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { styled } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import ListaAlumnosContagiados from "../components/alumnos/ListaAlumnosContagiados";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Alumnos = () => {
  const { RUT } = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(true);
  const [contagiados, setContagiados] = useState(null);
  const [sanos, setSanos] = useState(null);

  const [expandedContagiados, setExpandedContagiados] = useState(true);
  const [expandedSanos, setExpandedSanos] = useState(true);

  const handleExpandContagiadosClick = () => {
    setExpandedContagiados(!expandedContagiados);
  };
  const handleExpandSanosClick = () => {
    setExpandedSanos(!expandedSanos);
  };

  const fetchAlumnos = async () => {
    try {
      setIsLoading(true);
      //console.log(date.toISOString().substring(0, 10))
      const response = await axiosClient.post("/US5", { RUT: RUT });
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
      console.log("Error", e);
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
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Grid item xs={12}>
                <CardActions disableSpacing>
                  <Typography variant="body1" color="text.primary">
                    Alumnos Contagiados
                  </Typography>
                  <ExpandMore
                    expand={expandedContagiados}
                    onClick={handleExpandContagiadosClick}
                    xs={12}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expandedContagiados} timeout="auto" unmountOnExit>
                  <Box sx={{ pt: 3 }}>
                    {contagiados.length === 0 ? (
                      <Typography mb={3} variant="body1" color="text.secondary">
                        No hay alumnos contagiados en esta sala
                      </Typography>
                    ) : (
                      <ListaAlumnosContagiados alumnos={contagiados} />
                    )}
                  </Box>
                </Collapse>
              </Grid>
              <Grid item xs={12}>
                <CardActions disableSpacing>
                  <Typography variant="body1" color="text.primary">
                    Alumnos Sanos
                  </Typography>
                  <ExpandMore
                    expand={expandedSanos}
                    onClick={handleExpandSanosClick}
                    xs={12}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expandedSanos} timeout="auto" unmountOnExit>
                  <Box sx={{ pt: 3 }}>
                    {sanos.length === 0 ? (
                      <Typography mb={3} variant="body1" color="text.secondary">
                        No hay alumnos sanos en esta sala
                      </Typography>
                    ) : (
                      <ListaAlumnos alumnos={sanos} />
                    )}
                  </Box>
                </Collapse>
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Alumnos;
