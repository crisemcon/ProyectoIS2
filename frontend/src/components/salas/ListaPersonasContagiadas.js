import { useState } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import getInitials from "../../utils/getInitials";

const ListaPersonasContagiadas = ({ personas, ...rest }) => {
  const [selectedPersonaRuts, setSelectedPersonaRuts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedPersonaRuts;

    if (event.target.checked) {
      newSelectedPersonaRuts = personas.map((persona) => persona.RUT);
    } else {
      newSelectedPersonaRuts = [];
    }

    setSelectedPersonaRuts(newSelectedPersonaRuts);
  };

  const handleSelectOne = (event, RUT) => {
    const selectedIndex = selectedPersonaRuts.indexOf(RUT);
    let newSelectedPersonaRuts = [];

    if (selectedIndex === -1) {
      newSelectedPersonaRuts = newSelectedPersonaRuts.concat(
        selectedPersonaRuts,
        RUT
      );
    } else if (selectedIndex === 0) {
      newSelectedPersonaRuts = newSelectedPersonaRuts.concat(
        selectedPersonaRuts.slice(1)
      );
    } else if (selectedIndex === selectedPersonaRuts.length - 1) {
      newSelectedPersonaRuts = newSelectedPersonaRuts.concat(
        selectedPersonaRuts.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedPersonaRuts = newSelectedPersonaRuts.concat(
        selectedPersonaRuts.slice(0, selectedIndex),
        selectedPersonaRuts.slice(selectedIndex + 1)
      );
    }

    setSelectedPersonaRuts(newSelectedPersonaRuts);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedPersonaRuts.length === personas.length}
                    color="primary"
                    indeterminate={
                      selectedPersonaRuts.length > 0 &&
                      selectedPersonaRuts.length < personas.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>RUT</TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Fecha Contagio</TableCell>
                <TableCell>Fecha Termino Contagio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personas.slice(0, limit).map((persona) => (
                <TableRow
                  hover
                  key={persona.RUT}
                  selected={selectedPersonaRuts.indexOf(persona.RUT) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        selectedPersonaRuts.indexOf(persona.RUT) !== -1
                      }
                      onChange={(event) =>
                        handleSelectOne(event, persona.RUT)
                      }
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar sx={{ mr: 2 }}>
                        {getInitials(persona.Nombres)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {persona.RUT}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{persona.Nombres}</TableCell>
                  <TableCell>{persona.Apellidos}</TableCell>
                  <TableCell>{new Date(persona.Fecha_Contagio).toISOString().substring(0, 10)}</TableCell>
                  <TableCell>{new Date(persona.Fecha_termino).toISOString().substring(0, 10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={personas.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ListaPersonasContagiadas.propTypes = {
  personas: PropTypes.array.isRequired,
};

export default ListaPersonasContagiadas;
