import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Grid,
  CardActions,
  Typography,
} from "@material-ui/core";
// import LatestOrders from '../components/Salas/LatestOrders';
// import LatestProducts from '../components/Salas/LatestProducts';
import ListaPersonas from "../components/salas/ListaPersonas";
import Sala from "../components/salas/Sala";

import { useSelector } from "react-redux";
import { userSelector } from "../redux/user";
import axiosClient from "../config/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { styled } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

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

const Salas = () => {
  const { RUT } = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(true);
  const [salas, setSalas] = useState(null);
  const [selectedSala, setSelectedSala] = useState(null);

  const [expandedContagiados, setExpandedContagiados] = useState(false);
  const [expandedProfesores, setExpandedProfesores] = useState(false);
  const [expandedAlumnos, setExpandedAlumnos] = useState(false);

  const handleExpandContagiadosClick = () => {
    setExpandedContagiados(!expandedContagiados);
  };
  const handleExpandProfesoresClick = () => {
    setExpandedProfesores(!expandedProfesores);
  };
  const handleExpandAlumnosClick = () => {
    setExpandedAlumnos(!expandedAlumnos);
  };

  const fetchUS6 = async () => {
    try {
      setIsLoading(true);
      //console.log(date.toISOString().substring(0, 10))
      const response = await axiosClient.get("/US6", { params: { RUT: RUT } });
      let data = await response.data;
      if (response.status === 200) {
        console.log("SUCCESS", data);
        setSalas(data);
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
    fetchUS6();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {Object.keys(salas).map((sala) => (
                <Grid key={sala} item lg={3} sm={6} xl={3} xs={12}>
                  <Sala
                    nombre={sala}
                    alumnos={salas[sala].Alumnos.length}
                    contagiados={salas[sala].Contagiados.length}
                    profesores={salas[sala].Profesores.length}
                    setSelectedSala={setSelectedSala}
                  />
                </Grid>
              ))}
              {selectedSala !== null ? (
                <>
                  <Grid item xs={12}>
                    <CardActions disableSpacing>
                      <Typography variant="body1" color="text.primary">
                        Contagiados
                      </Typography>
                      <ExpandMore
                        expand={expandedContagiados}
                        onClick={handleExpandContagiadosClick}
                        xs={12}
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse
                      in={expandedContagiados}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ pt: 3 }}>
                        {salas[selectedSala].Contagiados.length === 0 ? (
                          <Typography variant="body1" color="text.secondary">
                            No hay contagiados en esta sala
                          </Typography>
                        ) : (
                          <ListaPersonas
                            personas={salas[selectedSala].Contagiados}
                          />
                        )}
                      </Box>
                    </Collapse>
                  </Grid>
                  <Grid item xs={12}>
                    <CardActions disableSpacing>
                      <Typography variant="body1" color="text.primary">
                        Profesores
                      </Typography>
                      <ExpandMore
                        expand={expandedProfesores}
                        onClick={handleExpandProfesoresClick}
                        xs={12}
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse
                      in={expandedProfesores}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ pt: 3 }}>
                        {salas[selectedSala].Profesores.length === 0 ? (
                          <Typography variant="body1" color="text.secondary">
                            No hay profesores en esta sala
                          </Typography>
                        ) : (
                          <ListaPersonas
                            personas={salas[selectedSala].Profesores}
                          />
                        )}
                      </Box>
                    </Collapse>
                  </Grid>
                  <Grid item xs={12}>
                    <CardActions disableSpacing>
                      <Typography variant="body1" color="text.primary">
                        Alumnos
                      </Typography>
                      <ExpandMore
                        expand={expandedAlumnos}
                        onClick={handleExpandAlumnosClick}
                        xs={12}
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expandedAlumnos} timeout="auto" unmountOnExit>
                      <Box sx={{ pt: 3 }}>
                        {salas[selectedSala].Alumnos.length === 0 ? (
                          <Typography variant="body1" color="text.secondary">
                            No hay alumnos en esta sala
                          </Typography>
                        ) : (
                          <ListaPersonas
                            personas={salas[selectedSala].Alumnos}
                          />
                        )}
                      </Box>
                    </Collapse>
                  </Grid>
                </>
              ) : null}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Salas;
