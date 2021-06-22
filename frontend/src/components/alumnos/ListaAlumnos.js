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

const ListaAlumnos = ({ alumnos, ...rest }) => {
  const [selectedAlumnoRuts, setSelectedAlumnoRuts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedAlumnoRuts;

    if (event.target.checked) {
      newSelectedAlumnoRuts = alumnos.map((alumno) => alumno.id);
    } else {
      newSelectedAlumnoRuts = [];
    }

    setSelectedAlumnoRuts(newSelectedAlumnoRuts);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedAlumnoRuts.indexOf(id);
    let newSelectedAlumnoRuts = [];

    if (selectedIndex === -1) {
      newSelectedAlumnoRuts = newSelectedAlumnoRuts.concat(
        selectedAlumnoRuts,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedAlumnoRuts = newSelectedAlumnoRuts.concat(
        selectedAlumnoRuts.slice(1)
      );
    } else if (selectedIndex === selectedAlumnoRuts.length - 1) {
      newSelectedAlumnoRuts = newSelectedAlumnoRuts.concat(
        selectedAlumnoRuts.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedAlumnoRuts = newSelectedAlumnoRuts.concat(
        selectedAlumnoRuts.slice(0, selectedIndex),
        selectedAlumnoRuts.slice(selectedIndex + 1)
      );
    }

    setSelectedAlumnoRuts(newSelectedAlumnoRuts);
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
                    checked={selectedAlumnoRuts.length === alumnos.length}
                    color="primary"
                    indeterminate={
                      selectedAlumnoRuts.length > 0 &&
                      selectedAlumnoRuts.length < alumnos.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>RUT</TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellidos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alumnos.slice(0, limit).map((alumno) => (
                <TableRow
                  hover
                  key={alumno.RUT_Alu}
                  selected={selectedAlumnoRuts.indexOf(alumno.RUT_Alu) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        selectedAlumnoRuts.indexOf(alumno.RUT_Alu) !== -1
                      }
                      onChange={(event) =>
                        handleSelectOne(event, alumno.RUT_Alu)
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
                        {getInitials(alumno.Nombres)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {alumno.RUT_Alu}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{alumno.Nombres}</TableCell>
                  <TableCell>{alumno.Apellidos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={alumnos.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ListaAlumnos.propTypes = {
  alumnos: PropTypes.array.isRequired,
};

export default ListaAlumnos;
