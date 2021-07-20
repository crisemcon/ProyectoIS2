import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";

import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState } from '../redux/user';

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage} = useSelector(
    userSelector
  );

  const onSubmit = (RUT, password) => {
    dispatch(loginUser({RUT: RUT, password: password}));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isError) {
      //toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate('/app/dashboard', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return (
    <>
      <Helmet>
        <title>Inicia Sesion | Proyecto Trazabilidad IS2</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              RUT: "",
            }}
            onSubmit={(e) => {
              onSubmit(e.RUT, e.password)
            }}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 0 }}>
                  <Typography color="textPrimary" variant="h2">
                    Inicia Sesion
                  </Typography>
                </Box>
                <TextField
                  //error={isError}
                  fullWidth
                  //helperText={errorMessage}
                  label="RUT"
                  margin="normal"
                  name="RUT"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.RUT}
                  variant="outlined"
                />
                <TextField
                  error={isError}
                  fullWidth
                  helperText={errorMessage}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isFetching}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
