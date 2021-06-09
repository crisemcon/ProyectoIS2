import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import axiosClient from '../config/axios'

const Login = () => {
  const navigate = useNavigate();

  const login = async rut => {
    try {
      const response = await axiosClient.post('/login', {"RUT": rut})
      console.log(response)
    } catch (err) {
      /*const alert = {
        error: err.response.data.error
      }*/
      console.log(err)
    }
  }

  return (
    <>
      <Helmet>
        <title>Inicia Sesion | Proyecto Trazabilidad IS2</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              rut: '',
              //password: 'Password123'
            }}
            /*validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}*/
            onSubmit={(e) => {
              login(e.rut);
              //console.log(e.rut);
              //navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 0 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Inicia Sesion
                  </Typography>
                </Box>
                <TextField
                  //error={Boolean(touched.email && errors.email)}
                  fullWidth
                  //helperText={touched.email && errors.email}
                  label="RUT"
                  margin="normal"
                  name="rut"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  //type="email"
                  value={values.rut}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
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
