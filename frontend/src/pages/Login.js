import { useEffect} from "react";
//import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  //const navigate = useNavigate();

  // const [isLoading, setIsLoading] = useState(false);
  // const [status, setStatus] = useState(null);
  // const [user, setUser] = useState(null);

  // const login = async (rut) => {
  //   setIsLoading(true);
  //   setStatus(null);
  //   setUser(null);
  //   try {
  //     const response = await axiosClient.post("/login", { RUT: rut });
  //     setTimeout(() => {
  //       setUser(response.data);
  //       setIsLoading(false);
  //       console.log(response);
  //     }, 1000)
  //   } catch (err) {
  //     /*const alert = {
  //       error: err.response.data.error
  //     }*/
  //     setTimeout(() => {
  //       setStatus(err.response.data.error);
  //       setIsLoading(false);
  //     }, 1000);
  //   }
  // };

  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage} = useSelector(
    userSelector
  );

  const onSubmit = (RUT) => {
    dispatch(loginUser({RUT: RUT}));
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
      //console.log("SUCCESS", RUT, Nombres, Apellidos, Correo, Rol, Telefono )
      //history.push('/');
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
              //password: 'Password123'
            }}
            /*validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}*/
            onSubmit={(e) => {
              onSubmit(e.RUT)
              //console.log(e.rut);
              //navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              //isLoading,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 0 }}>
                  <Typography color="textPrimary" variant="h2">
                    Inicia Sesion
                  </Typography>
                </Box>
                <TextField
                  error={isError}
                  fullWidth
                  helperText={errorMessage}
                  label="RUT"
                  margin="normal"
                  name="RUT"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  //type="email"
                  value={values.RUT}
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
          {/*
            user !== null ?
            <> 
            <Typography>
              Rol: {user.Rol}
            </Typography>
            <Typography>
              Nombres: {user.Nombres}
            </Typography>
            <Typography>
              Apellidos: {user.Apellidos}
            </Typography>
            <Typography>
              Correo: {user.Correo}
            </Typography>
            </> : null
          */}
        </Container>
      </Box>
    </>
  );
};

export default Login;
